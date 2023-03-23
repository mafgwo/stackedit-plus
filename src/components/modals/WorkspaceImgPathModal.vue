<template>
  <modal-inner aria-label="Workspace image path">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider :provider-id="currentWorkspace.providerId"></icon-provider>
      </div>
      <p>Add an image upload path to the current workspace.</p>
      <form-entry label="Image upload path" error="path">
        <input slot="field" class="textfield" type="text" placeholder="Default: /imgs/{YYYY}-{MM}-{DD}" v-model.trim="path" @keydown.enter="resolve()">
        <div class="form-entry__info">
          If not provided, the default value is <b>/imgs/{YYYY}-{MM}-{DD}</b>.<br/>
          Supports relative paths, such as: ./imgs、../imgs or imgs.<br/>
          Variable description: {YYYY} is a year variable, {MM} is a month variable, {DD} is a day variable, and {MDNAME} is the current document name.
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
import { mapGetters } from 'vuex';
import modalTemplate from './common/modalTemplate';

export default modalTemplate({
  computedLocalSettings: {
    path: '',
  },
  computed: {
    ...mapGetters('workspace', [
      'currentWorkspace',
    ]),
  },
  methods: {
    resolve() {
      if (!this.path) {
        this.setError('path');
      }
      this.config.resolve({
        path: this.path || '/imgs/{YYYY}-{MM}-{DD}',
      });
    },
  },
});
</script>
