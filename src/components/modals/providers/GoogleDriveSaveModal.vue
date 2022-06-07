<template>
  <modal-inner aria-label="与 Google Drive 同步">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="googleDrive"></icon-provider>
      </div>
      <p>Save <b>{{currentFileName}}</b> to your <b>Google Drive</b> account and keep it synced.</p>
      <form-entry label="Folder ID" info="可选的">
        <input slot="field" class="textfield" type="text" v-model.trim="folderId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          If not supplied, the file will be created in your Drive root folder.
        </div>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="openFolder">Choose folder</a>
        </div>
      </form-entry>
      <form-entry label="Existing file ID" info="可选的">
        <input slot="field" class="textfield" type="text" v-model.trim="fileId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          This will overwrite the file on the server.
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
import googleDriveProvider from '../../../services/providers/googleDriveProvider';
import modalTemplate from '../common/modalTemplate';
import store from '../../../store';

export default modalTemplate({
  data: () => ({
    fileId: '',
  }),
  computedLocalSettings: {
    folderId: 'googleDriveFolderId',
  },
  methods: {
    openFolder() {
      return store.dispatch(
        'modal/hideUntil',
        googleHelper.openPicker(this.config.token, 'folder')
          .then((folders) => {
            if (folders[0]) {
              store.dispatch('data/patchLocalSettings', {
                googleDriveFolderId: folders[0].id,
              });
            }
          }),
      );
    },
    resolve() {
      // Return new location
      const location = googleDriveProvider.makeLocation(
        this.config.token,
        this.fileId,
        this.folderId,
      );
      this.config.resolve(location);
    },
  },
});
</script>
