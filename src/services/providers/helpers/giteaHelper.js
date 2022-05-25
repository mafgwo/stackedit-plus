import utils from '../../utils';
import networkSvc from '../../networkSvc';
import store from '../../../store';
import userSvc from '../../userSvc';
import badgeSvc from '../../badgeSvc';
import constants from '../../../data/constants';

const request = ({ accessToken, serverUrl }, options) => networkSvc.request({
  ...options,
  url: `${serverUrl}/api/v1/${options.url}`,
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
 * https://try.gitea.io/api/swagger#/user/userGet
 */
const subPrefix = 'gt';
userSvc.setInfoResolver('gitea', subPrefix, async (sub) => {
  try {
    const [, serverUrl, username] = sub.match(/^(.+)\/([^/]+)$/);
    const user = (await networkSvc.request({
      url: `${serverUrl}/api/v1/users/${username}`,
    })).body;
    const uniqueSub = `${serverUrl}/${user.username}`;

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
   * https://docs.gitea.io/en-us/oauth2-provider/
   */
  async startOauth2(serverUrl, applicationId, applicationSecret, sub = null, silent = false) {
    // Get an OAuth2 code
    const { code } = await networkSvc.startOauth2(
      `${serverUrl}/login/oauth/authorize`,
      {
        client_id: applicationId,
        response_type: 'code',
        redirect_uri: constants.oauth2RedirectUri,
      },
      silent,
    );

    // Exchange code with token
    const accessToken = (await networkSvc.request({
      method: 'POST',
      url: `${serverUrl}/login/oauth/access_token`,
      body: {
        client_id: applicationId,
        client_secret: applicationSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: constants.oauth2RedirectUri,
      },
    })).body.access_token;

    // Call the user info endpoint
    const user = await request({ accessToken, serverUrl }, {
      url: 'user',
    });
    const uniqueSub = `${serverUrl}/${user.username}`;
    userSvc.addUserInfo({
      id: `${subPrefix}:${uniqueSub}`,
      name: user.username,
      imageUrl: user.avatar_url || '',
    });

    // Check the returned sub consistency
    if (sub && uniqueSub !== sub) {
      throw new Error('Gitea account ID not expected.');
    }

    // Build token object including scopes and sub
    const token = {
      accessToken,
      name: user.username,
      serverUrl,
      sub: uniqueSub,
    };

    // Add token to gitea tokens
    store.dispatch('data/addGiteaToken', token);
    return token;
  },
  async addAccount(serverUrl, applicationId, applicationSecret, sub = null) {
    const token = await this.startOauth2(serverUrl, applicationId, applicationSecret, sub);
    badgeSvc.addBadge('addGiteaAccount');
    return token;
  },

  /**
   * https://try.gitea.io/api/swagger#/repository/repoGet
   */
  async getProjectId({ projectPath, projectId }) {
    if (projectId) {
      return projectId;
    }
    const [, repoFullName] = projectPath.match(/([^/]+\/[^/]+)$/);
    return repoFullName;
  },

  /**
   * https://try.gitea.io/api/swagger#/repository/GetTree
   */
  async getTree({
    token,
    projectId,
    branch,
  }) {
    return request(token, {
      url: `repos/${projectId}/git/trees/${branch}`,
      params: {
        recursive: true,
        per_page: 9999,
      },
    });
  },

  /**
   * https://try.gitea.io/api/swagger#/repository/repoGetAllCommits
   */
  async getCommits({
    token,
    projectId,
    branch,
    path,
  }) {
    return request(token, {
      url: `repos/${projectId}/commits`,
      params: {
        sha: branch,
        path,
      },
    });
  },

  /**
   * https://try.gitea.io/api/swagger#/repository/repoCreateFile
   * https://try.gitea.io/api/swagger#/repository/repoUpdateFile
   */
  async uploadFile({
    token,
    projectId,
    branch,
    path,
    content,
    sha,
  }) {
    return request(token, {
      method: sha ? 'PUT' : 'POST',
      url: `repos/${projectId}/contents/${encodeURIComponent(path)}`,
      body: {
        message: getCommitMessage(sha ? 'updateFileMessage' : 'createFileMessage', path),
        content: utils.encodeBase64(content),
        sha,
        branch,
      },
    });
  },

  /**
   * https://try.gitea.io/api/swagger#/repository/repoDeleteFile
   */
  async removeFile({
    token,
    projectId,
    branch,
    path,
    sha,
  }) {
    return request(token, {
      method: 'DELETE',
      url: `repos/${projectId}/contents/${encodeURIComponent(path)}`,
      body: {
        message: getCommitMessage('deleteFileMessage', path),
        sha,
        branch,
      },
    });
  },

  /**
   * https://try.gitea.io/api/swagger#/repository/repoGetContents
   */
  async downloadFile({
    token,
    projectId,
    branch,
    path,
  }) {
    const { sha, content } = await request(token, {
      url: `repos/${projectId}/contents/${encodeURIComponent(path)}`,
      params: { ref: branch },
    });
    return {
      sha,
      data: utils.decodeBase64(content),
    };
  },
};
