const simpleModal = (contentHtml, rejectText, resolveText) => ({
  contentHtml: typeof contentHtml === 'function' ? contentHtml : () => contentHtml,
  rejectText,
  resolveText,
});

/* eslint sort-keys: "error" */
export default {
  autoSyncWorkspace: simpleModal(
    config => `<p>You will enable automatic synchronization of the <b>${config.name}</b> workspace. <br>Unable to customize submission information after enable.<br>Are you sure?</p>`,
    'No',
    'Yes, enable',
  ),
  commentDeletion: simpleModal(
    '<p>You are about to delete a comment. Are you sure?</p>',
    'No',
    'Yes, delete',
  ),
  discussionDeletion: simpleModal(
    '<p>You are about to delete a discussion. Are you sure?</p>',
    'No',
    'Yes, delete',
  ),
  fileRestoration: simpleModal(
    '<p>You are about to revert some changes. Are you sure?</p>',
    'No',
    'Yes, revert',
  ),
  folderDeletion: simpleModal(
    config => `<p>You are about to delete the folder <b>${config.item.name}</b>. Its files will be moved to Trash. Are you sure?</p>`,
    'No',
    'Yes, delete',
  ),
  imgStorageDeletion: simpleModal(
    '<p>You are about to delete the image bed. Are you sure?</p>',
    'No',
    'Yes, delete',
  ),
  pathConflict: simpleModal(
    config => `<p><b>${config.item.name}</b> already exists. Do you want to add a suffix?</p>`,
    'No',
    'Yes, add suffix',
  ),
  paymentSuccess: simpleModal(
    '<h3>Thank you for your payment!</h3><p>Your sponsorship will be active in a minute.</p>',
    'Ok',
  ),
  providerRedirection: simpleModal(
    config => `<p>You are about to navigate to the <b>${config.name}</b> authorization page.</p>`,
    'Cancel',
    'Ok, go on',
  ),
  removeWorkspace: simpleModal(
    '<p>You are about to remove a workspace locally. Are you sure?</p>',
    'No',
    'Yes, remove',
  ),
  reset: simpleModal(
    '<p>This will clean all your workspaces locally. Are you sure?</p>',
    'No',
    'Yes, clean',
  ),
  shareHtml: simpleModal(
    config => `<p>A sharing link has been created for the file "${config.name}" as follows:<br/><a href="${config.url}" target="_blank">${config.url}</a><br/>After closing this window, you can view the sharing link in the publication.</p>`,
    'Close',
  ),
  shareHtmlPre: simpleModal(
    config => `<p>A sharing link will be created for the file "${config.name}" and after creation, the document will be publicly published in Gist. Are you sure?</p>`,
    'No',
    'Yes, Share',
  ),
  signInForComment: simpleModal(
    `<p>You have to sign in with GitHub to start commenting.</p>
    <div class="modal__info"><b>Note:</b> This will sync your main workspace.</div>`,
    'Cancel',
    'Ok, sign in',
  ),
  signInForSponsorship: simpleModal(
    `<p>You have to sign in with GitHub to sponsor.</p>
    <div class="modal__info"><b>Note:</b> This will sync your main workspace.</div>`,
    'Cancel',
    'Ok, sign in',
  ),
  sponsorOnly: simpleModal(
    '<p>This feature is restricted to sponsors as it relies on server resources.</p>',
    'Ok, I understand',
  ),
  stopAutoSyncWorkspace: simpleModal(
    config => `<p>You are about to close the workspace <b>${config.name}</b> auto-sync. <br>After closing, you need to manually trigger synchronization, but you can customize the submission information.<br>Are you sure?</p>`,
    'No',
    'Yes, Close',
  ),
  stripName: simpleModal(
    config => `<p><b>${config.item.name}</b> contains illegal characters. Do you want to strip them?</p>`,
    'No',
    'Yes, strip',
  ),
  tempFileDeletion: simpleModal(
    config => `<p>You are about to permanently delete the temporary file <b>${config.item.name}</b>. Are you sure?</p>`,
    'No',
    'Yes, delete',
  ),
  tempFolderDeletion: simpleModal(
    '<p>You are about to permanently delete all the temporary files. Are you sure?</p>',
    'No',
    'Yes, delete all',
  ),
  trashDeletion: simpleModal(
    '<p>Files in the trash are automatically deleted after 7 days of inactivity.</p>',
    'Ok',
  ),
  unauthorizedName: simpleModal(
    config => `<p><b>${config.item.name}</b> is an unauthorized name.</p>`,
    'Ok',
  ),
  workspaceGoogleRedirection: simpleModal(
    '<p>StackEdit+ needs full Google Drive access to open this workspace.</p>',
    'Cancel',
    'Ok, grant',
  ),
};
