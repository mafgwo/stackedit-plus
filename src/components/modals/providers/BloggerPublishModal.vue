<template>
  <modal-inner aria-label="发布到Blogger">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="blogger"></icon-provider>
      </div>
      <p>向您的<b> Blogger </b>网站发布<b> {{CurrentFileName}} </b>。</p>
      <form-entry label="Blog URL" error="blogUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="blogUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>例如:</b> http://example.blogger.com/
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
        <b>提示:</b> 在<a href="javascript:void(0)" @click="openFileProperties">文件中</a>中您可以为 <code>title</code>, <code>tags</code>,
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
import bloggerProvider from '../../../services/providers/bloggerProvider';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    postId: '',
  }),
  computedLocalSettings: {
    blogUrl: 'bloggerBlogUrl',
    selectedTemplate: 'bloggerPublishTemplate',
  },
  methods: {
    resolve() {
      if (!this.blogUrl) {
        this.setError('blogUrl');
      } else {
        // Return new location
        const location = bloggerProvider.makeLocation(
          this.config.token,
          this.blogUrl,
          this.postId,
        );
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
});
</script>
