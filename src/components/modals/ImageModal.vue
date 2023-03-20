<template>
  <modal-inner aria-label="Insert image">
    <div class="modal__content">
      <p>Please provide a <b>URL</b> for your image.</p><span v-if="uploading">(Uploading...)</span></p>
      <form-entry label="URL" error="url">
        <input slot="field" class="textfield" type="text" v-model.trim="url" @keydown.enter="resolve">
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <input class="hidden-file" id="upload-image-file-input" type="file" accept="image/*" :disabled="uploading" @change="uploadImage">
      <label for="upload-image-file-input"><a class="button">Upload Image</a></label>
      <button class="button" @click="reject()">Cancal</button>
      <button class="button button--resolve" @click="resolve" :disabled="uploading">OK</button>
    </div>
    <div>
      <hr />
      <p>After adding and selecting a drawing bed, you can paste/drag images in the editing area and automatically upload them.</p>

      <menu-entry @click.native="checkedImgDest(path)" v-for="path in workspaceImgPath" :key="path">
        <icon-check-circle v-if="checkedStorage.sub === path" slot="icon"></icon-check-circle>
        <icon-check-circle-un v-if="checkedStorage.sub !== path" slot="icon"></icon-check-circle-un>
        <menu-item>
          <icon-provider slot="icon" :provider-id="currentWorkspace.providerId"></icon-provider>
          <div>
            Current Workspace Iamge Upload Path
            <button class="menu-item__button button" @click.stop="removeByPath(path)" v-title="'Delete'">
              <icon-delete></icon-delete>
            </button>
          </div>
          <span>Path: {{path}}</span>
        </menu-item>
      </menu-entry>
      <menu-entry @click.native="checkedImgDest(token.sub, token.providerId)" v-for="token in imageTokens" :key="token.sub">
        <icon-check-circle v-if="checkedStorage.sub === token.sub" slot="icon"></icon-check-circle>
        <icon-check-circle-un v-if="checkedStorage.sub !== token.sub" slot="icon"></icon-check-circle-un>
        <menu-item>
          <icon-provider slot="icon" :provider-id="token.providerId"></icon-provider>
          <div>
            {{ token.remark }}
            <button class="menu-item__button button" @click.stop="remove(token.providerId, token)" v-title="'Delete'">
              <icon-delete></icon-delete>
            </button>
          </div>
          <span>{{token.name}}</span>
          <span class="line-entry" v-if="token.uploadUrl">Upload Url：{{token.uploadUrl}}</span>
          <span class="line-entry" v-if="token.headers">Custom Request Headers：{{token.headers}}</span>
          <span class="line-entry" v-if="token.params">Custom Form Params：{{token.params}}</span>
        </menu-item>
      </menu-entry>
      <menu-entry @click.native="checkedImgDest(tokenStorage.token.sub, tokenStorage.providerId, tokenStorage.sid)" v-for="tokenStorage in tokensImgStorages" :key="tokenStorage.sid">
        <icon-check-circle v-if="checkedStorage.sid === tokenStorage.sid" slot="icon"></icon-check-circle>
        <icon-check-circle-un v-if="checkedStorage.sid !== tokenStorage.sid" slot="icon"></icon-check-circle-un>
        <menu-item>
          <icon-provider slot="icon" :provider-id="tokenStorage.providerId"></icon-provider>
          <div>{{tokenStorage.providerName}}
            <button class="menu-item__button button" @click.stop="remove(tokenStorage.providerId, tokenStorage)" v-title="'Delete'">
              <icon-delete></icon-delete>
            </button>
          </div>
          <span> {{tokenStorage.uname}}, Repo URL: {{tokenStorage.repoUrl}}, Path: {{tokenStorage.path}}, Branch: {{tokenStorage.branch}}</span>
        </menu-item>
      </menu-entry>
      <menu-entry @click.native="addWorkspaceImgPath">
        <icon-provider slot="icon" :provider-id="currentWorkspace.providerId"></icon-provider>
        <span>Add current workspace image path</span>
      </menu-entry>
      <menu-entry @click.native="addSmmsAccount">
        <icon-provider slot="icon" provider-id="smms"></icon-provider>
        <span>Add SM.MS image bed account</span>
      </menu-entry>
      <menu-entry @click.native="addCustomAccount">
        <icon-provider slot="icon" provider-id="custom"></icon-provider>
        <span>Add custom image bed account</span>
      </menu-entry>
      <menu-entry @click.native="addGiteaImgStorage">
        <icon-provider slot="icon" provider-id="gitea"></icon-provider>
        <span>Add Gitea image bed repo</span>
      </menu-entry>
      <menu-entry @click.native="addGithubImgStorage">
        <icon-provider slot="icon" provider-id="github"></icon-provider>
        <span>Add GitHub image bed repo</span>
      </menu-entry>
    </div>
  </modal-inner>
