function init_edit_theme_clouds_midnight() {
  const style = document.createElement('style');
  style.id = 'edit-theme-clouds_midnight';
  style.type = 'text/css';
  style.innerHTML = "/* 默认字体颜色、光标颜色、背景颜色*/\n\
.edit-theme--clouds_midnight .editor__inner {\n\
  color: #929292;\n\
  caret-color: #929292;\n\
}\n\
.edit-theme--clouds_midnight .editor {\n\
  background-color: #191919;\n\
}\n\
/* 标题颜色 */\n\
.edit-theme--clouds_midnight .editor__inner .cn-head,\n\
.edit-theme--clouds_midnight .editor-in-page-buttons .icon {\n\
  color: #46A609;\n\
}\n\
/* 加粗颜色 */\n\
.edit-theme--clouds_midnight .editor__inner .cn-strong {\n\
  color: #927C5D;\n\
}\n\
/* 信息块颜色 */\n\
.edit-theme--clouds_midnight .editor__inner .blockquote {\n\
  color: #5D90CD;\n\
}\n\
/* 源信息、md标记符号等非关键信息的颜色 */\n\
.edit-theme--clouds_midnight .editor__inner .cl,\n\
.edit-theme--clouds_midnight .editor__inner .hr,\n\
.edit-theme--clouds_midnight .editor__inner .link,\n\
.edit-theme--clouds_midnight .editor__inner .linkref, \n\
.edit-theme--clouds_midnight .editor__inner .linkdef .url {\n\
  color: rgba(139,158,177,0.8);\n\
}\n\
.edit-theme--clouds_midnight .editor__inner .cn-toc, \n\
.edit-theme--clouds_midnight .editor__inner .code,\n\
.edit-theme--clouds_midnight .editor__inner .img,\n\
.edit-theme--clouds_midnight .editor__inner .img-wrapper,\n\
.edit-theme--clouds_midnight .editor__inner .imgref,\n\
.edit-theme--clouds_midnight .editor__inner .cl-toc {\n\
  color: rgba(139,158,177,0.8);\n\
  background-color: rgba(0,0,0,0.33);\n\
}\n\
/* 代码块颜色 */\n\
.edit-theme--clouds_midnight .editor__inner .cn-code {\n\
  color: #E92E2E;\n\
}\n\
/* 链接颜色 */\n\
.edit-theme--clouds_midnight .editor__inner .img .cl-underlined-text,\n\
.edit-theme--clouds_midnight .editor__inner .imgref .cl-underlined-text,\n\
.edit-theme--clouds_midnight .editor__inner .link .cl-underlined-text,\n\
.edit-theme--clouds_midnight .editor__inner .linkref .cl-underlined-text {\n\
  color: #5D90CD;\n\
}\n\
/* 图片原始链接背景颜色 */\n\
.edit-theme--clouds_midnight .editor__inner .img-wrapper .img {\n\
  background-color: transparent;\n\
}\n\
.edit-theme--clouds_midnight .editor__inner .keyword {\n\
  color: #47596b;\n\
}\n\
.edit-theme--clouds_midnight .editor__inner .email,\n\
.edit-theme--clouds_midnight .editor__inner .cl-title,\n\
.edit-theme--clouds_midnight .editor__inner .tag,\n\
.edit-theme--clouds_midnight .editor__inner .latex,\n\
.edit-theme--clouds_midnight .editor__inner .math,\n\
.edit-theme--clouds_midnight .editor__inner .entity,\n\
.edit-theme--clouds_midnight .editor__inner .pre [class*='language-'] {\n\
  color: #929292;\n\
}";
  document.head.appendChild(style);
}
init_edit_theme_clouds_midnight();