<template>
  <modal-inner aria-label="链接Google Drive账号">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="googleDrive"></icon-provider>
      </div>
      <p>将您的<b>Google Drive</b>链接到<b>StackEdit中文版</b>。</p>
      <div class="form-entry">
        <div class="form-entry__checkbox">
          <label>
            <input type="checkbox" v-model="restrictedAccess"> 限制访问
          </label>
          <div class="form-entry__info">
            如果限制，则将访问仅限于您使用<b>StackEdit中文版</b>创建的文件。
          </div>
        </div>
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">取消</button>
      <button class="button button--resolve" @click="config.resolve()">确认</button>
    </div>
  </modal-inner>
</template>

<script>
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  computedLocalSettings: {
    restrictedAccess: 'googleDriveRestrictedAccess',
  },
});
</script>
