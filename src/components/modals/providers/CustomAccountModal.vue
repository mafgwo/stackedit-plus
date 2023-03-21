<template>
  <modal-inner aria-label="link to custom image bed account">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="custom"></icon-provider>
      </div>
      <p>Link your <b>Custom image bed</b> account to <b>StackEdit+</b>.</p>
      <form-entry label="Custom ID" error="name">
        <input slot="field" class="textfield" type="text" v-model.trim="name" @keydown.enter="resolve()">
        <div class="form-entry__info">
          If the custom ID is the same, it will overwrite the previous custom image bed account.
        </div>
      </form-entry>
      <form-entry label="Upload url" error="uploadUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="uploadUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          Fill in your personal image bed upload url address. The upload api only supports POST submission.
        </div>
      </form-entry>
      <form-entry label="File param name" error="fileParamName">
        <input slot="field" class="textfield" type="text" v-model.trim="fileParamName" @keydown.enter="resolve()">
        <div class="form-entry__info">
          File param name such as file
        </div>
      </form-entry>
      <form-entry label="Custom request headers" error="customHeaders">
        <input slot="field" class="textfield" type="text" v-model.trim="customHeaders" @keydown.enter="resolve()">
        <div class="form-entry__info">
          Not required. The custom request headers is in JSON string format, such as {"token": "..."}
        </div>
      </form-entry>
      <form-entry label="Custom request form params" error="customParams">
        <input slot="field" class="textfield" type="text" v-model.trim="customParams" @keydown.enter="resolve()">
        <div class="form-entry__info">
          Not required. The custom request form paramsin JSON string format, such as {"param1": "..."}
        </div>
      </form-entry>
      <form-entry label="Response image url params" error="resultUrlParam">
        <input slot="field" class="textfield" type="text" v-model.trim="resultUrlParam" @keydown.enter="resolve()">
        <div class="form-entry__info">
          The path to respond to the image URL in JSON, such as data.url
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
