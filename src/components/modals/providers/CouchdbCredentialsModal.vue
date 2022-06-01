<template>
  <modal-inner aria-label="插入图片">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="couchdb"></icon-provider>
      </div>
      <p>请提供您的凭据，以登录<b>CouchDB</b>。</p>
      <form-entry label="用户名" error="name">
        <input slot="field" class="textfield" type="text" v-model.trim="name" @keydown.enter="resolve()">
      </form-entry>
      <form-entry label="密码" error="password">
        <input slot="field" class="textfield" type="password" v-model.trim="password" @keydown.enter="resolve()">
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
import store from '../../../store';

export default modalTemplate({
  data: () => ({
    name: '',
    password: '',
  }),
  created() {
    this.name = this.config.token.name;
    this.password = this.config.token.password;
  },
  methods: {
    resolve() {
      if (!this.name) {
        this.setError('name');
      }
      if (!this.password) {
        this.setError('password');
      }
      if (this.name && this.password) {
        const token = {
          ...this.config.token,
          name: this.name,
          password: this.password,
        };
        store.dispatch('data/addCouchdbToken', token);
        this.config.resolve();
      }
    },
  },
});
</script>
