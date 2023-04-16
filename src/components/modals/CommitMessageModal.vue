<template>
  <modal-inner aria-label="commit message">
    <p>Custom <b>{{ config.name }}</b> commit message.</p>
    <div class="modal__content">
      <form-entry label="Commit message">
        <input slot="field" class="textfield" placeholder="not required" type="text" v-model.trim="commitMessage" @keydown.enter="resolve()">
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button button--resolve" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import { mapGetters } from 'vuex';
import ModalInner from './common/ModalInner';

export default {
  components: {
    ModalInner,
  },
  data: () => ({
    commitMessage: '',
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
  },
  methods: {
    resolve() {
      this.config.resolve({
        commitMessage: this.commitMessage,
      });
    },
  },
};
</script>
