<template>
  <modal-inner aria-label="ChatGPT Configuration">
    <div class="modal__content">
      <div class="modal__image">
        <icon-chat-gpt></icon-chat-gpt>
      </div>
      <p> <b>ChatGPT</b> Configuration<br>If the official ChatGPT API address cannot be accessed, you need to find a proxy address yourself.</p>
      <form-entry label="Proxy address" error="proxyHost">
        <input slot="field" class="textfield" type="text" v-model.trim="proxyHost" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Optional. The default is the official API address (https://api.openai.com). An example of a proxy address is:</b> https://openai.geekr.cool
        </div>
      </form-entry>
      <form-entry label="apiKey" error="apiKey">
        <input slot="field" class="textfield" type="text" v-model.trim="apiKey" @keydown.enter="resolve()">
        <div class="form-entry__info">
          Please obtain the <b>apiKey</b> from <a href="https://platform.openai.com/account/api-keys" target="_blank">https://platform.openai.com/account/api-keys</a>.<br>
        </div>
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button button--resolve" @click="resolve()">OK</button>
    </div>
  </modal-inner>
</template>

<script>
import modalTemplate from './common/modalTemplate';

export default modalTemplate({
  data: () => ({
    apiKey: null,
    proxyHost: null,
  }),
  methods: {
    resolve() {
      if (!this.apiKey) {
        this.setError('apiKey');
      }
      if (this.proxyHost && this.proxyHost.endsWith('/')) {
        this.proxyHost = this.proxyHost.substring(0, this.proxyHost.length - 1);
      }
      this.config.resolve({ apiKey: this.apiKey, proxyHost: this.proxyHost });
    },
  },
  mounted() {
    this.apiKey = this.config.apiKey;
    this.proxyHost = this.config.proxyHost;
  },
});
</script>
