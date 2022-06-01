<template>
  <modal-inner aria-label="发布到Zendesk">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="zendesk"></icon-provider>
      </div>
      <p>向您的<b>Zendesk帮助中心</b>发布<b> {{CurrentFileName}} </b>。</p>
      <form-entry label="Section ID" error="sectionId">
        <input slot="field" class="textfield" type="text" v-model.trim="sectionId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          https://example.zendesk.com/hc/en-us/sections/<b>21857469</b>-Section-name
        </div>
      </form-entry>
      <form-entry label="现有的文章ID" info="可选的">
        <input slot="field" class="textfield" type="text" v-model.trim="articleId" @keydown.enter="resolve()">
      </form-entry>
      <form-entry label="语言环境" info="可选的">
        <input slot="field" class="textfield" type="text" v-model.trim="locale" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>默认:</b> en-us
        </div>
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
        <b>提示:</b> 在<a href="javascript:void(0)" @click="openFileProperties">文件属性</a>中您可以为 <code>title</code>, <code>tags</code> 和
        <code>status</code>提供值。
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">取消</button>
      <button class="button button--resolve" @click="resolve()">确认</button>
    </div>
  </modal-inner>
</template>

<script>
import zendeskProvider from '../../../services/providers/zendeskProvider';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    articleId: '',
  }),
  computedLocalSettings: {
    sectionId: 'zendescPublishSectionId',
    locale: 'zendescPublishLocale',
    selectedTemplate: 'zendeskPublishTemplate',
  },
  methods: {
    resolve() {
      if (!this.sectionId && !this.articleId) {
        this.setError('sectionId');
      } else {
        // Return new location
        const location = zendeskProvider.makeLocation(
          this.config.token,
          this.sectionId,
          this.locale || 'en-us',
          this.articleId,
        );
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
});
</script>
