import utils from '../../utils';
import networkSvc from '../../networkSvc';
import store from '../../../store';
import userSvc from '../../userSvc';
import badgeSvc from '../../badgeSvc';

const request = (token, options) => networkSvc.request({
  ...options,
  headers: {
    ...options.headers || {},
    Authorization: `token ${token.accessToken}`,
  },
  params: {
    ...options.params || {},
    t: Date.now(), // Prevent from caching
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
  async startOauth2(scopes, sub = null, silent = false) {
    const clientId = store.getters['data/serverConf'].giteeClientId;

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
    const accessToken = (await networkSvc.request({
      method: 'GET',
      url: 'oauth2/giteeToken',
      params: {
        clientId,
        code,
      },
    })).body;

    // Call the user info endpoint
    const user = (await networkSvc.request({
      method: 'GET',
      url: 'https://gitee.com/api/v5/user',
      params: {
        access_token: accessToken,
      },
    })).body;
    userSvc.addUserInfo({
      id: `${subPrefix}:${user.login}`,
      name: user.login,
      imageUrl: user.avatar_url || '',
    });

    // Check the returned sub consistency
    if (sub && `${user.login}` !== sub) {
      throw new Error('Gitee account ID not expected.');
    }

    // Build token object including scopes and sub
    const token = {
      scopes,
      accessToken,
      name: user.login,
      sub: `${user.login}`,
    };

    // Add token to gitee tokens
    store.dispatch('data/addGiteeToken', token);
    return token;
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
    const { commit } = await repoRequest(token, owner, repo, {
      url: `commits/${encodeURIComponent(branch)}`,
    });
    const { tree, truncated } = await repoRequest(token, owner, repo, {
      url: `git/trees/${encodeURIComponent(commit.tree.sha)}?recursive=1`,
    });
    if (truncated) {
      throw new Error('Git tree too big. Please remove some files in the repository.');
    }
    return tree;
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
    return repoRequest(token, owner, repo, {
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
    return repoRequest(token, owner, repo, {
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
    return repoRequest(token, owner, repo, {
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
    const { sha, content } = await repoRequest(token, owner, repo, {
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
    const { body } = await request(token, gistId ? {
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
    const result = (await request(token, {
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
    const { body } = await request(token, {
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
    const result = (await request(token, {
      url: `https://gitee.com/api/v5/gists/${gistId}/${sha}`,
    })).body.files[filename];
    if (!result) {
      throw new Error('Gist file not found.');
    }
    return result.content;
  },
};
