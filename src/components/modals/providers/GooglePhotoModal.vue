<template>
  <modal-inner class="modal__inner-1--google-photo" aria-label="导入Google照片">
    <div class="modal__content">
      <div class="google-photo__tumbnail" :style="{backgroundImage: thumbnailUrl}"></div>
      <form-entry label="标题" info="可选的">
        <input slot="field" class="textfield" type="text" v-model.trim="title" @keydown.enter="resolve()">
      </form-entry>
      <form-entry label="尺寸限制" info="可选的">
        <input slot="field" class="textfield" type="text" v-model.trim="size" @keydown.enter="resolve()">
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="reject()">取消</button>
      <button class="button button--resolve" @click="resolve()">确认</button>
    </div>
  </modal-inner>
</template>

<script>
import { mapGetters } from 'vuex';
import ModalInner from '../common/ModalInner';
import FormEntry from '../common/FormEntry';

const makeThumbnail = (url, size) => `${url}=s${size}`;

export default {
  components: {
    ModalInner,
    FormEntry,
  },
  data: () => ({
    title: '',
    size: '',
  }),
  computed: {
    thumbnailUrl() {
      return `url(${makeThumbnail(this.config.url, 320)})`;
    },
    ...mapGetters('modal', [
      'config',
    ]),
  },
  methods: {
    resolve() {
      let { url } = this.config;
      const size = parseInt(this.size, 10);
      if (!Number.isNaN(size)) {
        url = makeThumbnail(url, size);
      }
      if (this.title) {
        url += ` "${this.title}"`;
      }
      const { callback } = this.config;
      this.config.resolve();
      callback(url);
    },
    reject() {
      const { callback } = this.config;
      this.config.reject();
      callback(null);
    },
  },
};
</script>

<style lang="scss">
.google-photo__tumbnail {
  height: 160px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
