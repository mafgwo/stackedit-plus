import store from '../../store';
import giteeHelper from './helpers/giteeHelper';
import Provider from './common/Provider';
import gitWorkspaceSvc from '../gitWorkspaceSvc';
import userSvc from '../userSvc';

const appDataRepo = 'stackedit-app-data';
const appDataBranch = 'master';

export default new Provider({
  id: 'giteeAppData',
  name: 'Gitee应用数据',
  getToken() {
    return store.getters['workspace/syncToken'];
  },
  getWorkspaceParams() {
    // No param as it's the main workspace
    return {};
  },
  getWorkspaceLocationUrl() {
    // No direct link to app data
    return null;
  },
  getSyncDataUrl() {
    // No direct link to app data
    return null;
  },
  getSyncDataDescription({ id }) {
    return id;
  },
  async initWorkspace() {
    // Nothing much to do since the main workspace isn't necessarily synchronized
    // Return the main workspace
    return store.getters['workspace/workspacesById'].main;
  },
  getChanges() {
    const token = this.getToken();
    return giteeHelper.getTree({
      owner: token.name,
      repo: appDataRepo,
      branch: appDataBranch,
      token,
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
      owner: syncToken.name,
      repo: appDataRepo,
      branch: appDataBranch,
      token: syncToken,
      path: syncData.id,
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
        owner: syncToken.name,
        repo: appDataRepo,
        branch: appDataBranch,
        token: syncToken,
        path: syncData.id,
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
      owner: token.name,
      repo: appDataRepo,
      branch: appDataBranch,
      token,
      path: fileSyncData.id,
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
      owner: token.name,
      repo: appDataRepo,
      branch: appDataBranch,
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
    const path = `.stackedit-data/${syncData.id}.json`;
    // const path = store.getters.gitPathsByItemId[syncData.id];
    // const path = syncData.id;
    const { sha, data } = await giteeHelper.downloadFile({
      owner: token.name,
      repo: appDataRepo,
      branch: appDataBranch,
      token,
      path,
    });
    if (!sha) {
      return {};
    }
    gitWorkspaceSvc.shaByPath[path] = sha;
    const item = JSON.parse(data);
    return {
      item,
      syncData: {
        ...syncData,
        hash: item.hash,
        sha,
        type: 'data',
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
    const path = !isImg ? store.getters.gitPathsByItemId[file.id] : file.path;
    const res = await giteeHelper.uploadFile({
      owner: token.name,
      repo: appDataRepo,
      branch: appDataBranch,
      token,
      path,
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
  async uploadWorkspaceData({
    token,
    item,
    syncData,
  }) {
    const path = `.stackedit-data/${item.id}.json`;
    // const path = store.getters.gitPathsByItemId[item.id];
    // const path = syncData.id;
    const res = await giteeHelper.uploadFile({
      token,
      owner: token.name,
      repo: appDataRepo,
      branch: appDataBranch,
      path,
      content: JSON.stringify(item),
      sha: gitWorkspaceSvc.shaByPath[path],
    });

    return {
      syncData: {
        ...syncData,
        type: item.type,
        hash: item.hash,
        data: item.data,
        sha: res.content.sha,
      },
    };
  },
  async listFileRevisions({ token, fileSyncDataId }) {
    const { owner, repo, branch } = {
      owner: token.name,
      repo: appDataRepo,
      branch: appDataBranch,
    };
    const entries = await giteeHelper.getCommits({
      token,
      owner,
      repo,
      sha: branch,
      path: fileSyncDataId,
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
      owner: token.name,
      repo: appDataRepo,
      branch: revisionId,
      token,
      path: fileSyncDataId,
    });
    return Provider.parseContent(data, contentId);
  },
  getFilePathUrl(path) {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return `https://gitee.com/${token.name}/${appDataRepo}/blob/${appDataBranch}${path}`;
  },
});
