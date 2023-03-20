<template>
  <modal-inner aria-label="链接Gitee账号">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gitee"></icon-provider>
      </div>
      <p>将您的<b>Gitee</b>账号链接到<b>StackEdit中文版</b>。</p>
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
});
</script>
