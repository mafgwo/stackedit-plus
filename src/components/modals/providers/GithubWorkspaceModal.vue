<template>
  <modal-inner aria-label="与 GitHub 同步">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="github"></icon-provider>
      </div>
      <p>创建一个与<b>GitHub</b>仓库文件夹同步的工作区。</p>
      <form-entry label="仓库URL" error="repoUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="repoUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>例如:</b> https://github.com/owner/my-repo
        </div>
      </form-entry>
      <form-entry label="文件夹路径" info="可选的">
        <input slot="field" class="textfield" type="text" v-model.trim="path" @keydown.enter="resolve()">
        <div class="form-entry__info">
          如果不提供，将使用根文件夹。
        </div>
      </form-entry>
      <form-entry label="分支" info="可选的">
        <input slot="field" class="textfield" type="text" v-model.trim="branch" @keydown.enter="resolve()">
        <div class="form-entry__info">
          如果未提供，将使用<code> master </code>分支。
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
import utils from '../../../services/utils';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    branch: '',
    path: '',
  }),
  computedLocalSettings: {
    repoUrl: 'githubWorkspaceRepoUrl',
  },
  methods: {
    resolve() {
      const parsedRepo = utils.parseGithubRepoUrl(this.repoUrl);
      if (!parsedRepo) {
        this.setError('repoUrl');
      } else {
        const path = this.path && this.path.replace(/^\//, '');
        const url = utils.addQueryParams('app', {
          ...parsedRepo,
          providerId: 'githubWorkspace',
          branch: this.branch || 'master',
          path: path || undefined,
        }, true);
        this.config.resolve();
        window.open(url);
      }
    },
  },
});
</script>
