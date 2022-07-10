<template>
  <modal-inner aria-label="链接自定义图床账号">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="custom"></icon-provider>
      </div>
      <p>将您的<b>自定义图床</b>账号链接到<b>StackEdit</b>。</p>
      <form-entry label="自定义标识" error="name">
        <input slot="field" class="textfield" type="text" v-model.trim="name" @keydown.enter="resolve()">
        <div class="form-entry__info">
          自定义标识如果一样会覆盖之前的自定义图床账号。
        </div>
      </form-entry>
      <form-entry label="上传图片接口地址" error="uploadUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="uploadUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          填入您个人的图床上传接口地址，上传接口仅支持POST提交。
        </div>
      </form-entry>
      <form-entry label="文件参数名" error="fileParamName">
        <input slot="field" class="textfield" type="text" v-model.trim="fileParamName" @keydown.enter="resolve()">
        <div class="form-entry__info">
          文件参数名如：file
        </div>
      </form-entry>
      <form-entry label="自定义请求头配置" error="customHeaders">
        <input slot="field" class="textfield" type="text" v-model.trim="customHeaders" @keydown.enter="resolve()">
        <div class="form-entry__info">
          非必填，自定义请求头是JSON字符串格式，如：{"token": "..."}
        </div>
      </form-entry>
      <form-entry label="自定义FORM参数设置" error="customParams">
        <input slot="field" class="textfield" type="text" v-model.trim="customParams" @keydown.enter="resolve()">
        <div class="form-entry__info">
          非必填，自定义FORM参数是JSON字符串格式，如：{"param1": "..."}
        </div>
      </form-entry>
      <form-entry label="响应图片URL参数" error="resultUrlParam">
        <input slot="field" class="textfield" type="text" v-model.trim="resultUrlParam" @keydown.enter="resolve()">
        <div class="form-entry__info">
          响应JSON中图片URL的路径，如 data.url
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
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  computedLocalSettings: {
    name: 'name',
    uploadUrl: 'uploadUrl',
    fileParamName: 'fileParamName',
    customHeaders: 'customHeaders',
    customParams: 'customParams',
    resultUrlParam: 'resultUrlParam',
  },
  methods: {
    resolve() {
      if (!this.name) {
        this.setError('name');
      }
      if (!this.uploadUrl) {
        this.setError('uploadUrl');
      }
      if (!this.fileParamName) {
        this.setError('fileParamName');
      }
      if (!this.resultUrlParam) {
        this.setError('resultUrlParam');
      }
      let customHeaders = null;
      if (this.customHeaders) {
        try {
          customHeaders = JSON.parse(this.customHeaders);
        } catch (err) {
          this.setError('customHeaders');
          return;
        }
      }
      let customParams = null;
      if (this.customParams) {
        try {
          customParams = JSON.parse(this.customParams);
        } catch (err) {
          this.setError('customParams');
          return;
        }
      }
      if (this.uploadUrl && this.fileParamName) {
        this.config.resolve({
          name: this.name,
          uploadUrl: this.uploadUrl,
          fileParamName: this.fileParamName,
          resultUrlParam: this.resultUrlParam,
          customHeaders,
          customParams,
        });
      }
    },
  },
});
</script>