</template>

<script>
import { mapGetters } from 'vuex';
import modalTemplate from './common/modalTemplate';
import MenuEntry from '../menus/common/MenuEntry';
import MenuItem from '../menus/common/MenuItem';
import smmsHelper from '../../services/providers/helpers/smmsHelper';
import store from '../../store';
import giteaHelper from '../../services/providers/helpers/giteaHelper';
import githubHelper from '../../services/providers/helpers/githubHelper';
import customHelper from '../../services/providers/helpers/customHelper';
import utils from '../../services/utils';
import imageSvc from '../../services/imageSvc';

export default modalTemplate({
  components: {
    MenuEntry,
    MenuItem,
  },
  data: () => ({
    uploading: false,
    url: '',
  }),
  computed: {
    ...mapGetters('workspace', [
      'currentWorkspace',
      'currentWorkspaceIsGit',
    ]),
    checkedStorage() {
      return store.getters['img/getCheckedStorage'];
    },
    workspaceImgPath() {
      if (!this.currentWorkspaceIsGit) {
        return [];
      }
      const workspaceImgPath = store.getters['img/getWorkspaceImgPath'];
      return Object.keys(workspaceImgPath || {});
    },
    imageTokens() {
      return [
        ...Object.values(store.getters['data/smmsTokensBySub']).map(token => ({
          ...token,
          providerId: 'smms',
          remark: 'SM.MS图床',
        })),
        ...Object.values(store.getters['data/customTokensBySub']).map(token => ({
          ...token,
          providerId: 'custom',
          headers: token.customHeaders && JSON.stringify(token.customHeaders),
          params: token.customParams && JSON.stringify(token.customParams),
          remark: '自定义图床',
        })),
      ];
    },
    tokensImgStorages() {
      const providerTokens = [
        ...Object.values(store.getters['data/giteaTokensBySub']).map(token => ({
          token,
          providerId: 'gitea',
          providerName: 'Gitea图床',
        })),
        ...Object.values(store.getters['data/githubTokensBySub']).map(token => ({
          token,
          providerId: 'github',
          providerName: 'GitHub图床',
        })),
      ];
      const imgStorages = [];
      Object.values(providerTokens)
        .sort((item1, item2) => item1.token.name.localeCompare(item2.token.name))
        .forEach((it) => {
          if (!it.token.imgStorages || it.token.imgStorages.length === 0) {
            return;
          }
          // 拼接上当前用户名
          it.token.imgStorages.forEach(storage => imgStorages.push({
            ...storage,
            token: it.token,
            uname: it.token.name,
            providerId: it.providerId,
            providerName: it.providerName,
            repoUrl: it.providerId === 'gitea' ? `${it.token.serverUrl}/${storage.repoUri}` : `${storage.owner}/${storage.repo}`,
          }));
        });
      return imgStorages;
    },
  },
  methods: {
    resolve(evt) {
      evt.preventDefault(); // Fixes https://github.com/mafgwo/stackedit/issues/1503
      if (!this.url) {
        this.setError('url');
      } else {
        const { callback } = this.config;
        this.config.resolve();
        callback(this.url);
      }
    },
    reject() {
      const { callback } = this.config;
      this.config.reject();
      callback(null);
    },
    async uploadImage(evt) {
      if (!evt.target.files || !evt.target.files.length) {
        return;
      }
      const imgFile = evt.target.files[0];
      try {
        this.uploading = true;
        const { url, error } = await imageSvc.updateImg(imgFile);
        if (error) {
          store.dispatch('notification/error', error);
          return;
        }
        this.url = url;
      } catch (err) {
        store.dispatch('notification/error', err);
      } finally {
        this.uploading = false;
        // 上传后清空
        evt.target.value = '';
      }
    },
    async remove(proivderId, item) {
      try {
        await store.dispatch('modal/open', 'imgStorageDeletion');
        if (proivderId === 'smms' || proivderId === 'custom') {
          const tokensBySub = utils.deepCopy(store.getters[`data/${proivderId}TokensBySub`]);
          delete tokensBySub[item.sub];
          // 删除账号
          await store.dispatch('data/patchTokensByType', {
            [proivderId]: tokensBySub,
          });
        } else if (proivderId === 'gitea') {
          giteaHelper.removeTokenImgStorage(item.token, item.sid);
        } else if (proivderId === 'github') {
          githubHelper.removeTokenImgStorage(item.token, item.sid);
        }
      } catch (e) {
        // Cancel
      }
    },
    async removeByPath(path) {
      store.dispatch('img/removeWorkspaceImgPath', path);
    },
    async addWorkspaceImgPath() {
      const { path } = await store.dispatch('modal/open', { type: 'workspaceImgPath' });
      store.dispatch('img/addWorkspaceImgPath', path);
    },
    async addSmmsAccount() {
      const { proxyUrl, apiSecretToken } = await store.dispatch('modal/open', { type: 'smmsAccount' });
      await smmsHelper.addAccount(proxyUrl, apiSecretToken);
    },
    async addCustomAccount() {
      const accountInfo = await store.dispatch('modal/open', { type: 'customAccount' });
      await customHelper.addAccount(accountInfo);
    },
    async addGiteaImgStorage() {
      try {
        const applicationInfo = await store.dispatch('modal/open', { type: 'giteaAccount' });
        const token = await giteaHelper.addAccount(applicationInfo);
        const imgStorageInfo = await store.dispatch('modal/open', {
          type: 'giteaImgStorage',
          token,
        });
        giteaHelper.updateToken(token, imgStorageInfo);
      } catch (e) { /* Cancel */ }
    },
    async addGithubImgStorage() {
      try {
        await store.dispatch('modal/open', { type: 'githubAccount' });
        const token = await githubHelper.addAccount(store.getters['data/localSettings'].githubRepoFullAccess);
        const imgStorageInfo = await store.dispatch('modal/open', {
          type: 'githubImgStorage',
          token,
        });
        githubHelper.updateToken(token, imgStorageInfo);
      } catch (e) { /* Cancel */ }
    },
    async checkedImgDest(sub, provider, sid) {
      let type = 'token';
      // 当前文档空间存储
      if (!provider) {
        type = 'workspace';
      } else if (provider === 'gitea' || provider === 'github') {
        type = 'tokenRepo';
      }
      store.dispatch('img/changeCheckedStorage', {
        type,
        provider,
        sub,
        sid,
      });
      // const { callback } = this.config;
      // this.config.reject();
      // const res = await googleHelper.openPicker(token, 'img');
      // if (res[0]) {
      //   store.dispatch('modal/open', {
      //     type: 'googlePhoto',
      //     url: res[0].url,
      //     callback,
      //   });
      // }
    },
  },
});
</script>
<style lang="scss">
.line-entry {
  word-break: break-word; /* 文本行的任意字内断开，就算是一个单词也会分开 */
  word-wrap: break-word; /* IE */
  white-space: -moz-pre-wrap; /* Mozilla */
  white-space: -hp-pre-wrap; /* HP printers */
  white-space: -o-pre-wrap; /* Opera 7 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: pre; /* CSS2 */
  white-space: pre-wrap; /* CSS 2.1 */
  white-space: pre-line; /* CSS 3 (and 2.1 as well, actually) */
}

.menu-item__button {
  width: 30px;
  height: 30px;
  padding: 4px;
  background-color: transparent;
  opacity: 0.75;
}
</style>
