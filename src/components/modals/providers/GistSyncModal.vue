<template>
  <modal-inner aria-label="与 Gist 同步">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gist"></icon-provider>
      </div>
      <p>将<b> {{currentFileName}} </b>保存到<b>Gist</b>并保持同步。</p>
      <form-entry label="Filename" error="filename">
        <input slot="field" class="textfield" type="text" v-model.trim="filename" @keydown.enter="resolve()">
      </form-entry>
      <div class="form-entry">
        <div class="form-entry__checkbox">
          <label>
            <input type="checkbox" v-model="isPublic"> 公开的
          </label>
        </div>
      </div>
      <form-entry label="Existing Gist ID" info="可选的">
        <input slot="field" class="textfield" type="text" v-model.trim="gistId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          如果文件存在于Gist中，则将被覆盖。
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
import gistProvider from '../../../services/providers/gistProvider';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    filename: '',
    gistId: '',
  }),
  computedLocalSettings: {
    isPublic: 'gistIsPublic',
  },
  created() {
    this.filename = `${this.currentFileName}.md`;
  },
  methods: {
    resolve() {
      if (!this.filename) {
        this.setError('filename');
      } else {
        // Return new location
        const location = gistProvider.makeLocation(
          this.config.token,
          this.filename,
          this.isPublic,
          this.gistId,
        );
        this.config.resolve(location);
      }
    },
  },
});
</script>
