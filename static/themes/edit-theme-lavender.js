function init_edit_theme_lavender() {
  const style = document.createElement('style');
  style.id = 'edit-theme-lavender';
  style.type = 'text/css';
  style.innerHTML = "/* Default font color, cursor color, background color*/\n\
.edit-theme--lavender .editor__inner {\n\
  color: #E0CEED;\n\
  caret-color: #E0CEED;\n\
}\n\
.edit-theme--lavender .editor {\n\
  background-color: #29222E;\n\
}\n\
/* Header Color */\n\
.edit-theme--lavender .editor__inner .cn-head,\n\
.edit-theme--lavender .editor-in-page-buttons .icon {\n\
  color: #F25AE6;\n\
}\n\
/* Bold Color */\n\
.edit-theme--lavender .editor__inner .cn-strong {\n\
  color: #8E6DA6;\n\
}\n\
/* Blockquote Color */\n\
.edit-theme--lavender .editor__inner .blockquote {\n\
  color: #B657FF;\n\
}\n\
/* Color of non critical information such as source information and md marker symbols */\n\
.edit-theme--lavender .editor__inner .cl,\n\
.edit-theme--lavender .editor__inner .hr,\n\
.edit-theme--lavender .editor__inner .link,\n\
.edit-theme--lavender .editor__inner .linkref, \n\
.edit-theme--lavender .editor__inner .linkdef .url {\n\
  color: rgba(139,158,177,0.8);\n\
}\n\
.edit-theme--lavender .editor__inner .cn-toc, \n\
.edit-theme--lavender .editor__inner .code,\n\
.edit-theme--lavender .editor__inner .img,\n\
.edit-theme--lavender .editor__inner .img-wrapper,\n\
.edit-theme--lavender .editor__inner .imgref,\n\
.edit-theme--lavender .editor__inner .cl-toc {\n\
  color: rgba(139,158,177,0.8);\n\
  background-color: rgba(0,0,0,0.33);\n\
}\n\
/* Code Color */\n\
.edit-theme--lavender .editor__inner .cn-code {\n\
  color: #8E69C9;\n\
}\n\
/* Link Color */\n\
.edit-theme--lavender .editor__inner .img .cl-underlined-text,\n\
.edit-theme--lavender .editor__inner .imgref .cl-underlined-text,\n\
.edit-theme--lavender .editor__inner .link .cl-underlined-text,\n\
.edit-theme--lavender .editor__inner .linkref .cl-underlined-text {\n\
  color: #F5B0EF;\n\
}\n\
/* Picture Original Link Background Color */\n\
.edit-theme--lavender .editor__inner .img-wrapper .img {\n\
  background-color: transparent;\n\
}\n\
.edit-theme--lavender .editor__inner .keyword {\n\
  color: #47596b;\n\
}\n\
.edit-theme--lavender .editor__inner .email,\n\
.edit-theme--lavender .editor__inner .cl-title,\n\
.edit-theme--lavender .editor__inner .tag,\n\
.edit-theme--lavender .editor__inner .latex,\n\
.edit-theme--lavender .editor__inner .math,\n\
.edit-theme--lavender .editor__inner .entity,\n\
.edit-theme--lavender .editor__inner .pre [class*='language-'] {\n\
  color: #E0CEED;\n\
}";
  document.head.appendChild(style);
}
init_edit_theme_lavender();