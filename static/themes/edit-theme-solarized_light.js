function init_edit_theme_solarized_light() {
  const style = document.createElement('style');
  style.id = 'edit-theme-solarized_light';
  style.type = 'text/css';
  style.innerHTML = "/* 默认字体颜色、光标颜色、背景颜色*/\n\
.edit-theme--solarized_light .editor__inner {\n\
  color: #586E75;\n\
  caret-color: #586E75;\n\
}\n\
.edit-theme--solarized_light .editor {\n\
  background-color: #FDF6E3;\n\
}\n\
/* 标题颜色 */\n\
.edit-theme--solarized_light .editor__inner .cn-head,\n\
.edit-theme--solarized_light .editor-in-page-buttons .icon {\n\
  color: #D33682;\n\
}\n\
/* 加粗颜色 */\n\
.edit-theme--solarized_light .editor__inner .cn-strong {\n\
  color: #859900;\n\
}\n\
/* 信息块颜色 */\n\
.edit-theme--solarized_light .editor__inner .blockquote {\n\
  color: #CB4B16;\n\
}\n\
/* 源信息、md标记符号等非关键信息的颜色 */\n\
.edit-theme--solarized_light .editor__inner .cl,\n\
.edit-theme--solarized_light .editor__inner .hr,\n\
.edit-theme--solarized_light .editor__inner .link,\n\
.edit-theme--solarized_light .editor__inner .linkref, \n\
.edit-theme--solarized_light .editor__inner .linkdef .url {\n\
  color: rgba(102,128,153,0.6);\n\
}\n\
.edit-theme--solarized_light .editor__inner .cn-toc, \n\
.edit-theme--solarized_light .editor__inner .code,\n\
.edit-theme--solarized_light .editor__inner .img,\n\
.edit-theme--solarized_light .editor__inner .img-wrapper,\n\
.edit-theme--solarized_light .editor__inner .imgref,\n\
.edit-theme--solarized_light .editor__inner .cl-toc {\n\
  color: rgba(102,128,153,0.6);\n\
  background-color: rgba(102,128,153,0.075);\n\
}\n\
/* 代码块颜色 */\n\
.edit-theme--solarized_light .editor__inner .cn-code {\n\
  color: #268BD2;\n\
}\n\
/* 链接颜色 */\n\
.edit-theme--solarized_light .editor__inner .img .cl-underlined-text,\n\
.edit-theme--solarized_light .editor__inner .imgref .cl-underlined-text,\n\
.edit-theme--solarized_light .editor__inner .link .cl-underlined-text,\n\
.edit-theme--solarized_light .editor__inner .linkref .cl-underlined-text {\n\
  color: #2AA198;\n\
}\n\
/* 图片原始链接背景颜色 */\n\
.edit-theme--solarized_light .editor__inner .img-wrapper .img {\n\
  background-color: transparent;\n\
}\n\
.edit-theme--solarized_light .editor__inner .keyword {\n\
  color: #47596b;\n\
}\n\
.edit-theme--solarized_light .editor__inner .email,\n\
.edit-theme--solarized_light .editor__inner .cl-title,\n\
.edit-theme--solarized_light .editor__inner .tag,\n\
.edit-theme--solarized_light .editor__inner .latex,\n\
.edit-theme--solarized_light .editor__inner .math,\n\
.edit-theme--solarized_light .editor__inner .entity,\n\
.edit-theme--solarized_light .editor__inner .pre [class*='language-'] {\n\
  color: #586E75;\n\
}";
  document.head.appendChild(style);
}
init_edit_theme_solarized_light();