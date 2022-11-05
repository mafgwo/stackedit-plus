<template>
  <modal-inner aria-label="文档空间图片路径">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider :provider-id="currentWorkspace.providerId"></icon-provider>
      </div>
      <p>在当前文档空间增加图片上传路径。</p>
      <form-entry label="图片上传路径" error="path">
        <input slot="field" class="textfield" type="text" placeholder="如：/imgs/{YYYY}-{MM}-{DD}" v-model.trim="path" @keydown.enter="resolve()">
        <div class="form-entry__info">
          如果不提供，默认为 /imgs/{YYYY}-{MM}-{DD}。<br/>
          支持相对路径，如 ./imgs、../imgs 或 imgs 都是相对当前编辑中文档的路径。<br/>
          变量说明：{YYYY}为年变量、{MM}为月变量、{DD}为日变量、{MDNAME}为当前文档名称
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
      const path = this.path && this.path.replace(/^\//, '');
      this.config.resolve({
        path: path || '/imgs/{YYYY}-{MM}-{DD}',
      });
    },
  },
});
</script>
