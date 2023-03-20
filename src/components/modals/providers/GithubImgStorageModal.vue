<template>
  <modal-inner aria-label="GitHub 公开仓库图床">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="github"></icon-provider>
      </div>
      <p>创建一个用于存储图片的<b> GitHub </b>公开仓库文件夹图床。</p>
      <form-entry label="公开仓库URL" error="repoUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="repoUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>例如:</b> https://github.com/owner/my-repo
        </div>
      </form-entry>
      <form-entry label="文件夹路径" info="可选的">
        <input slot="field" class="textfield" type="text" placeholder="如：imgs/{YYYY}-{MM}-{DD}" v-model.trim="path" @keydown.enter="resolve()">
        <div class="form-entry__info">
          如果不提供，默认为 imgs/{YYYY}-{MM}-{DD} 。<br/>
          变量说明：{YYYY}为年变量、{MM}为月变量、{DD}为日变量、{MDNAME}为当前文档名称。
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
            store.dispatch('notification/error', '作为图床的仓库URL必须是公开仓库！');
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
