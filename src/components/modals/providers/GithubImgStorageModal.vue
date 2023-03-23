<template>
  <modal-inner aria-label="GitHub public repository image bed">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="github"></icon-provider>
      </div>
      <p>Create a <b>GitHub</b> public repository folder image bed for storing images.</p>
      <form-entry label="Public Repository URL" error="repoUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="repoUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> https://github.com/owner/my-repo
        </div>
      </form-entry>
      <form-entry label="Folder path" info="optional">
        <input slot="field" class="textfield" type="text" placeholder="Default: imgs/{YYYY}-{MM}-{DD}" v-model.trim="path" @keydown.enter="resolve()">
        <div class="form-entry__info">
          If not provided, the default value is <b>imgs/{YYYY}-{MM}-{DD}</b>.<br/>
          Variable Description: {YYYY} is a year variable, {MM} is a month variable, {DD} is a day variable, and {MDNAME} is the current document name.
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
import utils from '../../../services/utils';
import modalTemplate from '../common/modalTemplate';
import githubHelper from '../../../services/providers/helpers/githubHelper';
import store from '../../../store';

export default modalTemplate({
  data: () => ({
    branch: '',
    path: '',
  }),
  computedLocalSettings: {
    repoUrl: 'githubImgStorageRepoUrl',
  },
  methods: {
    async resolve() {
      const { owner, repo } = utils.parseGithubRepoUrl(this.repoUrl);
      if (!owner && !repo) {
        this.setError('repoUrl');
      } else {
        // 判断 仓库URL是否存在 如果存在是否公开仓库 只有公开仓库才允许添加
        try {
          const repoInfo = await githubHelper.getRepoInfo(this.config.token, owner, repo);
          if (repoInfo.private) {
            store.dispatch('notification/error', 'The repository URL used as a image bed must be a public repository!');
            this.setError('repoUrl');
            return;
          }
          const path = this.path && this.path.replace(/^\//, '');
          this.config.resolve({
            owner,
            repo,
            path: path || 'imgs/{YYYY}-{MM}-{DD}',
            branch: this.branch || 'master',
          });
        } catch (err) {
          store.dispatch('notification/error', err);
          this.setError('repoUrl');
        }
      }
    },
  },
});
</script>
