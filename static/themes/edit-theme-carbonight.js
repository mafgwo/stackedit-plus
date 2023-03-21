function init_edit_theme_carbonight() {
  const style = document.createElement('style');
  style.id = 'edit-theme-carbonight';
  style.type = 'text/css';
  style.innerHTML = "/* Default font color, cursor color, background color*/\n\
.edit-theme--carbonight .editor__inner {\n\
  color: #B0B0B0;\n\
  caret-color: #B0B0B0;\n\
}\n\
.edit-theme--carbonight .editor {\n\
  background-color: #2E2C2B;\n\
}\n\
/* Header Color */\n\
.edit-theme--carbonight .editor__inner .cn-head,\n\
.edit-theme--carbonight .editor-in-page-buttons .icon {\n\
  color: #B0B0B0;\n\
}\n\
/* Bold Color */\n\
.edit-theme--carbonight .editor__inner .cn-strong {\n\
  color: #eeeeee;\n\
}\n\
/* Blockquote Color */\n\
.edit-theme--carbonight .editor__inner .blockquote {\n\
  color: #8C8C8C;\n\
}\n\
/* Color of non critical information such as source information and md marker symbols */\n\
.edit-theme--carbonight .editor__inner .cl,\n\
.edit-theme--carbonight .editor__inner .hr,\n\
.edit-theme--carbonight .editor__inner .link,\n\
.edit-theme--carbonight .editor__inner .linkref, \n\
.edit-theme--carbonight .editor__inner .linkdef .url {\n\
  color: rgba(139,158,177,0.8);\n\
}\n\
.edit-theme--carbonight .editor__inner .cn-toc, \n\
.edit-theme--carbonight .editor__inner .code,\n\
.edit-theme--carbonight .editor__inner .img,\n\
.edit-theme--carbonight .editor__inner .img-wrapper,\n\
.edit-theme--carbonight .editor__inner .imgref,\n\
.edit-theme--carbonight .editor__inner .cl-toc {\n\
  color: rgba(139,158,177,0.8);\n\
  background-color: rgba(0,0,0,0.33);\n\
}\n\
/* Code Color */\n\
.edit-theme--carbonight .editor__inner .cn-code {\n\
  color: #fff;\n\
}\n\
/* Link Color */\n\
.edit-theme--carbonight .editor__inner .img .cl-underlined-text,\n\
.edit-theme--carbonight .editor__inner .imgref .cl-underlined-text,\n\
.edit-theme--carbonight .editor__inner .link .cl-underlined-text,\n\
.edit-theme--carbonight .editor__inner .linkref .cl-underlined-text {\n\
  color: #fff;\n\
}\n\
/* Picture Original Link Background Color */\n\
.edit-theme--carbonight .editor__inner .img-wrapper .img {\n\
  background-color: transparent;\n\
}\n\
.edit-theme--carbonight .editor__inner .keyword {\n\
  color: #47596b;\n\
}\n\
.edit-theme--carbonight .editor__inner .email,\n\
.edit-theme--carbonight .editor__inner .cl-title,\n\
.edit-theme--carbonight .editor__inner .tag,\n\
.edit-theme--carbonight .editor__inner .latex,\n\
.edit-theme--carbonight .editor__inner .math,\n\
.edit-theme--carbonight .editor__inner .entity,\n\
.edit-theme--carbonight .editor__inner .pre [class*='language-'] {\n\
  color: #B0B0B0;\n\
}";
  document.head.appendChild(style);
}
init_edit_theme_carbonight();