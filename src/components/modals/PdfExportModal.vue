<template>
  <modal-inner aria-label="导出到PDF">
    <div class="modal__content">
      <p>请为您的<b> pdf导出</b>选择模板。(该导出很消耗服务器资源,文档太大或图片太多可能会导出超时失败,限时开放使用!)</p>
      <form-entry label="模板">
        <select class="textfield" slot="field" v-model="selectedTemplate" @keydown.enter="resolve()">
          <option v-for="(template, id) in allTemplatesById" :key="id" :value="id">
            {{ template.name }}
          </option>
        </select>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="configureTemplates">配置模板</a>
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
import FileSaver from 'file-saver';
import exportSvc from '../../services/exportSvc';
import networkSvc from '../../services/networkSvc';
import modalTemplate from './common/modalTemplate';
import store from '../../store';
import badgeSvc from '../../services/badgeSvc';

export default modalTemplate({
  computedLocalSettings: {
    selectedTemplate: 'pdfExportTemplate',
  },
  methods: {
    async resolve() {
      this.config.resolve();
      const currentFile = store.getters['file/current'];
      store.dispatch('queue/enqueue', async () => {
        const html = await exportSvc.applyTemplate(
          currentFile.id,
          this.allTemplatesById[this.selectedTemplate],
          true,
        );

        try {
          const { body } = await networkSvc.request({
            method: 'POST',
            url: 'pdfExport',
            params: {
              options: JSON.stringify(store.getters['data/computedSettings'].wkhtmltopdf),
            },
            body: html,
            blob: true,
            timeout: 60000,
          });
          FileSaver.saveAs(body, `${currentFile.name}.pdf`);
          badgeSvc.addBadge('exportPdf');
        } catch (err) {
          console.error(err); // eslint-disable-line no-console
          store.dispatch('notification/error', err);
        }
      });
    },
  },
});
</script>
