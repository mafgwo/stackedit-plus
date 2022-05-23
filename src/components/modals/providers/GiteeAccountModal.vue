<template>
  <modal-inner aria-label="Link Gitee account">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gitee"></icon-provider>
      </div>
      <p>Link your <b>Gitee</b> account to <b>StackEdit</b>.</p>
      <div class="form-entry">
        <div class="form-entry__checkbox">
          <label>
            <input type="checkbox" v-model="repoFullAccess"> Grant access to your private repositories
          </label>
        </div>
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button button--resolve" @click="config.resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  computedLocalSettings: {
    repoFullAccess: 'giteeRepoFullAccess',
  },
});
</script>
