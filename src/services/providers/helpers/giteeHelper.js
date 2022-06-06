import utils from '../../utils';
import networkSvc from '../../networkSvc';
import store from '../../../store';
import userSvc from '../../userSvc';
import badgeSvc from '../../badgeSvc';
import constants from '../../../data/constants';

const tokenExpirationMargin = 5 * 60 * 1000;

const appDataRepo = 'stackedit-app-data';

const request = (token, options) => networkSvc.request({
  ...options,
  headers: {
    ...options.headers || {},
  },
  params: {
    ...options.params || {},
    t: Date.now(), // Prevent from caching
    access_token: token.accessToken,
  },
});

const repoRequest = (token, owner, repo, options) => request(token, {
  ...options,
  url: `https://gitee.com/api/v5/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${options.url}`,
})
  .then(res => res.body);

const getCommitMessage = (name, path) => {
  const message = store.getters['data/computedSettings'].git[name];
  return message.replace(/{{path}}/g, path);
};

/**
 * Getting a user from its userId is not feasible with API v3.
 * Using an undocumented endpoint...
 */
const subPrefix = 'ge';
userSvc.setInfoResolver('gitee', subPrefix, async (sub) => {
  try {
    const user = (await networkSvc.request({
      url: `https://gitee.com/api/v5/users/${sub}`,
      params: {
        t: Date.now(), // Prevent from caching
      },
    })).body;

    if (user.avatar_url && user.avatar_url.endsWith('.png')) {
      user.avatar_url = `${user.avatar_url}!avatar60`;
    }
    return {
      id: `${subPrefix}:${user.login}`,
      name: user.login,
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
   * https://developer.gitee.com/apps/building-oauth-apps/authorization-options-for-oauth-apps/
   */
  async startOauth2(lastToken, silent = false, isMain) {
    const clientId = store.getters['data/serverConf'].giteeClientId;
    let tokenBody;
    if (!silent) {
      // Get an OAuth2 code
      const { code } = await networkSvc.startOauth2(
        'https://gitee.com/oauth/authorize',
        {
          client_id: clientId,
          scope: 'projects pull_requests',
          response_type: 'code',
        },
        silent,
      );
      // Exchange code with token
      tokenBody = (await networkSvc.request({
        method: 'GET',
        url: 'oauth2/giteeToken',
        params: {
          clientId,
          code,
          oauth2RedirectUri: constants.oauth2RedirectUri,
        },
      })).body;
    } else {
      // grant_type=refresh_token&refresh_token={refresh_token}
      tokenBody = (await networkSvc.request({
        method: 'POST',
        url: 'https://gitee.com/oauth/token',
        params: {
          grant_type: 'refresh_token',
          refresh_token: lastToken.refreshToken,
        },
      })).body;
    }
    const accessToken = tokenBody.access_token;
    // Call the user info endpoint
    const user = (await networkSvc.request({
      method: 'GET',
      url: 'https://gitee.com/api/v5/user',
      params: {
        access_token: accessToken,
      },
    })).body;
    if (user.avatar_url && user.avatar_url.endsWith('.png')) {
      user.avatar_url = `${user.avatar_url}!avatar60`;
    }
    userSvc.addUserInfo({
      id: `${subPrefix}:${user.login}`,
      name: user.login,
      imageUrl: user.avatar_url || '',
    });

    // 获取同一个用户的登录token
    const existingToken = store.getters['data/giteeTokensBySub'][user.login];

    // Build token object including sub 在token失效后刷新token 如果刷新失败则触发重新授权
    const token = {
      accessToken,
      // 主文档空间的登录 标识登录
      isLogin: !!isMain || (existingToken && !!existingToken.isLogin),
      refreshToken: tokenBody.refresh_token,
      expiresOn: Date.now() + (tokenBody.expires_in * 1000),
      name: user.login,
      sub: `${user.login}`,
    };
    if (isMain) {
      // 检查 stackedit-app-data 仓库是否已经存在 如果不存在则创建该仓库
      await this.checkAndCreateRepo(token);
    }
    // Add token to gitee tokens
    store.dispatch('data/addGiteeToken', token);
    return token;
  },
  // 刷新token
  async refreshToken(token) {
    const { sub } = token;
    const lastToken = store.getters['data/giteeTokensBySub'][sub];
    // 兼容旧的没有过期时间
    if (!lastToken.expiresOn) {
      await store.dispatch('modal/open', {
        type: 'providerRedirection',
        name: 'Gitee',
      });
      return this.startOauth2();
    }
    // lastToken is not expired
    if (lastToken.expiresOn > Date.now() + tokenExpirationMargin) {
      return lastToken;
    }

    // existing token is about to expire.
    // Try to get a new token in background
    try {
      return await this.startOauth2(lastToken, true);
    } catch (err) {
      // If it fails try to popup a window
      if (store.state.offline) {
        throw err;
      }
      await store.dispatch('modal/open', {
        type: 'providerRedirection',
        name: 'Gitee',
      });
      return this.startOauth2();
    }
  },
  signin() {
    return this.startOauth2(null, false, true);
  },
  async addAccount() {
    const token = await this.startOauth2();
    badgeSvc.addBadge('addGiteeAccount');
    return token;
  },

  /**
   * https://developer.gitee.com/v3/repos/commits/#get-a-single-commit
   * https://developer.gitee.com/v3/git/trees/#get-a-tree
   */
  async getTree({
    token,
    owner,
    repo,
    branch,
  }) {
    const refreshedToken = await this.refreshToken(token);
    const { commit } = await repoRequest(refreshedToken, owner, repo, {
      url: `commits/${encodeURIComponent(branch)}`,
    });
    const { tree, truncated } = await repoRequest(refreshedToken, owner, repo, {
      url: `git/trees/${encodeURIComponent(commit.tree.sha)}?recursive=1`,
    });
    if (truncated) {
      throw new Error('Git tree too big. Please remove some files in the repository.');
    }
    return tree;
  },

  async checkAndCreateRepo(token) {
    const url = `https://gitee.com/api/v5/repos/${encodeURIComponent(token.name)}/${encodeURIComponent(appDataRepo)}`;
    try {
      await request(token, { url });
    } catch (err) {
      // 不存在则创建
      if (err.status === 404) {
        await request(token, {
          method: 'POST',
          url: 'https://gitee.com/api/v5/user/repos',
          params: {
            name: appDataRepo,
            auto_init: true,
          },
        });
      } else {
        throw err;
      }
    }
  },

  /**
   * https://developer.gitee.com/v3/repos/commits/#list-commits-on-a-repository
   */
  async getCommits({
    token,
    owner,
    repo,
    sha,
    path,
  }) {
    const refreshedToken = await this.refreshToken(token);
    return repoRequest(refreshedToken, owner, repo, {
      url: 'commits',
      params: { sha, path },
    });
  },

  /**
   * https://developer.gitee.com/v3/repos/contents/#create-a-file
   * https://developer.gitee.com/v3/repos/contents/#update-a-file
   */
  async uploadFile({
    token,
    owner,
    repo,
    branch,
    path,
    content,
    sha,
  }) {
    const refreshedToken = await this.refreshToken(token);
    return repoRequest(refreshedToken, owner, repo, {
      method: sha ? 'PUT' : 'POST',
      url: `contents/${encodeURIComponent(path)}`,
      body: {
        message: getCommitMessage(sha ? 'updateFileMessage' : 'createFileMessage', path),
        content: utils.encodeBase64(content),
        sha,
        branch,
      },
    });
  },

  /**
   * https://developer.gitee.com/v3/repos/contents/#delete-a-file
   */
  async removeFile({
    token,
    owner,
    repo,
    branch,
    path,
    sha,
  }) {
    const refreshedToken = await this.refreshToken(token);
    return repoRequest(refreshedToken, owner, repo, {
      method: 'DELETE',
      url: `contents/${encodeURIComponent(path)}`,
      body: {
        message: getCommitMessage('deleteFileMessage', path),
        sha,
        branch,
      },
    });
  },

  /**
   * https://developer.gitee.com/v3/repos/contents/#get-contents
   */
  async downloadFile({
    token,
    owner,
    repo,
    branch,
    path,
  }) {
    const refreshedToken = await this.refreshToken(token);
    const { sha, content } = await repoRequest(refreshedToken, owner, repo, {
      url: `contents/${encodeURIComponent(path)}`,
      params: { ref: branch },
    });
    return {
      sha,
      data: utils.decodeBase64(content),
    };
  },

  /**
   * https://developer.gitee.com/v3/gists/#create-a-gist
   * https://developer.gitee.com/v3/gists/#edit-a-gist
   */
  async uploadGist({
    token,
    description,
    filename,
    content,
    isPublic,
    gistId,
  }) {
    const refreshedToken = await this.refreshToken(token);
    const { body } = await request(refreshedToken, gistId ? {
      method: 'PATCH',
      url: `https://gitee.com/api/v5/gists/${gistId}`,
      body: {
        description,
        files: {
          [filename]: {
            content,
          },
        },
      },
    } : {
      method: 'POST',
      url: 'https://gitee.com/api/v5/gists',
      body: {
        description,
        files: {
          [filename]: {
            content,
          },
        },
        public: isPublic,
      },
    });
    return body;
  },

  /**
   * https://developer.gitee.com/v3/gists/#get-a-single-gist
   */
  async downloadGist({
    token,
    gistId,
    filename,
  }) {
    const refreshedToken = await this.refreshToken(token);
    const result = (await request(refreshedToken, {
      url: `https://gitee.com/api/v5/gists/${gistId}`,
    })).body.files[filename];
    if (!result) {
      throw new Error('Gist file not found.');
    }
    return result.content;
  },

  /**
   * https://developer.gitee.com/v3/gists/#list-gist-commits
   */
  async getGistCommits({
    token,
    gistId,
  }) {
    const refreshedToken = await this.refreshToken(token);
    const { body } = await request(refreshedToken, {
      url: `https://gitee.com/api/v5/gists/${gistId}/commits`,
    });
    return body;
  },

  /**
   * https://developer.gitee.com/v3/gists/#get-a-specific-revision-of-a-gist
   */
  async downloadGistRevision({
    token,
    gistId,
    filename,
    sha,
  }) {
    const refreshedToken = await this.refreshToken(token);
    const result = (await request(refreshedToken, {
      url: `https://gitee.com/api/v5/gists/${gistId}/${sha}`,
    })).body.files[filename];
    if (!result) {
      throw new Error('Gist file not found.');
    }
    return result.content;
  },
};
