function init_edit_theme_slate() {
  const style = document.createElement('style');
  style.id = 'edit-theme-slate';
  style.type = 'text/css';
  style.innerHTML = "/* Default font color, cursor color, background color*/\n\
.edit-theme--slate .editor__inner {\n\
  color: #ebebf4;\n\
  caret-color: #ebebf4;\n\
}\n\
.edit-theme--slate .editor {\n\
  background-color: #19191f;\n\
}\n\
/* Header Color */\n\
.edit-theme--slate .editor__inner .cn-head,\n\
.edit-theme--slate .editor-in-page-buttons .icon {\n\
  color: #9eb2d9;\n\
}\n\
/* Bold Color */\n\
.edit-theme--slate .editor__inner .cn-strong {\n\
  color: #566981;\n\
}\n\
/* Blockquote Color */\n\
.edit-theme--slate .editor__inner .blockquote {\n\
  color: #89A7B1;\n\
}\n\
/* Color of non critical information such as source information and md marker symbols */\n\
.edit-theme--slate .editor__inner .cl,\n\
.edit-theme--slate .editor__inner .hr,\n\
.edit-theme--slate .editor__inner .link,\n\
.edit-theme--slate .editor__inner .linkref, \n\
.edit-theme--slate .editor__inner .linkdef .url {\n\
  color: rgba(139,158,177,0.8);\n\
}\n\
.edit-theme--slate .editor__inner .cn-toc, \n\
.edit-theme--slate .editor__inner .code,\n\
.edit-theme--slate .editor__inner .img,\n\
.edit-theme--slate .editor__inner .img-wrapper,\n\
.edit-theme--slate .editor__inner .imgref,\n\
.edit-theme--slate .editor__inner .cl-toc {\n\
  color: rgba(139,158,177,0.8);\n\
  background-color: rgba(0,0,0,0.33);\n\
}\n\
/* Code Color */\n\
.edit-theme--slate .editor__inner .cn-code {\n\
  color: #89A7B1;\n\
}\n\
/* Link Color */\n\
.edit-theme--slate .editor__inner .img .cl-underlined-text,\n\
.edit-theme--slate .editor__inner .imgref .cl-underlined-text,\n\
.edit-theme--slate .editor__inner .link .cl-underlined-text,\n\
.edit-theme--slate .editor__inner .linkref .cl-underlined-text {\n\
  color: #9eb2d9;\n\
}\n\
/* Picture Original Link Background Color */\n\
.edit-theme--slate .editor__inner .img-wrapper .img {\n\
  background-color: transparent;\n\
}\n\
.edit-theme--slate .editor__inner .keyword {\n\
  color: #47596b;\n\
}\n\
.edit-theme--slate .editor__inner .email,\n\
.edit-theme--slate .editor__inner .cl-title,\n\
.edit-theme--slate .editor__inner .tag,\n\
.edit-theme--slate .editor__inner .latex,\n\
.edit-theme--slate .editor__inner .math,\n\
.edit-theme--slate .editor__inner .entity,\n\
.edit-theme--slate .editor__inner .pre [class*='language-'] {\n\
  color: #ebebf4;\n\
}";
  document.head.appendChild(style);
}
init_edit_theme_slate();