<template>
  <modal-inner aria-label="GitLab账号">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gitlab"></icon-provider>
      </div>
      <p>将您的<b>GitLab</b>链接到<b>StackEdit中文版</b>。</p>
      <template v-if="!useServerConf">
        <form-entry label="GitLab URL" error="serverUrl">
          <input v-if="config.forceServerUrl" slot="field" class="textfield" type="text" disabled="disabled" v-model="config.forceServerUrl">
          <input v-else slot="field" class="textfield" type="text" v-model.trim="serverUrl" @keydown.enter="resolve()">
          <div class="form-entry__info">
            <b>例如:</b> https://gitlab.example.com/
            <span v-if="httpAppUrl">
              ，非https的URL，请跳转到 <a :href="httpAppUrl" target="_blank">HTTP链接</a> 添加Gitlab。
            </span>
          </div>
        </form-entry>
        <form-entry label="Application ID" error="applicationId">
          <input slot="field" class="textfield" type="text" v-model.trim="applicationId" @keydown.enter="resolve()">
          <div class="form-entry__info">
            您必须使用重定向url <b>{{redirectUrl}}</b>配置OAuth2应用程序
          </div>
          <div class="form-entry__actions">
            <a href="https://docs.gitlab.com/ee/integration/oauth_provider.html" target="_blank">更多信息</a>
          </div>
        </form-entry>
      </template>
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
import store from '../../../store';
import networkSvc from '../../../services/networkSvc';

export default modalTemplate({
  data: () => ({
    redirectUrl: constants.oauth2RedirectUri,
  }),
  computedLocalSettings: {
    serverUrl: 'gitlabServerUrl',
    applicationId: 'gitlabApplicationId',
  },
  computed: {
    httpAppUrl() {
      if (constants.origin.indexOf('https://') === 0 && this.serverUrl.indexOf('http://') === 0) {
        return `${constants.origin.replace('https://', 'http://')}/app`;
      }
      return null;
    },
    // 是否使用服务端配置
    useServerConf() {
      const confClientId = store.getters['data/serverConf'].gitlabClientId;
      const confServerUrl = store.getters['data/serverConf'].gitlabUrl;
      return !!confClientId && !!confServerUrl;
    },
  },
  mounted() {
    networkSvc.getServerConf();
  },
  methods: {
    resolve() {
      if (this.useServerConf) {
        this.config.resolve({});
        return;
      }
      const serverUrl = this.config.forceServerUrl || this.serverUrl;
      if (!serverUrl) {
        this.setError('serverUrl');
      }
      if (!this.applicationId) {
        this.setError('applicationId');
      }
      if (serverUrl && this.applicationId) {
        const parsedUrl = serverUrl.match(/^(http[s]?:\/\/[^/]+)/);
        if (!parsedUrl) {
          this.setError('serverUrl');
        } else {
          this.config.resolve({
            serverUrl: parsedUrl[1],
            applicationId: this.applicationId,
          });
        }
      }
    },
  },
});
</script>
