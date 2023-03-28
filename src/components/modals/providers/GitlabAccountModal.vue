<template>
  <modal-inner aria-label="GitLab account">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gitlab"></icon-provider>
      </div>
      <p>Link your <b>GitLab</b> account to <b>StackEdit+</b>.</p>
      <template v-if="!useServerConf">
        <form-entry label="GitLab URL" error="serverUrl">
          <input v-if="config.forceServerUrl" slot="field" class="textfield" type="text" disabled="disabled" v-model="config.forceServerUrl">
          <input v-else slot="field" class="textfield" type="text" v-model.trim="serverUrl" @keydown.enter="resolve()">
          <div class="form-entry__info">
            <b>Example:</b> https://gitlab.example.com/
            <span v-if="httpAppUrl">
              , if it is not an https URL, please go to <a :href="httpAppUrl" target="_blank">HTTP Link</a> to add Gitlab。
            </span>
          </div>
        </form-entry>
        <form-entry label="Application ID" error="applicationId">
          <input slot="field" class="textfield" type="text" v-model.trim="applicationId" @keydown.enter="resolve()">
          <div class="form-entry__info">
            You have to configure an OAuth2 Application with redirect URL <b>{{redirectUrl}}</b>
          </div>
          <div class="form-entry__actions">
            <a href="https://docs.gitlab.com/ee/integration/oauth_provider.html" target="_blank">More info</a>
          </div>
        </form-entry>
      </template>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button button--resolve" @click="resolve()">Ok</button>
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
    // use server conf
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
