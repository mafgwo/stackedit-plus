import store from '../../store';
import giteeHelper from './helpers/giteeHelper';
import Provider from './common/Provider';
import utils from '../utils';
import userSvc from '../userSvc';
import gitWorkspaceSvc from '../gitWorkspaceSvc';
import badgeSvc from '../badgeSvc';

const getAbsolutePath = ({ id }) =>
  `${store.getters['workspace/currentWorkspace'].path || ''}${id}`;

export default new Provider({
  id: 'giteeWorkspace',
  name: 'Gitee',
  getToken() {
    return store.getters['workspace/syncToken'];
  },
  getWorkspaceParams({
    owner,
    repo,
    branch,
    path,
  }) {
    return {
      providerId: this.id,
      owner,
      repo,
      branch,
      path,
    };
  },
  getWorkspaceLocationUrl({
    owner,
    repo,
    branch,
    path,
  }) {
    return `https://gitee.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/tree/${encodeURIComponent(branch)}/${utils.encodeUrlPath(path)}`;
  },
  getSyncDataUrl({ id }) {
    const { owner, repo, branch } = store.getters['workspace/currentWorkspace'];
    return `https://gitee.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/tree/${encodeURIComponent(branch)}/${utils.encodeUrlPath(getAbsolutePath({ id }))}`;
  },
  getSyncDataDescription({ id }) {
    return getAbsolutePath({ id });
  },
  async initWorkspace() {
    const { owner, repo, branch } = utils.queryParams;
    const workspaceParams = this.getWorkspaceParams({ owner, repo, branch });
    if (!branch) {
      workspaceParams.branch = 'master';
    }

    // Extract path param
    const path = (utils.queryParams.path || '')
      .trim()
      .replace(/^\/*/, '') // Remove leading `/`
      .replace(/\/*$/, '/'); // Add trailing `/`
    if (path !== '/') {
      workspaceParams.path = path;
    }

    const workspaceId = utils.makeWorkspaceId(workspaceParams);
    const workspace = store.getters['workspace/workspacesById'][workspaceId];

    // See if we already have a token
    let token;
    if (workspace) {
      // Token sub is in the workspace
      token = store.getters['data/giteeTokensBySub'][workspace.sub];
    }
    if (!token) {
      await store.dispatch('modal/open', { type: 'giteeAccount' });
      token = await giteeHelper.addAccount();
    }

    if (!workspace) {
      const pathEntries = (path || '').split('/');
      const name = pathEntries[pathEntries.length - 2] || repo; // path ends with `/`
      store.dispatch('workspace/patchWorkspacesById', {
        [workspaceId]: {
          ...workspaceParams,
          id: workspaceId,
          sub: token.sub,
          name,
        },
      });
    }

    badgeSvc.addBadge('addGiteeWorkspace');
    return store.getters['workspace/workspacesById'][workspaceId];
  },
  getChanges() {
    return giteeHelper.getTree({
      ...store.getters['workspace/currentWorkspace'],
      token: this.getToken(),
    });
  },
  prepareChanges(tree) {
    return gitWorkspaceSvc.makeChanges(tree);
  },
  async saveWorkspaceItem({ item }) {
    const syncData = {
      id: store.getters.gitPathsByItemId[item.id],
      type: item.type,
      hash: item.hash,
    };

    // Files and folders are not in git, only contents
    if (item.type === 'file' || item.type === 'folder') {
      return { syncData };
    }

    // locations are stored as paths, so we upload an empty file
    const syncToken = store.getters['workspace/syncToken'];
    await giteeHelper.uploadFile({
      ...store.getters['workspace/currentWorkspace'],
      token: syncToken,
      path: getAbsolutePath(syncData),
      content: '',
      sha: gitWorkspaceSvc.shaByPath[syncData.id],
      commitMessage: item.commitMessage,
    });

    // Return sync data to save
    return { syncData };
  },
  async removeWorkspaceItem({ syncData }) {
    if (gitWorkspaceSvc.shaByPath[syncData.id]) {
      const syncToken = store.getters['workspace/syncToken'];
      await giteeHelper.removeFile({
        ...store.getters['workspace/currentWorkspace'],
        token: syncToken,
        path: getAbsolutePath(syncData),
        sha: gitWorkspaceSvc.shaByPath[syncData.id],
      });
    }
  },
  async downloadWorkspaceContent({
    token,
    contentId,
    contentSyncData,
    fileSyncData,
  }) {
    const { sha, data } = await giteeHelper.downloadFile({
      ...store.getters['workspace/currentWorkspace'],
      token,
      path: getAbsolutePath(fileSyncData),
    });
    gitWorkspaceSvc.shaByPath[fileSyncData.id] = sha;
    const content = Provider.parseContent(data, contentId);
    return {
      content,
      contentSyncData: {
        ...contentSyncData,
        hash: content.hash,
        sha,
      },
    };
  },
  async downloadFile({ token, path }) {
    const { sha, data } = await giteeHelper.downloadFile({
      ...store.getters['workspace/currentWorkspace'],
      token,
      path,
      isImg: true,
    });
    return {
      content: data,
      sha,
    };
  },
  async downloadWorkspaceData({ token, syncData }) {
    if (!syncData) {
      return {};
    }

    const { sha, data } = await giteeHelper.downloadFile({
      ...store.getters['workspace/currentWorkspace'],
      token,
      path: getAbsolutePath(syncData),
    });
    gitWorkspaceSvc.shaByPath[syncData.id] = sha;
    const item = JSON.parse(data);
    return {
      item,
      syncData: {
        ...syncData,
        hash: item.hash,
        sha,
      },
    };
  },
  async uploadWorkspaceContent({
    token,
    content,
    file,
    commitMessage,
  }) {
    const isImg = file.type === 'img';
    const path = store.getters.gitPathsByItemId[file.id] || '';
    const absolutePath = !isImg ? `${store.getters['workspace/currentWorkspace'].path || ''}${path}` : file.path;
    const res = await giteeHelper.uploadFile({
      ...store.getters['workspace/currentWorkspace'],
      token,
      path: absolutePath,
      content: !isImg ? Provider.serializeContent(content) : file.content,
      sha: gitWorkspaceSvc.shaByPath[!isImg ? path : file.path],
      isImg,
      commitMessage,
    });

    if (isImg) {
      return {
        sha: res.content.sha,
      };
    }
    // Return new sync data
    return {
      contentSyncData: {
        id: store.getters.gitPathsByItemId[content.id],
        type: content.type,
        hash: content.hash,
        sha: res.content.sha,
      },
      fileSyncData: {
        id: path,
        type: 'file',
        hash: file.hash,
      },
    };
  },
  async uploadWorkspaceData({ token, item }) {
    const path = store.getters.gitPathsByItemId[item.id];
    const syncData = {
      id: path,
      type: item.type,
      hash: item.hash,
    };
    const res = await giteeHelper.uploadFile({
      ...store.getters['workspace/currentWorkspace'],
      token,
      path: getAbsolutePath(syncData),
      content: JSON.stringify(item),
      sha: gitWorkspaceSvc.shaByPath[path],
    });

    return {
      syncData: {
        ...syncData,
        sha: res.content.sha,
      },
    };
  },
  async listFileRevisions({ token, fileSyncDataId }) {
    const { owner, repo, branch } = store.getters['workspace/currentWorkspace'];
    const entries = await giteeHelper.getCommits({
      token,
      owner,
      repo,
      sha: branch,
      path: getAbsolutePath({ id: fileSyncDataId }),
    });

    return entries.map(({
      author,
      committer,
      commit,
      sha,
    }) => {
      let user;
      if (author && author.login) {
        user = author;
      } else if (committer && committer.login) {
        user = committer;
      }
      const sub = `${giteeHelper.subPrefix}:${user.login}`;
      if (user.avatar_url && user.avatar_url.endsWith('.png') && !user.avatar_url.endsWith('no_portrait.png')) {
        user.avatar_url = `${user.avatar_url}!avatar60`;
      }
      userSvc.addUserInfo({ id: sub, name: user.login, imageUrl: user.avatar_url });
      const date = (commit.author && commit.author.date)
        || (commit.committer && commit.committer.date)
        || 1;
      return {
        id: sha,
        sub,
        message: commit.message,
        created: new Date(date).getTime(),
      };
    });
  },
  async loadFileRevision() {
    // Revisions are already loaded
    return false;
  },
  async getFileRevisionContent({
    token,
    contentId,
    fileSyncDataId,
    revisionId,
  }) {
    const { data } = await giteeHelper.downloadFile({
      ...store.getters['workspace/currentWorkspace'],
      token,
      branch: revisionId,
      path: getAbsolutePath({ id: fileSyncDataId }),
    });
    return Provider.parseContent(data, contentId);
  },
  getFilePathUrl(path) {
    const workspace = store.getters['workspace/currentWorkspace'];
    return `https://gitee.com/${workspace.owner}/${workspace.repo}/blob/${workspace.branch}${path}`;
  },
});
