function init_edit_theme_dawn() {
  const style = document.createElement('style');
  style.id = 'edit-theme-dawn';
  style.type = 'text/css';
  style.innerHTML = "/* 默认字体颜色、光标颜色、背景颜色*/\n\
.edit-theme--dawn .editor__inner {\n\
  color: #080808;\n\
  caret-color: #080808;\n\
}\n\
.edit-theme--dawn .editor {\n\
  background-color: #F9F9F9;\n\
}\n\
/* 标题颜色 */\n\
.edit-theme--dawn .editor__inner .cn-head,\n\
.edit-theme--dawn .editor-in-page-buttons .icon {\n\
  color: #19356D;\n\
}\n\
/* 加粗颜色 */\n\
.edit-theme--dawn .editor__inner .cn-strong {\n\
  color: #794938;\n\
}\n\
/* 信息块颜色 */\n\
.edit-theme--dawn .editor__inner .blockquote {\n\
  color: #811F24;\n\
}\n\
/* 源信息、md标记符号等非关键信息的颜色 */\n\
.edit-theme--dawn .editor__inner .cl,\n\
.edit-theme--dawn .editor__inner .hr,\n\
.edit-theme--dawn .editor__inner .link,\n\
.edit-theme--dawn .editor__inner .linkref, \n\
.edit-theme--dawn .editor__inner .linkdef .url {\n\
  color: rgba(102,128,153,0.6);\n\
}\n\
.edit-theme--dawn .editor__inner .cn-toc, \n\
.edit-theme--dawn .editor__inner .code,\n\
.edit-theme--dawn .editor__inner .img,\n\
.edit-theme--dawn .editor__inner .img-wrapper,\n\
.edit-theme--dawn .editor__inner .imgref,\n\
.edit-theme--dawn .editor__inner .cl-toc {\n\
  color: rgba(102,128,153,0.6);\n\
  background-color: rgba(102,128,153,0.075);\n\
}\n\
/* 代码块颜色 */\n\
.edit-theme--dawn .editor__inner .cn-code {\n\
  color: #693A17;\n\
}\n\
/* 链接颜色 */\n\
.edit-theme--dawn .editor__inner .img .cl-underlined-text,\n\
.edit-theme--dawn .editor__inner .imgref .cl-underlined-text,\n\
.edit-theme--dawn .editor__inner .link .cl-underlined-text,\n\
.edit-theme--dawn .editor__inner .linkref .cl-underlined-text {\n\
  color: #0B6125;\n\
}\n\
/* 图片原始链接背景颜色 */\n\
.edit-theme--dawn .editor__inner .img-wrapper .img {\n\
  background-color: transparent;\n\
}\n\
.edit-theme--dawn .editor__inner .keyword {\n\
  color: #47596b;\n\
}\n\
.edit-theme--dawn .editor__inner .email,\n\
.edit-theme--dawn .editor__inner .cl-title,\n\
.edit-theme--dawn .editor__inner .tag,\n\
.edit-theme--dawn .editor__inner .latex,\n\
.edit-theme--dawn .editor__inner .math,\n\
.edit-theme--dawn .editor__inner .entity,\n\
.edit-theme--dawn .editor__inner .pre [class*='language-'] {\n\
  color: #080808;\n\
}";
  document.head.appendChild(style);
}
init_edit_theme_dawn();