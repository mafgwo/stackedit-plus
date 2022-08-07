const simpleModal = (contentHtml, rejectText, resolveText) => ({
  contentHtml: typeof contentHtml === 'function' ? contentHtml : () => contentHtml,
  rejectText,
  resolveText,
});

/* eslint sort-keys: "error" */
export default {
  commentDeletion: simpleModal(
    '<p>您将要删除评论。你确定吗？</p>',
    '取消',
    '确认删除',
  ),
  discussionDeletion: simpleModal(
    '<p>您将要删除讨论。你确定吗？</p>',
    '取消',
    '确认删除',
  ),
  fileRestoration: simpleModal(
    '<p>您将要恢复一些更改。你确定吗？</p>',
    '取消',
    '确认恢复',
  ),
  folderDeletion: simpleModal(
    config => `<p>您将删除文件夹<b>${config.item.name}</b>。它的文件将移至回收站。你确定吗？</p>`,
    '取消',
    '确认删除',
  ),
  imgStorageDeletion: simpleModal(
    '<p>您将要删除图床，你确定吗？</p>',
    '取消',
    '确认删除',
  ),
  pathConflict: simpleModal(
    config => `<p><b>${config.item.name}</b>已经存在。您要添加后缀吗？</p>`,
    '取消',
    '确认添加',
  ),
  paymentSuccess: simpleModal(
    '<h3>感谢您的付款！</h3> <p>您的赞助将在一分钟内活跃。</p>',
    '好的',
  ),
  providerRedirection: simpleModal(
    config => `<p>您将跳转到 <b>${config.name}</b> 授权页面。</p>`,
    '取消',
    '确认跳转',
  ),
  removeWorkspace: simpleModal(
    '<p>您将要在本地删除文档空间ß。你确定吗？</p>',
    '取消',
    '确认删除',
  ),
  reset: simpleModal(
    '<p>这将在本地清理所有文档空间，你确定吗？</p>',
    '取消',
    '确认清理',
  ),
  signInForComment: simpleModal(
    `<p>您必须使用 Google 登录才能开始评论。</p>
    <div class="modal__info"><b>注意:</b> 这将同步您的主文档空间。</div>`,
    '取消',
    '确认登录',
  ),
  signInForSponsorship: simpleModal(
    `<p>您必须使用 Google 登录才能赞助。</p>
    <div class="modal__info"><b>注意:</b> 这将同步您的主文档空间。</div>`,
    '取消',
    '确认登录',
  ),
  sponsorOnly: simpleModal(
    '<p>此功能仅限于赞助商，因为它依赖于服务器资源。</p>',
    '好的，我明白了',
  ),
  stripName: simpleModal(
    config => `<p><b>${config.item.name}</b>包含非法字符。你想剥离它们吗？</p>`,
    '取消',
    '确认剥离',
  ),
  tempFileDeletion: simpleModal(
    config => `<p>您将永久删除临时文件<b>${config.item.name}</b>。你确定吗？</p>`,
    '取消',
    '确认删除',
  ),
  tempFolderDeletion: simpleModal(
    '<p>您将永久删除所有临时文件。你确定吗？</p>',
    '取消',
    '确认删除',
  ),
  trashDeletion: simpleModal(
    '<p>回收站中的文件在不活动7天后会自动删除。</p>',
    '好的',
  ),
  unauthorizedName: simpleModal(
    config => `<p><b>${config.item.name}</b>>是未经授权的名称。</p>`,
    '好的',
  ),
  workspaceGoogleRedirection: simpleModal(
    '<p>StackEdit中文版需要完整的Google Drive访问才能打开此文档空间。</p>',
    '取消',
    '确认授权',
  ),
};
