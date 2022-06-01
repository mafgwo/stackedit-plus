<template>
  <modal-inner aria-label="增加CouchDB工作区">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="couchdb"></icon-provider>
      </div>
      <p>创建一个与<b>CouchDB</b>数据库同步的工作区。</p>
      <form-entry label="Database URL" error="dbUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="dbUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>例如:</b> https://instance.smileupps.com/stackedit-workspace
        </div>
        <div class="form-entry__actions">
          <!-- https://community.stackedit.io/t/couchdb-workspace-setup/ -->
          <a href="#" target="_blank">如何设置？</a>
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
import utils from '../../../services/utils';

export default modalTemplate({
  data: () => ({
    dbUrl: '',
  }),
  methods: {
    resolve() {
      if (!this.dbUrl) {
        this.setError('dbUrl');
      } else {
        const url = utils.addQueryParams('app', {
          providerId: 'couchdbWorkspace',
          dbUrl: this.dbUrl,
        }, true);
        this.config.resolve();
        window.open(url);
      }
    },
  },
});
</script>

<style lang="scss">
.couchdb-workspace__info {
  font-size: 0.8em;
}
</style>
