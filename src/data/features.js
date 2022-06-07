class Feature {
  constructor(id, badgeName, description, children = null) {
    this.id = id;
    this.badgeName = badgeName;
    this.description = description;
    this.children = children;
  }

  toBadge(badgeCreations) {
    const children = this.children
      ? this.children.map(child => child.toBadge(badgeCreations))
      : null;
    return {
      featureId: this.id,
      name: this.badgeName,
      description: this.description,
      children,
      isEarned: children
        ? children.every(child => child.isEarned)
        : !!badgeCreations[this.id],
      hasSomeEarned: children && children.some(child => child.isEarned),
    };
  }
}

export default [
  new Feature(
    'navigationBar',
    '丰富的导航栏',
    '通过格式化一些Markdown和重命名当前文件掌握导航栏',
    [
      new Feature(
        'formatButtons',
        '格式化',
        '使用格式化按钮更改 Markdown 文件中的格式。',
      ),
      new Feature(
        'editCurrentFileName',
        '重命名',
        '使用导航栏中的名称字段重命名当前文件。',
      ),
      new Feature(
        'toggleExplorer',
        '资源管理器切换',
        '使用导航栏切换资源管理器。',
      ),
      new Feature(
        'toggleSideBar',
        '切换侧边栏',
        '使用导航栏来切换侧边栏。',
      ),
    ],
  ),
  new Feature(
    'explorer',
    '资源管理器',
    '使用文件资源管理器管理文档空间中的文件和文件夹。',
    [
      new Feature(
        'createFile',
        '文件创建',
        '使用文件资源管理器在文档空间中创建一个新文件。',
      ),
      new Feature(
        'switchFile',
        '文件切换',
        '使用文件资源管理器在文档空间中从一个文件切换到另一个文件。',
      ),
      new Feature(
        'createFolder',
        '文件夹创建',
        '使用文件资源管理器在文档空间中创建一个新文件夹。',
      ),
      new Feature(
        'moveFile',
        '文件移动',
        '在文件管理器中拖动一个文件到另一个文件夹。',
      ),
      new Feature(
        'moveFolder',
        '文件夹移动',
        '在文件管理器中拖动一个文件夹到另一个文件夹。',
      ),
      new Feature(
        'renameFile',
        '文件重命名',
        '使用文件资源管理器重命名文档空间中的文件。',
      ),
      new Feature(
        'renameFolder',
        '文件夹重命名',
        '使用文件资源管理器重命名文档空间中的文件夹。',
      ),
      new Feature(
        'removeFile',
        '文件删除',
        '使用文件资源管理器删除文档空间中的文件。',
      ),
      new Feature(
        'removeFolder',
        '文件夹删除',
        '使用文件资源管理器删除文档空间中的文件夹。',
      ),
    ],
  ),
  new Feature(
    'buttonBar',
    '按钮栏',
    '使用按钮栏自定义编辑器布局并切换功能。',
    [
      new Feature(
        'toggleNavigationBar',
        '导航栏切换',
        '使用按钮栏切换导航栏。',
      ),
      new Feature(
        'toggleSidePreview',
        '切换侧边预览',
        '使用按钮栏切换侧边预览。',
      ),
      new Feature(
        'toggleEditor',
        '切换编辑器',
        '使用按钮栏切换编辑器。',
      ),
      new Feature(
        'toggleFocusMode',
        '切换焦点模式',
        '使用按钮栏切换焦点模式。此模式在键入时将其垂直居中。',
      ),
      new Feature(
        'toggleScrollSync',
        '换滚动同步',
        '使用按钮栏切换滚动同步功能。此功能链接编辑器和预览滚动条。',
      ),
      new Feature(
        'toggleStatusBar',
        '状态栏切换器',
        '使用按钮栏切换状态栏。',
      ),
    ],
  ),
  new Feature(
    'signIn',
    '登录',
    '使用 Gitee 登录，同步您的主文档空间并解锁功能。',
    [
      new Feature(
        'syncMainWorkspace',
        '主文档空间已同步',
        '使用 Gitee 登录以将您的主文档空间与您的默认空间stackedit-app-data仓库数据同步。',
      ),
      new Feature(
        'sponsor',
        '赞助',
        '使用 Google 登录并赞助 StackEdit 以解锁 PDF 和 Pandoc 导出。（暂不支持赞助）',
      ),
    ],
  ),
  new Feature(
    'workspaces',
    '文档空间菜单',
    '使用文档空间菜单创建各种文档空间并对其进行管理。',
    [
      new Feature(
        'addCouchdbWorkspace',
        '创建CouchDB文档空间',
        '使用文档空间菜单创建CouchDB文档空间。',
      ),
      new Feature(
        'addGithubWorkspace',
        '创建GitHub文档空间',
        '使用文档空间菜单创建GitHub文档空间。',
      ),
      new Feature(
        'addGiteeWorkspace',
        '创建Gitee文档空间',
        '使用文档空间菜单创建Gitee文档空间。',
      ),
      new Feature(
        'addGitlabWorkspace',
        '创建Gitlab文档空间',
        '使用文档空间菜单创建GitLab文档空间。',
      ),
      new Feature(
        'addGiteaWorkspace',
        '创建Gitea文档空间',
        '使用文档空间菜单创建Gitea文档空间。',
      ),
      new Feature(
        'addGoogleDriveWorkspace',
        '创建Google Drive文档空间',
        '使用文档空间菜单创建Google Drive文档空间。',
      ),
      new Feature(
        'renameWorkspace',
        '文档空间重命名',
        '使用“管理文档空间”对话框重命名文档空间。',
      ),
      new Feature(
        'removeWorkspace',
        '文档空间删除',
        '使用“管理文档空间”对话框在本地删除文档空间。',
      ),
    ],
  ),
  new Feature(
    'manageAccounts',
    '账号管理',
    '链接各种外部账号，并使用“账号”对话框来管理它们。',
    [
      new Feature(
        'addBloggerAccount',
        'Blogger账号',
        '将您的Blogger账号链接到Stackedit。',
      ),
      new Feature(
        'addDropboxAccount',
        'Dropbox账号',
        '将您的Dropbox账号链接到Stackedit。',
      ),
      new Feature(
        'addGitHubAccount',
        'GitHub账号',
        '将您的Github账号链接到Stackedit。',
      ),
      new Feature(
        'addGiteeAccount',
        'Gitee账号',
        '将您的Gitee账号链接到Stackedit。',
      ),
      new Feature(
        'addGitLabAccount',
        'GitLab账号',
        '将您的Gitlab账号链接到Stackedit。',
      ),
      new Feature(
        'addGiteaAccount',
        'Gitea账号',
        '将您的Gitea账号链接到Stackedit。',
      ),
      new Feature(
        'addGoogleDriveAccount',
        'Google Drive账号',
        '将您的Google Drive账号链接到Stackedit。',
      ),
      new Feature(
        'addGooglePhotosAccount',
        'Google Photos账号',
        '将您的Google Photos账号链接到Stackedit。',
      ),
      new Feature(
        'addWordpressAccount',
        'WordPress账号',
        '将您的WordPress账号链接到Stackedit。',
      ),
      new Feature(
        'addZendeskAccount',
        'Zendesk账号',
        '将您的Zendesk账号链接到Stackedit。',
      ),
      new Feature(
        'removeAccount',
        '移除账号',
        '使用“账号”对话框删除对外部账号的访问。',
      ),
    ],
  ),
  new Feature(
    'syncFiles',
    '文件同步器',
    '通过打开和保存各种外部账号的文件来掌握“同步”菜单。',
    [
      new Feature(
        'openFromDropbox',
        'Dropbox阅读器',
        '使用“同步”菜单从您的Dropbox账号打开文件。',
      ),
      new Feature(
        'saveOnDropbox',
        'Dropbox保存',
        '使用“同步”菜单将文件保存在您的Dropbox账号中。',
      ),
      new Feature(
        'openFromGithub',
        'Github阅读器',
        '使用“同步”菜单从GitHub仓库打开文件。',
      ),
      new Feature(
        'saveOnGithub',
        'GitHub保存',
        '使用“同步”菜单将文件保存在GitHub仓库中。',
      ),
      new Feature(
        'openFromGitee',
        'Gitee阅读器',
        '使用“同步”菜单从Gitee仓库打开文件。',
      ),
      new Feature(
        'saveOnGitee',
        'Gitee保存',
        '使用“同步”菜单将文件保存在Gitee仓库中。',
      ),
      new Feature(
        'saveOnGist',
        'Gist保存',
        '使用“同步”菜单将文件保存在GIST中。',
      ),
      new Feature(
        'openFromGitlab',
        'GitLab阅读器',
        '使用“同步”菜单从GitLab仓库打开文件。',
      ),
      new Feature(
        'saveOnGitlab',
        'GitLab保存',
        '使用“同步”菜单将文件保存在GitLab仓库中。',
      ),
      new Feature(
        'openFromGitea',
        'Gitea阅读器',
        '使用“同步”菜单从Gitea仓库打开文件。',
      ),
      new Feature(
        'saveOnGitea',
        'Gitea保存',
        '使用“同步”菜单将文件保存在Gitea仓库中。',
      ),
      new Feature(
        'openFromGoogleDrive',
        'Google Drive阅读器',
        '使用“同步”菜单从您的Google Drive账号打开文件。',
      ),
      new Feature(
        'saveOnGoogleDrive',
        'Google Drive保存',
        '使用“同步”菜单将文件保存在您的Google Drive账号中。',
      ),
      new Feature(
        'triggerSync',
        '同步触发器',
        '使用“同步”菜单或导航栏手动触发同步。',
      ),
      new Feature(
        'syncMultipleLocations',
        '多方同步',
        '使用“同步”菜单将文件与多个外部位置同步。',
      ),
      new Feature(
        'removeSyncLocation',
        '删除同步',
        '使用“文件同步”对话框删除同步位置。',
      ),
    ],
  ),
  new Feature(
    'publishFiles',
    '文件发布',
    '通过将文件发布到各种外部账号中来掌握“发布”菜单。',
    [
      new Feature(
        'publishToBlogger',
        'Blogger发布',
        '使用“发布”菜单发布博客文章。',
      ),
      new Feature(
        'publishToBloggerPage',
        'Blogger页面发布',
        '使用“发布”菜单发布Blogger页面。',
      ),
      new Feature(
        'publishToDropbox',
        'Dropbox发布',
        '使用“发布”菜单将文件发布到您的Dropbox账号。',
      ),
      new Feature(
        'publishToGithub',
        'GitHub发布',
        '使用“发布”菜单将文件发布到GitHub仓库。',
      ),
      new Feature(
        'publishToGist',
        'Gist发布',
        '使用“发布”菜单将文件发布到GIST。',
      ),
      new Feature(
        'publishToGitee',
        'Gitee发布',
        '使用“发布”菜单将文件发布到Gitee仓库。',
      ),
      new Feature(
        'publishToGitlab',
        'GitLab发布',
        '使用“发布”菜单将文件发布到GitLab仓库中。',
      ),
      new Feature(
        'publishToGitea',
        'Gitea发布',
        '使用“发布”菜单将文件发布到Gitea仓库。',
      ),
      new Feature(
        'publishToGoogleDrive',
        'Google Drive发布',
        '使用“发布”菜单将文件发布到您的Google Drive账号。',
      ),
      new Feature(
        'publishToWordPress',
        'WordPress发布',
        '使用“发布”菜单发布WordPress文章。',
      ),
      new Feature(
        'publishToZendesk',
        'Zendesk发布',
        '使用“发布”菜单发布Zendesk帮助中心文章。',
      ),
      new Feature(
        'triggerPublish',
        '更新发布',
        '使用“发布”菜单或导航栏手动更新发布。',
      ),
      new Feature(
        'publishMultipleLocations',
        '多方发布',
        '使用“发布”菜单将文件发布到多个外部位置。',
      ),
      new Feature(
        'removePublishLocation',
        '删除发布',
        '使用“文件发布”对话框删除发布位置。',
      ),
    ],
  ),
  new Feature(
    'manageHistory',
    '文件历史记录',
    '使用“文件历史记录”菜单查看版本历史记录并恢复当前文件的旧版本。',
    [
      new Feature(
        'restoreVersion',
        '恢复',
        '使用“文件历史记录”菜单来还原当前文件的旧版本。',
      ),
      new Feature(
        'chooseHistory',
        '历史版本选择',
        '选择与多个外部位置同步的文件的不同历史记录。',
      ),
    ],
  ),
  new Feature(
    'manageProperties',
    '文件属性',
    '使用“文件属性”对话框更改当前文件的属性。',
    [
      new Feature(
        'setMetadata',
        '元数据设置',
        '使用“文件属性”对话框为当前文件设置元数据。',
      ),
      new Feature(
        'changePreset',
        '预设更改',
        '使用“文件属性”对话框更改Markdown引擎预设。',
      ),
      new Feature(
        'changeExtension',
        '扩展配置',
        '使用“文件属性”对话框启用，禁用或配置Markdown引擎扩展。',
      ),
    ],
  ),
  new Feature(
    'comment',
    '评论',
    '启动并删除讨论，添加和删除评论。',
    [
      new Feature(
        'createDiscussion',
        '启动讨论',
        '使用“评论”按钮开始新的讨论。',
      ),
      new Feature(
        'addComment',
        '添加评论',
        '使用讨论在现有讨论中添加评论。',
      ),
      new Feature(
        'removeComment',
        '删除评论',
        '使用讨论在讨论中删除评论。',
      ),
      new Feature(
        'removeDiscussion',
        '关闭讨论',
        '使用讨论去删除讨论。',
      ),
    ],
  ),
  new Feature(
    'importExport',
    '导入/导出',
    '使用“导入/导出”菜单以导入和导出文件。',
    [
      new Feature(
        'importMarkdown',
        'Markdown导入',
        '使用“导入/导出”菜单从磁盘导入Markdown文件。',
      ),
      new Feature(
        'exportMarkdown',
        'Markdown导出',
        '使用“导入/导出”菜单将Markdown文件导出到磁盘。',
      ),
      new Feature(
        'importHtml',
        'HTML导入',
        '使用“导入/导出”菜单从磁盘导入HTML文件，然后将其转换为Markdown。',
      ),
      new Feature(
        'exportHtml',
        'HTML导出',
        '使用“导入/导出”菜单和Handlebars模板将文件导出到磁盘作为HTML文件。',
      ),
      new Feature(
        'exportPdf',
        'PDF导出',
        '使用“导入/导出”菜单将文件导出到磁盘作为PDF文件。',
      ),
      new Feature(
        'exportPandoc',
        'Pandoc导出',
        '使用“导入/导出”菜单将文件导出到使用Pandoc的磁盘。',
      ),
    ],
  ),
  new Feature(
    'manageSettings',
    '管理设置',
    '使用“设置”对话框调整应用程序行为并更改键盘快捷键。',
    [
      new Feature(
        'changeSettings',
        '更新设置',
        '使用“设置”对话框调整应用程序行为。',
      ),
      new Feature(
        'changeShortcuts',
        '编辑快捷键',
        '使用“设置”对话框更改键盘快捷键。',
      ),
    ],
  ),
  new Feature(
    'manageTemplates',
    '管理模板',
    '使用“模板”对话框创建，删除或修改Handlebars模板。',
    [
      new Feature(
        'addTemplate',
        '模板创建',
        '使用“模板”对话框创建一个Handlebars模板。',
      ),
      new Feature(
        'removeTemplate',
        '模板删除',
        '使用“模板”对话框删除Handlebars模板。',
      ),
    ],
  ),
];
