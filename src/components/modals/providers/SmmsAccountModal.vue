<template>
  <modal-inner aria-label="Link SM.MS account">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="smms"></icon-provider>
      </div>
      <p>Link your <b>SM.MS</b> account to <b>StackEdit+</b>.</p>
      <form-entry label="Cross domain proxy URL" error="proxyUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="proxyUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          The cross domain proxy URL is used for cross domain support of image uploading (because the SM.MS map bed has limited cross domain support), such as: https://cors.zme.ink/ Or https://cors.eu.org/
        </div>
      </form-entry>
      <form-entry label="Api Secret Token" error="apiSecretToken">
        <input slot="field" class="textfield" type="text" v-model.trim="apiSecretToken" @keydown.enter="resolve()">

        <div class="form-entry__info">
          From <a href="https://sm.ms/home/apitoken" target="_blank">SM.MS</a> get Api Secret Token.
        </div>
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancal</button>
      <button class="button button--resolve" @click="resolve()">Ok</button>
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
