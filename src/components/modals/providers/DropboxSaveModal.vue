<template>
  <modal-inner aria-label="与 Dropbox 同步">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="dropbox"></icon-provider>
      </div>
      <p>将<b> {{CurrentFileName}} </b>保存到您的<b>Dropbox</b>并保持同步。</p>
      <form-entry label="File path" error="path">
        <input slot="field" class="textfield" type="text" v-model.trim="path" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>例如:</b> {{config.token.fullAccess ? '' : '/Applications/StackEdit (restricted)'}}/path/to/My Document.md<br>
          如果文件存在，将被覆盖。
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
import dropboxProvider from '../../../services/providers/dropboxProvider';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    path: '',
  }),
  created() {
    this.path = `/${this.currentFileName}.md`;
  },
  methods: {
    resolve() {
      if (!dropboxProvider.checkPath(this.path)) {
        this.setError('path');
      } else {
        // Return new location
        const location = dropboxProvider.makeLocation(this.config.token, this.path);
        this.config.resolve(location);
      }
    },
  },
});
</script>
