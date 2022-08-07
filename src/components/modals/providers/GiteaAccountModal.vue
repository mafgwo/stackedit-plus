<template>
  <modal-inner aria-label="Gitea账号">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gitea"></icon-provider>
      </div>
      <p>将您的<b>Gitea</b>链接到<b>StackEdit中文版</b>。</p>
      <form-entry label="Gitea URL" error="serverUrl">
        <input v-if="config.forceServerUrl" slot="field" class="textfield" type="text" disabled="disabled" v-model="config.forceServerUrl">
        <input v-else slot="field" class="textfield" type="text" v-model.trim="serverUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>例如:</b> https://gitea.example.com/
          <span v-if="httpAppUrl">
            ，非https的URL，请跳转到 <a :href="httpAppUrl" target="_blank">HTTP链接</a> 添加Gitea。
          </span>
        </div>
      </form-entry>
      <form-entry label="Application ID" error="applicationId">
        <input slot="field" class="textfield" type="text" v-model.trim="applicationId" @keydown.enter="resolve()">
      </form-entry>
      <form-entry label="Application Secret" error="applicationSecret">
        <input slot="field" class="textfield" type="text" v-model.trim="applicationSecret" @keydown.enter="resolve()">
        <div class="form-entry__info">
          您必须使用重定向url <b>{{redirectUrl}}</b>配置OAuth2应用程序
        </div>
        <div class="form-entry__actions">
          <a href="https://docs.gitea.io/en-us/oauth2-provider/" target="_blank">更多信息</a>
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
import constants from '../../../data/constants';

export default modalTemplate({
  data: () => ({
    redirectUrl: constants.oauth2RedirectUri,
  }),
  computedLocalSettings: {
    serverUrl: 'giteaServerUrl',
    applicationId: 'giteaApplicationId',
    applicationSecret: 'giteaApplicationSecret',
  },
  computed: {
    httpAppUrl() {
      if (constants.origin.indexOf('https://') === 0 && this.serverUrl.indexOf('http://') === 0) {
        return `${constants.origin.replace('https://', 'http://')}/app`;
      }
      return null;
    },
  },
  methods: {
    resolve() {
      const serverUrl = this.config.forceServerUrl || this.serverUrl;
      if (!serverUrl) {
        this.setError('serverUrl');
      }
      if (!this.applicationId) {
        this.setError('applicationId');
      }
      if (!this.applicationSecret) {
        this.setError('applicationSecret');
      }
      if (serverUrl && this.applicationId) {
        const parsedUrl = serverUrl.match(/^(http[s]?:\/\/[^/]+)/);
        if (!parsedUrl) {
          this.setError('serverUrl');
        } else {
          this.config.resolve({
            serverUrl: parsedUrl[1],
            applicationId: this.applicationId,
            applicationSecret: this.applicationSecret,
          });
        }
      }
    },
  },
});
</script>
