<template>
  <modal-inner class="modal__inner-1--chatgpt" aria-label="chatgpt">
    <div class="modal__content">
      <div class="modal__image">
        <icon-chat-gpt></icon-chat-gpt>
      </div>
      <p><b>ChatGPT Content Generation</b><br>The generation time is affected by the response and network response time of the ChatGPT service, which may take a long time.</p>
      <form-entry label="Detailed Description of Generated Content Requirements" error="content">
        <textarea slot="field" class="text-input" type="text" placeholder="Enter Content (Supports Line Breaks)" v-model.trim="content" :disabled="generating || !chatGptConfig.apiKey"></textarea>
        <div class="form-entry__info">
          <span v-if="!chatGptConfig.apiKey" class="config-warning">
            apiKey is not configured. Please click <a href="javascript:void(0)" @click="openConfig">Configure</a> apiKey.
          </span>
          <span v-else>
            <a href="javascript:void(0)" @click="openConfig">Modify apiKey Configuration</a>
          </span>
        </div>
      </form-entry>
      <div class="modal__result">
        <pre class="result_pre" v-if="generating && !result">(Waiting for Generation...)</pre>
        <pre class="result_pre" v-else v-text="result"></pre>
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="reject()">{{ generating ? 'Stop' : 'Close' }}</button>
      <button class="button button--resolve" @click="generate" v-if="!generating && !!content">{{ !!result ? 'Regenerate' : 'Generate' }}</button>
      <button class="button button--resolve" @click="resolve" v-if="!generating && !!result">OK, Insert</button>
    </div>
  </modal-inner>
</template>

<script>
import { mapGetters } from 'vuex';
import modalTemplate from './common/modalTemplate';
import chatGptSvc from '../../services/chatGptSvc';
import store from '../../store';

export default modalTemplate({
  data: () => ({
    generating: false,
    content: '',
    result: '',
    xhr: null,
  }),
  computed: {
    ...mapGetters('chatgpt', [
      'chatGptConfig',
    ]),
  },
  methods: {
    resolve(evt) {
      evt.preventDefault(); // Fixes https://github.com/mafgwo/stackedit/issues/1503
      const { callback } = this.config;
      this.config.resolve();
      callback(this.result);
    },
    process({ done, content, error }) {
      if (done) {
        this.generating = false;
        // Done
      } else if (content) {
        this.result = this.result + content;
        const container = document.querySelector('.result_pre');
        container.scrollTo(0, container.scrollHeight); // Scroll to the bottom
      } else if (error) {
        this.generating = false;
      }
    },
    generate() {
      this.generating = true;
      this.result = '';
      try {
        this.xhr = chatGptSvc.chat(this.chatGptConfig.proxyHost, this.chatGptConfig.apiKey, `${this.content}\n(Outputs results using Markdown)`, this.process);
      } catch (err) {
        this.generating = false;
        store.dispatch('notification/error', err);
      }
    },
    async openConfig() {
      try {
        const config = await store.dispatch('modal/open', { type: 'chatGptConfig', apiKey: this.chatGptConfig.apiKey, proxyHost: this.chatGptConfig.proxyHost });
        store.dispatch('chatgpt/setCurrConfig', config);
      } catch (e) { /* Cancel */ }
    },
    reject() {
      if (this.generating) {
        if (this.xhr) {
          this.xhr.abort();
          this.generating = false;
        }
        return;
      }
      const { callback } = this.config;
      this.config.reject();
      callback(null);
    },
  },
  async created() {
    // Store ChatGPT configuration
    const config = localStorage.getItem('chatgpt/config');
    store.dispatch('chatgpt/setCurrConfig', JSON.parse(config || '{}'));
  },
});
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.modal__inner-1.modal__inner-1--chatgpt {
  max-width: 560px;

  .result_pre {
    font-size: 0.9em;
    font-variant-ligatures: no-common-ligatures;
    line-height: 1.25;
    white-space: pre-wrap;
    word-break: break-word;
    word-wrap: break-word;
    height: 300px;
    border: 1px solid rgb(126, 126, 126);
    border-radius: $border-radius-base;
    padding: 10px;
    overflow-y: scroll; /* Enable vertical scrollbar */
  }

  .result_pre::-webkit-scrollbar {
    display: none; /* Hide scrollbar */
  }

  .result_pre.scroll-bottom {
    scroll-behavior: smooth;
  }

  .config-warning {
    color: #f00;
  }

  .text-input {
    min-height: 60px;
  }
}
</style>
