<template>
  <modal-inner aria-label="插入图像">
    <div class="modal__content">
      <p v-if="hasFile">
        <span v-if="uploading">粘贴/拖拽图片上传中...</span>
        <span v-if="!this.uploading && url">
          <img :src="url">
        </span>
        <span v-if="!this.uploading && !url">图片上传失败，如未添加图床请先添加并选择，之后关闭窗口再重试！</span>
      </p>
      <p v-if="!hasFile">请为您的图像提供<b> url </b>。</p>
      <form-entry v-if="!hasFile" label="URL" error="url">
        <input slot="field" class="textfield" type="text" v-model.trim="url" @keydown.enter="resolve">
      </form-entry>
      <p>添加并选择图床后可实现粘贴/拖拽自动上传图片</p>
      <menu-entry @click.native="checkedImgDest(token.sub, token.providerId)" v-for="token in imageTokens" :key="token.sub">
        <icon-check-circle v-if="checkedStorage.sub === token.sub" slot="icon"></icon-check-circle>
        <icon-check-circle-un v-if="checkedStorage.sub !== token.sub" slot="icon"></icon-check-circle-un>
        <menu-item>
          <icon-provider slot="icon" :provider-id="token.providerId"></icon-provider>
          <div>
            {{ token.remark }}
            <button class="menu-item__button button" @click.stop="remove(token.providerId, token)" v-title="'删除'">
              <icon-delete></icon-delete>
            </button>
          </div>
          <span>{{token.name}}</span>
          <span class="line-entry" v-if="token.uploadUrl">上传地址：{{token.uploadUrl}}</span>
          <span class="line-entry" v-if="token.headers">自定义请求头：{{token.headers}}</span>
          <span class="line-entry" v-if="token.params">自定义Form参数：{{token.params}}</span>
        </menu-item>
      </menu-entry>
      <menu-entry @click.native="checkedImgDest(tokenStorage.sid, 'gitea')" v-for="tokenStorage in giteaTokensImgStorages" :key="tokenStorage.sid">
        <icon-check-circle v-if="checkedStorage.sub === tokenStorage.sid" slot="icon"></icon-check-circle>
        <icon-check-circle-un v-if="checkedStorage.sub !== tokenStorage.sid" slot="icon"></icon-check-circle-un>
        <menu-item>
          <icon-provider slot="icon" provider-id="gitea"></icon-provider>
          <div>Gitea图床
            <button class="menu-item__button button" @click.stop="remove('gitea', tokenStorage)" v-title="'删除'">
              <icon-delete></icon-delete>
            </button>
          </div>
          <span> {{tokenStorage.uname}}, 仓库URL: {{tokenStorage.repoUrl}}, 路径: {{tokenStorage.path}}, 分支: {{tokenStorage.branch}}</span>
        </menu-item>
      </menu-entry>
      <menu-entry @click.native="addSmmsAccount">
        <icon-provider slot="icon" provider-id="smms"></icon-provider>
        <span>添加SM.MS图床账号</span>
      </menu-entry>
      <menu-entry @click.native="addCustomAccount">
        <icon-provider slot="icon" provider-id="custom"></icon-provider>
        <span>添加自定义图床账号</span>
      </menu-entry>
      <menu-entry @click.native="addGiteaImgStorage">
        <icon-provider slot="icon" provider-id="gitea"></icon-provider>
        <span>添加Gitea图床仓库</span>
      </menu-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="reject()">取消</button>
      <button class="button button--resolve" @click="resolve" :disabled="uploading">确认</button>
    </div>
  </modal-inner>
</template>

<script>
import modalTemplate from './common/modalTemplate';
import MenuEntry from '../menus/common/MenuEntry';
import MenuItem from '../menus/common/MenuItem';
import smmsHelper from '../../services/providers/helpers/smmsHelper';
import store from '../../store';
import giteaHelper from '../../services/providers/helpers/giteaHelper';
import customHelper from '../../services/providers/helpers/customHelper';
import utils from '../../services/utils';

