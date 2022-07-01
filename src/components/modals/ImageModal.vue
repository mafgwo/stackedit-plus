<template>
  <modal-inner aria-label="插入图像">
    <div class="modal__content">
      <p v-if="hasFile">
        <span v-if="uploading">粘贴/拖拽图片上传中...</span>
        <span v-if="!this.uploading && url">
          <img :src="url">
        </span>
        <span v-if="!this.uploading && !url">图片上传失败，如未添加SM.MS账号请先添加并选择，之后关闭窗口再重试！</span>
      </p>
      <p v-if="!hasFile">请为您的图像提供<b> url </b>。</p>
      <form-entry v-if="!hasFile" label="URL" error="url">
        <input slot="field" class="textfield" type="text" v-model.trim="url" @keydown.enter="resolve">
      </form-entry>
      <p>添加并选择图床后可实现粘贴/拖拽自动上传图片</p>
      <menu-entry @click.native="checkedImgDest(token, 'smms')" v-for="token in smmsTokens" :key="token.sub">
        <icon-check-circle v-if="checkedStorage.sub === token.sub" slot="icon"></icon-check-circle>
        <icon-check-circle-un v-if="checkedStorage.sub !== token.sub" slot="icon"></icon-check-circle-un>
        <menu-entry>
          <icon-provider slot="icon" provider-id="smms"></icon-provider>
          <div>SM.MS图床</div>
          <span>{{token.name}}</span>
        </menu-entry>
      </menu-entry>
      <menu-entry @click.native="addSmmsAccount">
        <icon-provider slot="icon" provider-id="smms"></icon-provider>
        <span>添加SM.MS账号</span>
      </menu-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="reject()">取消</button>
      <button class="button button--resolve" @click="resolve">确认</button>
    </div>
  </modal-inner>
</template>

<script>
import modalTemplate from './common/modalTemplate';
import MenuEntry from '../menus/common/MenuEntry';
import smmsHelper from '../../services/providers/helpers/smmsHelper';
import store from '../../store';

export default modalTemplate({
  components: {
    MenuEntry,
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
    smmsTokens() {
      const smmsTokensBySub = store.getters['data/smmsTokensBySub'];
      return Object.values(smmsTokensBySub)
        .sort((token1, token2) => token1.name.localeCompare(token2.name));
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
        if (!currStorage || !currStorage.sub) {
          store.dispatch('notification/info', '暂无已选择的图床，未自动上传图片！请选择图床后重新粘贴/拖拽图片！');
          return;
        }
        const filterTokens = this.smmsTokens.filter(it => it.sub === currStorage.sub);
        if (!filterTokens.length) {
          store.dispatch('notification/info', '暂无已选择的图床，未自动上传图片！请选择图床后重新粘贴/拖拽图片！');
          return;
        }
        const token = filterTokens[0];
        this.url = await smmsHelper.uploadFile({
          token,
          file: imgFile,
        });
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
    async addSmmsAccount() {
      const { proxyUrl, apiSecretToken } = await store.dispatch('modal/open', { type: 'smmsAccount' });
      await smmsHelper.addAccount(proxyUrl, apiSecretToken);
    },
    async checkedImgDest(token, provider) {
      store.dispatch('img/changeCheckedStorage', {
        type: 'token',
        provider,
        sub: token.sub,
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
