import store from '../../store';
import giteeHelper from './helpers/giteeHelper';
import Provider from './common/Provider';
import utils from '../utils';
import workspaceSvc from '../workspaceSvc';
import userSvc from '../userSvc';

const savedSha = {};

export default new Provider({
  id: 'gitee',
  name: 'Gitee',
  getToken({ sub }) {
    return store.getters['data/giteeTokensBySub'][sub];
  },
  getLocationUrl({
    owner,
    repo,
    branch,
    path,
  }) {
    return `https://gitee.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/tree/${encodeURIComponent(branch)}/${utils.encodeUrlPath(path)}`;
  },
  getLocationDescription({ path }) {
    return path;
  },
  async downloadContent(token, syncLocation) {
    const { sha, data } = await giteeHelper.downloadFile({
      ...syncLocation,
      token,
    });
    savedSha[syncLocation.id] = sha;
    return Provider.parseContent(data, `${syncLocation.fileId}/content`);
  },
  async uploadContent(token, content, syncLocation) {
    if (!savedSha[syncLocation.id]) {
      try {
        // Get the last sha
        await this.downloadContent(token, syncLocation);
      } catch (e) {
        // Ignore error
      }
    }
    const sha = savedSha[syncLocation.id];
    delete savedSha[syncLocation.id];
    await giteeHelper.uploadFile({
      ...syncLocation,
      token,
      content: Provider.serializeContent(content),
      sha,
    });
    return syncLocation;
  },
  async publish(token, html, metadata, publishLocation, commitMessage) {
    try {
      // Get the last sha
      await this.downloadContent(token, publishLocation);
    } catch (e) {
      // Ignore error
    }
    const sha = savedSha[publishLocation.id];
    delete savedSha[publishLocation.id];
    await giteeHelper.uploadFile({
      ...publishLocation,
      token,
      content: html,
      sha,
      commitMessage,
    });
    return publishLocation;
  },
  async openFile(token, syncLocation) {
    // Check if the file exists and open it
    if (!Provider.openFileWithLocation(syncLocation)) {
      // Download content from Gitee
      let content;
      try {
        content = await this.downloadContent(token, syncLocation);
      } catch (e) {
        store.dispatch('notification/error', `Could not open file ${syncLocation.path}.`);
        return;
      }

      // Create the file
      let name = syncLocation.path;
      const slashPos = name.lastIndexOf('/');
      if (slashPos > -1 && slashPos < name.length - 1) {
        name = name.slice(slashPos + 1);
      }
      const dotPos = name.lastIndexOf('.');
      if (dotPos > 0 && slashPos < name.length) {
        name = name.slice(0, dotPos);
      }
      const item = await workspaceSvc.createFile({
        name,
        parentId: store.getters['file/current'].parentId,
        text: content.text,
        properties: content.properties,
        discussions: content.discussions,
        comments: content.comments,
      }, true);
      store.commit('file/setCurrentId', item.id);
      workspaceSvc.addSyncLocation({
        ...syncLocation,
        fileId: item.id,
      });
      store.dispatch('notification/info', `${store.getters['file/current'].name}已从Gitee导入。`);
    }
  },
  makeLocation(token, owner, repo, branch, path) {
    return {
      providerId: this.id,
      sub: token.sub,
      owner,
      repo,
      branch,
      path,
    };
  },
  async listFileRevisions({ token, syncLocation }) {
    const entries = await giteeHelper.getCommits({
      ...syncLocation,
      token,
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
        || (commit.committer && commit.committer.date);
      return {
        id: sha,
        sub,
        message: commit.message,
        created: date ? new Date(date).getTime() : 1,
      };
    });
  },
  async loadFileRevision() {
    // Revision are already loaded
    return false;
  },
  async getFileRevisionContent({
    token,
    contentId,
    syncLocation,
    revisionId,
  }) {
    const { data } = await giteeHelper.downloadFile({
      ...syncLocation,
      token,
      branch: revisionId,
    });
    return Provider.parseContent(data, contentId);
  },
});