export default modalTemplate({
  components: {
    MenuEntry,
    MenuItem,
  },
  data: () => ({
    hasFile: false,
    uploading: false,
    url: '',
  }),
  computed: {
    checkedStorage() {
      return store.getters['img/getCheckedStorage'];
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
    giteaTokensImgStorages() {
      const giteaTokensBySub = store.getters['data/giteaTokensBySub'];
      const imgStorages = [];
      Object.values(giteaTokensBySub)
        .sort((token1, token2) => token1.name.localeCompare(token2.name))
        .forEach((it) => {
          if (!it.imgStorages || it.imgStorages.length === 0) {
            return;
          }
          // 拼接上当前用户名
          it.imgStorages.forEach(storage => imgStorages.push({
            ...storage,
            token: it,
            uname: it.name,
            repoUrl: `${it.serverUrl}/${storage.repoUri}`,
          }));
        });
      return imgStorages;
    },
  },
  async mounted() {
    this.hasFile = false;
    const imgFile = store.getters['img/getImg'];
    if (imgFile) {
      this.hasFile = true;
      this.uploading = true;
      try {
        // 操作图片上传
        // 找到对应的provider 目前仅smms
        const currStorage = this.checkedStorage;
        if (!currStorage) {
          store.dispatch('notification/info', '暂无已选择的图床，未自动上传图片！请选择图床后重新粘贴/拖拽图片！');
          return;
        }
        if (currStorage.provider === 'smms' || currStorage.provider === 'custom') {
          const filterTokens = this.imageTokens.filter(it => it.sub === currStorage.sub);
          if (!filterTokens.length) {
            store.dispatch('notification/info', '图床已失效，未自动上传图片！请选择图床后重新粘贴/拖拽图片！');
            return;
          }
          const token = filterTokens[0];
          const helper = currStorage.provider === 'smms' ? smmsHelper : customHelper;
          try {
            this.url = await helper.uploadFile({
              token,
              file: imgFile,
            });
          } catch (err) {
            store.dispatch('notification/error', err);
          }
        } else if (currStorage.provider === 'gitea') {
          const filterTokenStorages = this.giteaTokensImgStorages
            .filter(it => it.sid === currStorage.sub);
          if (!filterTokenStorages.length) {
            store.dispatch('notification/info', 'Gitea图床已失效，未自动上传图片！请选择图床后重新粘贴/拖拽图片！');
            return;
          }
          const tokenStorage = filterTokenStorages[0];
          const time = new Date();
          const date = time.getDate();
          const month = time.getMonth();
          const year = time.getFullYear();
          let path = tokenStorage.path.replace('{YYYY}', year)
            .replace('{MM}', `0${month}`.slice(-2)).replace('{DD}', `0${date}`.slice(-2));
          path = `${path}${path.endsWith('/') ? '' : '/'}${utils.uid()}.${imgFile.type.split('/')[1]}`;
          try {
            const result = await giteaHelper.uploadFile({
              token: tokenStorage.token,
              projectId: tokenStorage.repoUri,
              branch: tokenStorage.branch,
              path,
              content: imgFile,
              isFile: true,
            });
            this.url = result.content.download_url;
          } catch (err) {
            store.dispatch('notification/error', err);
          }
        } else {
          store.dispatch('notification/info', '暂无已选择的图床，未自动上传图片！请选择图床后重新粘贴/拖拽图片！');
        }
      } finally {
        store.dispatch('img/clearImg');
        this.uploading = false;
      }
    }
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
        }
      } catch (e) {
        // Cancel
      }
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
    async checkedImgDest(sub, provider) {
      let type = 'token';
      if (provider === 'gitea') {
        type = 'tokenRepo';
      }
      store.dispatch('img/changeCheckedStorage', {
        type,
        provider,
        sub,
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
