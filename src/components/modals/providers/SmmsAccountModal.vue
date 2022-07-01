<template>
  <modal-inner aria-label="链接SM.MS账号">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="smms"></icon-provider>
      </div>
      <p>将您的<b>SM.MS</b>账号链接到<b>StackEdit</b>。</p>
      <form-entry label="跨域代理URL" error="proxyUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="proxyUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          跨域代理URL用于图片上传跨域支持(因SM.MS图床已限制了跨域)，跨域代理如：https://cors.zme.ink/ 或 https://cors.eu.org/
        </div>
      </form-entry>
      <form-entry label="Api Secret Token" error="apiSecretToken">
        <input slot="field" class="textfield" type="text" v-model.trim="apiSecretToken" @keydown.enter="resolve()">

        <div class="form-entry__info">
          从 <a href="https://sm.ms/home/apitoken" target="_blank">SM.MS</a> 获取Api Secret Token.
        </div>
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">取消</button>
      <button class="button button--resolve" @click="resolve()">确认</button>
    </div>
  </modal-inner>
</template>

<script>
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  computedLocalSettings: {
    proxyUrl: 'proxyUrl',
    apiSecretToken: 'apiSecretToken',
  },
  methods: {
    resolve() {
      if (!this.proxyUrl) {
        this.setError('proxyUrl');
      }
      if (!this.apiSecretToken) {
        this.setError('apiSecretToken');
      }
      if (this.proxyUrl && this.apiSecretToken) {
        this.config.resolve({
          proxyUrl: this.proxyUrl,
          apiSecretToken: this.apiSecretToken,
        });
      }
    },
  },
});
</script>
