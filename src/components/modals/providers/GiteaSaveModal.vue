<template>
  <modal-inner aria-label="Synchronize with Gitea">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gitea"></icon-provider>
      </div>
      <p>Save <b>{{currentFileName}}</b> to your <b>Gitea</b> repository and keep it synced.</p>
      <form-entry label="Repository URL" error="projectUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="projectUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> {{config.token.serverUrl}}/path/to/project
        </div>
      </form-entry>
      <form-entry label="File path" error="path">
        <input slot="field" class="textfield" type="text" v-model.trim="path" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> path/to/README.md<br>
          If the file exists, it will be overwritten.
        </div>
      </form-entry>
      <form-entry label="Branch" info="optional">
        <input slot="field" class="textfield" type="text" v-model.trim="branch" @keydown.enter="resolve()">
        <div class="form-entry__info">
          If not supplied, the <code>master</code> branch will be used.
        </div>
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancal</button>
      <button class="button button--resolve" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import giteaProvider from '../../../services/providers/giteaProvider';
import modalTemplate from '../common/modalTemplate';
import utils from '../../../services/utils';

export default modalTemplate({
  data: () => ({
    branch: '',
    path: '',
  }),
  computedLocalSettings: {
    projectUrl: 'giteaProjectUrl',
  },
  created() {
    this.path = `${this.currentFileName}.md`;
  },
  methods: {
    resolve() {
      const projectPath = utils.parseGiteaProjectPath(this.projectUrl);
      if (!projectPath) {
        this.setError('projectUrl');
      }
      if (!this.path) {
        this.setError('path');
      }
      if (projectPath && this.path) {
        const location = giteaProvider.makeLocation(
          this.config.token,
          projectPath,
          this.branch || 'master',
          this.path,
        );
        this.config.resolve(location);
      }
    },
  },
});
</script>
