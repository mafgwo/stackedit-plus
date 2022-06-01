<template>
  <modal-inner aria-label="发布到WordPress">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="wordpress"></icon-provider>
      </div>
      <p>Publish <b>{{currentFileName}}</b> to your <b>WordPress</b> site.</p>
      <form-entry label="站点域名" error="domain">
        <input slot="field" class="textfield" type="text" v-model.trim="domain" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>例如:</b> example.wordpress.com<br>
          <b>Note:</b> Jetpack is required for self-hosted sites.
        </div>
      </form-entry>
      <form-entry label="现有的帖子ID" info="可选的">
        <input slot="field" class="textfield" type="text" v-model.trim="postId" @keydown.enter="resolve()">
      </form-entry>
      <form-entry label="模板">
        <select slot="field" class="textfield" v-model="selectedTemplate" @keydown.enter="resolve()">
          <option v-for="(template, id) in allTemplatesById" :key="id" :value="id">
            {{ template.name }}
          </option>
        </select>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="configureTemplates">配置模板</a>
        </div>
      </form-entry>
      <div class="modal__info">
        <b>提示:</b> 在<a href="javascript:void(0)" @click="openFileProperties">文件属性</a>中您可以为 <code>title</code>, <code>tags</code>,
        <code>categories</code>, <code>excerpt</code>, <code>author</code>, <code>featuredImage</code>,
        <code>status</code> 和 <code>date</code>提供值。
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">取消</button>
      <button class="button button--resolve" @click="resolve()">确认</button>
    </div>
  </modal-inner>
</template>

<script>
import wordpressProvider from '../../../services/providers/wordpressProvider';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    postId: '',
  }),
  computedLocalSettings: {
    domain: 'wordpressDomain',
    selectedTemplate: 'wordpressPublishTemplate',
  },
  methods: {
    resolve() {
      if (!this.domain) {
        this.setError('domain');
      } else {
        // Return new location
        const location = wordpressProvider.makeLocation(
          this.config.token,
          this.domain,
          this.postId,
        );
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
});
</script>
