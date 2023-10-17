import utils from '../../utils';
import networkSvc from '../../networkSvc';
import store from '../../../store';
import userSvc from '../../userSvc';
import badgeSvc from '../../badgeSvc';
import constants from '../../../data/constants';

const tokenExpirationMargin = 5 * 60 * 1000;

const request = ({ accessToken, serverUrl }, options) => networkSvc.request({
  ...options,
  url: `${serverUrl}/api/v4/${options.url}`,
  headers: {
    ...options.headers || {},
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then(res => res.body);

const getCommitMessage = (name, path) => {
  const message = store.getters['data/computedSettings'].git[name];
  return message.replace(/{{path}}/g, path);
};

/**
 * https://docs.gitlab.com/ee/api/users.html#for-user
 */
const subPrefix = 'gl';
userSvc.setInfoResolver('gitlab', subPrefix, async (sub) => {
  try {
    const [, serverUrl, id] = sub.match(/^(.+)\/([^/]+)$/);
    const user = (await networkSvc.request({
      url: `${serverUrl}/api/v4/users/${id}`,
    })).body;
    const uniqueSub = `${serverUrl}/${user.id}`;

    return {
      id: `${subPrefix}:${uniqueSub}`,
      name: user.username,
      imageUrl: user.avatar_url || '',
    };
  } catch (err) {
    if (err.status !== 404) {
      throw new Error('RETRY');
    }
    throw err;
  }
});

export default {
  subPrefix,

  /**
   * https://docs.gitlab.com/ee/api/oauth2.html
   */
  async startOauth2(
    serverUrl, applicationId, applicationSecret,
    sub = null, silent = false, refreshToken,
  ) {
    let apiUrl = serverUrl;
    let clientId = applicationId;
    let useServerConf = false;
    // 获取gitlab配置的参数
    await networkSvc.getServerConf();
    const confClientId = store.getters['data/serverConf'].gitlabClientId;
    const confServerUrl = store.getters['data/serverConf'].gitlabUrl;
    // 存在gitlab配置则使用后端配置
    if (confClientId && confServerUrl) {
      apiUrl = confServerUrl;
      clientId = confClientId;
      useServerConf = true;
    }
    let tokenBody;
    if (!silent) {
      // Get an OAuth2 code
      const { code } = await networkSvc.startOauth2(
        `${apiUrl}/oauth/authorize`,
        {
          client_id: clientId,
          response_type: 'code',
          redirect_uri: constants.oauth2RedirectUri,
        },
        silent,
      );
      if (useServerConf) {
        tokenBody = (await networkSvc.request({
          method: 'GET',
          url: 'oauth2/gitlabToken',
          params: {
            code,
            grant_type: 'authorization_code',
            redirect_uri: constants.oauth2RedirectUri,
          },
        })).body;
      } else {
        // Exchange code with token
        tokenBody = (await networkSvc.request({
          method: 'POST',
          url: `${apiUrl}/oauth/token`,
          params: {
            client_id: clientId,
            client_secret: applicationSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: constants.oauth2RedirectUri,
          },
        })).body;
      }
    } else if (useServerConf) {
      tokenBody = (await networkSvc.request({
        method: 'GET',
        url: 'oauth2/gitlabToken',
        params: {
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
          redirect_uri: constants.oauth2RedirectUri,
        },
      })).body;
    } else {
      // Exchange refreshToken with token
      tokenBody = (await networkSvc.request({
        method: 'POST',
        url: `${apiUrl}/oauth/token`,
        body: {
          client_id: clientId,
          client_secret: applicationSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
          redirect_uri: constants.oauth2RedirectUri,
        },
      })).body;
    }

    const accessToken = tokenBody.access_token;
    // Call the user info endpoint
    const user = await request({ accessToken, serverUrl: apiUrl }, {
      url: 'user',
    });
    const uniqueSub = `${apiUrl}/${user.id}`;
    userSvc.addUserInfo({
      id: `${subPrefix}:${uniqueSub}`,
      name: user.username,
      imageUrl: user.avatar_url || '',
    });

    // Check the returned sub consistency
    if (sub && uniqueSub !== sub) {
      throw new Error('GitLab account ID not expected.');
    }

    const oldToken = store.getters['data/gitlabTokensBySub'][uniqueSub];
    // Build token object including scopes and sub
    const token = {
      accessToken,
      name: user.username,
      applicationId: clientId,
      applicationSecret,
      imgStorages: oldToken && oldToken.imgStorages,
      refreshToken: tokenBody.refresh_token,
      expiresOn: Date.now() + ((tokenBody.expires_in || 7200) * 1000),
      serverUrl: apiUrl,
      sub: uniqueSub,
    };

    // Add token to gitlab tokens
    store.dispatch('data/addGitlabToken', token);
    return token;
  },
  async addAccount(serverUrl, applicationId, applicationSecret, sub = null) {
    const token = await this.startOauth2(serverUrl, applicationId, applicationSecret, sub);
    badgeSvc.addBadge('addGitLabAccount');
    return token;
  },
  // refresh token
  async refreshToken(token) {
    const {
      serverUrl,
      applicationId,
      applicationSecret,
      sub,
    } = token;
    const lastToken = store.getters['data/gitlabTokensBySub'][sub];
    // 兼容旧的没有过期时间
    if (!lastToken.expiresOn || !lastToken.refreshToken) {
      await store.dispatch('modal/open', {
        type: 'providerRedirection',
        name: 'Gitlab',
      });
      return this.startOauth2(serverUrl, applicationId, applicationSecret, sub);
    }
    // lastToken is not expired
    if (lastToken.expiresOn > Date.now() + tokenExpirationMargin) {
      return lastToken;
    }

    // existing token is about to expire.
    // Try to get a new token in background
    try {
      return await this.startOauth2(
        serverUrl, applicationId, applicationSecret,
        sub, true, lastToken.refreshToken,
      );
    } catch (err) {
      // If it fails try to popup a window
      if (store.state.offline) {
        throw err;
      }
      await store.dispatch('modal/open', {
        type: 'providerRedirection',
        name: 'Gitlab',
      });
      return this.startOauth2(serverUrl, applicationId, applicationSecret, sub);
    }
  },
  // 带刷新token
  async requestWithRefreshToken(token, options) {
    const refreshedToken = await this.refreshToken(token);
    const result = await request(refreshedToken, options);
    return result;
  },
  /**
   * https://docs.gitlab.com/ee/api/projects.html#get-single-project
   */
  async getProjectId(token, { projectPath, projectId }) {
    if (projectId) {
      return projectId;
    }
    const project = await this.requestWithRefreshToken(token, {
      url: `projects/${encodeURIComponent(projectPath)}`,
    });
    return project.id;
  },

  /**
   * https://docs.gitlab.com/ee/api/repositories.html#list-repository-tree
   */
  async getTree({
    token,
    projectId,
    branch,
  }) {
    return this.requestWithRefreshToken(token, {
      url: `projects/${encodeURIComponent(projectId)}/repository/tree`,
      params: {
        ref: branch,
        recursive: true,
        per_page: 9999,
      },
    });
  },

  /**
   * https://docs.gitlab.com/ee/api/commits.html#list-repository-commits
   */
  async getCommits({
    token,
    projectId,
    branch,
    path,
  }) {
    return this.requestWithRefreshToken(token, {
      url: `projects/${encodeURIComponent(projectId)}/repository/commits`,
      params: {
        ref_name: branch,
        path,
      },
    });
  },

  /**
   * https://docs.gitlab.com/ee/api/repository_files.html#create-new-file-in-repository
   * https://docs.gitlab.com/ee/api/repository_files.html#update-existing-file-in-repository
   */
  async uploadFile({
    token,
    projectId,
    branch,
    path,
    content,
    sha,
    isImg,
    commitMessage,
  }) {
    let uploadContent = content;
    if (isImg && typeof content !== 'string') {
      uploadContent = await utils.encodeFiletoBase64(content);
    }
    return this.requestWithRefreshToken(token, {
      method: sha ? 'PUT' : 'POST',
      url: `projects/${encodeURIComponent(projectId)}/repository/files/${encodeURIComponent(path)}`,
      body: {
        commit_message: commitMessage || getCommitMessage(sha ? 'updateFileMessage' : 'createFileMessage', path),
        encoding: 'base64',
        content: isImg ? uploadContent : utils.encodeBase64(content),
        last_commit_id: sha,
        branch,
      },
    });
  },

  /**
   * https://docs.gitlab.com/ee/api/repository_files.html#delete-existing-file-in-repository
   */
  async removeFile({
    token,
    projectId,
    branch,
    path,
    sha,
  }) {
    return this.requestWithRefreshToken(token, {
      method: 'DELETE',
      url: `projects/${encodeURIComponent(projectId)}/repository/files/${encodeURIComponent(path)}`,
      body: {
        commit_message: getCommitMessage('deleteFileMessage', path),
        last_commit_id: sha,
        branch,
      },
    });
  },

  /**
   * https://docs.gitlab.com/ee/api/repository_files.html#get-file-from-repository
   */
  async downloadFile({
    token,
    projectId,
    branch,
    path,
    isImg,
  }) {
    const res = await this.requestWithRefreshToken(token, {
      url: `projects/${encodeURIComponent(projectId)}/repository/files/${encodeURIComponent(path)}`,
      params: { ref: branch },
    });
    return {
      sha: res.last_commit_id,
      data: !isImg ? utils.decodeBase64(res.content) : res.content,
    };
  },
};
