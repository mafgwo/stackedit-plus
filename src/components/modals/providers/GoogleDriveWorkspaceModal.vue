<template>
  <modal-inner aria-label="添加Google Drive文档空间">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="googleDrive"></icon-provider>
      </div>
      <p>创建一个与<b> Google Drive </b>文件夹同步的文档空间。</p>
      <form-entry label="Folder ID" info="可选的">
        <input slot="field" class="textfield" type="text" v-model.trim="folderId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          如果不提供，将在驱动器根文件夹中创建一个新的Workspace文件夹。
        </div>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="openFolder">选择文件夹</a>
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
import googleHelper from '../../../services/providers/helpers/googleHelper';
import modalTemplate from '../common/modalTemplate';
import utils from '../../../services/utils';
import store from '../../../store';

export default modalTemplate({
  computedLocalSettings: {
    folderId: 'googleDriveWorkspaceFolderId',
  },
  methods: {
    openFolder() {
      return store.dispatch(
        'modal/hideUntil',
        googleHelper.openPicker(this.config.token, 'folder')
          .then((folders) => {
            if (folders[0]) {
              store.dispatch('data/patchLocalSettings', {
                googleDriveWorkspaceFolderId: folders[0].id,
              });
            }
          }),
      );
    },
    resolve() {
      const url = utils.addQueryParams('app', {
        providerId: 'googleDriveWorkspace',
        folderId: this.folderId,
        sub: this.config.token.sub,
      }, true);
      this.config.resolve();
      window.open(url);
    },
  },
});
</script>
