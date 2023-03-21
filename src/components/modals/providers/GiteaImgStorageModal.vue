<template>
  <modal-inner aria-label="Gitea public repository image bed">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gitea"></icon-provider>
      </div>
      <p>Create a <b>Gitea</b> public repository folder image bed for storing images.</p>
      <form-entry label="Public Repository URL" error="projectUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="projectUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> {{config.token.serverUrl}}/{owner}/{repo}
        </div>
      </form-entry>
      <form-entry label="Folder path" info="Optional">
        <input slot="field" class="textfield" type="text" placeholder="Such as: imgs/{YYYY}-{MM}-{DD}" v-model.trim="path" @keydown.enter="resolve()">
        <div class="form-entry__info">
          If not provided, the default is imgs/{YYYY}-{MM}-{DD}.<br/>
          Variable Description: {YYYY} is a year variable, {MM} is a month variable, {DD} is a day variable, and {MDNAME} is the current document name.
        </div>
      </form-entry>
      <form-entry label="Branch" info="Optional">
        <input slot="field" class="textfield" type="text" v-model.trim="branch" @keydown.enter="resolve()">
        <div class="form-entry__info">
          If not supplied, the <code>master</code> branch will be used.
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
import utils from '../../../services/utils';
import modalTemplate from '../common/modalTemplate';
import giteaHelper from '../../../services/providers/helpers/giteaHelper';
import store from '../../../store';

export default modalTemplate({
  data: () => ({
    branch: '',
    path: '',
  }),
  computedLocalSettings: {
    projectUrl: 'giteaImgStorageRepoUrl',
  },
  methods: {
    async resolve() {
      const projectPath = utils.parseGiteaProjectPath(this.projectUrl);
      if (!projectPath) {
        this.setError('projectUrl');
      } else {
        // 判断 仓库URL是否存在 如果存在是否公开仓库 只有公开仓库才允许添加
        try {
          const repoInfo = await giteaHelper.getRepoInfo(this.config.token, projectPath);
          if (repoInfo.private) {
            store.dispatch('notification/error', 'The repository URL used as a image bed must be a public repository!');
            this.setError('projectUrl');
            return;
          }
          const path = this.path && this.path.replace(/^\//, '');
          this.config.resolve({
            repoUri: projectPath,
            path: path || 'imgs/{YYYY}-{MM}-{DD}',
            branch: this.branch || 'master',
          });
        } catch (err) {
          store.dispatch('notification/error', err);
          this.setError('projectUrl');
        }
      }
    },
  },
});
</script>
