<template>
  <modal-inner aria-label="Gitea account">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gitea"></icon-provider>
      </div>
      <p>Link your <b>Gitea</b> account to <b>StackEdit</b>.</p>
      <form-entry label="Gitea URL" error="serverUrl">
        <input v-if="config.forceServerUrl" slot="field" class="textfield" type="text" disabled="disabled" v-model="config.forceServerUrl">
        <input v-else slot="field" class="textfield" type="text" v-model.trim="serverUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> https://gitea.example.com/
        </div>
      </form-entry>
      <form-entry label="Application ID" error="applicationId">
        <input slot="field" class="textfield" type="text" v-model.trim="applicationId" @keydown.enter="resolve()">
      </form-entry>
      <form-entry label="Application Secret" error="applicationSecret">
        <input slot="field" class="textfield" type="text" v-model.trim="applicationSecret" @keydown.enter="resolve()">
        <div class="form-entry__info">
          You have to configure an OAuth2 Application with redirect URL <b>{{redirectUrl}}</b>
        </div>
        <div class="form-entry__actions">
          <a href="https://docs.gitea.io/en-us/oauth2-provider/" target="_blank">More info</a>
        </div>
      </form-entry>
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

export default modalTemplate({
  data: () => ({
    redirectUrl: constants.oauth2RedirectUri,
  }),
  computedLocalSettings: {
    serverUrl: 'giteaServerUrl',
    applicationId: 'giteaApplicationId',
    applicationSecret: 'giteaApplicationSecret',
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
        const parsedUrl = serverUrl.match(/^(https:\/\/[^/]+)/);
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
