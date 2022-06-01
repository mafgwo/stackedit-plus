const simpleModal = (contentHtml, rejectText, resolveText) => ({
  contentHtml: typeof contentHtml === 'function' ? contentHtml : () => contentHtml,
  rejectText,
  resolveText,
});

/* eslint sort-keys: "error" */
export default {
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
    config => `<p>您将跳转到 <b>${config.name}</b> 授权页面。</p>`,
    '取消',
    '确认跳转',
  ),
  removeWorkspace: simpleModal(
    '<p>You are about to remove a workspace locally. Are you sure?</p>',
    'No',
    'Yes, remove',
  ),
  reset: simpleModal(
    '<p>这将在本地清理所有工作区，你确定吗？</p>',
    '取消',
    '确认清理',
  ),
  signInForComment: simpleModal(
    `<p>您必须使用 Google 登录才能开始评论。</p>
    <div class="modal__info"><b>注意:</b> 这将同步您的主工作区。</div>`,
    '取消',
    '确认登录',
  ),
  signInForSponsorship: simpleModal(
    `<p>您必须使用 Google 登录才能赞助。</p>
    <div class="modal__info"><b>注意:</b> 这将同步您的主工作区。</div>`,
    '取消',
    '确认登录',
  ),
  sponsorOnly: simpleModal(
    '<p>This feature is restricted to sponsors as it relies on server resources.</p>',
    'Ok, I understand',
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
    '<p>StackEdit needs full Google Drive access to open this workspace.</p>',
    'Cancel',
    'Ok, grant',
  ),
};
