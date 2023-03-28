function init_edit_theme_peacock() {
  const style = document.createElement('style');
  style.id = 'edit-theme-peacock';
  style.type = 'text/css';
  style.innerHTML = "/* Default font color, cursor color, background color*/\n\
.edit-theme--peacock .editor__inner {\n\
  color: #ede0ce;\n\
  caret-color: #ede0ce;\n\
}\n\
.edit-theme--peacock .editor {\n\
  background-color: #2b2a27;\n\
}\n\
/* Header Color */\n\
.edit-theme--peacock .editor__inner .cn-head,\n\
.edit-theme--peacock .editor-in-page-buttons .icon {\n\
  color: #bcd42a;\n\
}\n\
/* Bold Color */\n\
.edit-theme--peacock .editor__inner .cn-strong {\n\
  color: #26A6A6;\n\
}\n\
/* Blockquote Color */\n\
.edit-theme--peacock .editor__inner .blockquote {\n\
  color: #ff5d38;\n\
}\n\
/* Color of non critical information such as source information and md marker symbols */\n\
.edit-theme--peacock .editor__inner .cl,\n\
.edit-theme--peacock .editor__inner .hr,\n\
.edit-theme--peacock .editor__inner .link,\n\
.edit-theme--peacock .editor__inner .linkref, \n\
.edit-theme--peacock .editor__inner .linkdef .url {\n\
  color: rgba(139,158,177,0.8);\n\
}\n\
.edit-theme--peacock .editor__inner .cn-toc, \n\
.edit-theme--peacock .editor__inner .code,\n\
.edit-theme--peacock .editor__inner .img,\n\
.edit-theme--peacock .editor__inner .img-wrapper,\n\
.edit-theme--peacock .editor__inner .imgref,\n\
.edit-theme--peacock .editor__inner .cl-toc {\n\
  color: rgba(139,158,177,0.8);\n\
  background-color: rgba(0,0,0,0.33);\n\
}\n\
/* Code Color */\n\
.edit-theme--peacock .editor__inner .cn-code {\n\
  color: #FF5D38;\n\
}\n\
/* Link Color */\n\
.edit-theme--peacock .editor__inner .img .cl-underlined-text,\n\
.edit-theme--peacock .editor__inner .imgref .cl-underlined-text,\n\
.edit-theme--peacock .editor__inner .link .cl-underlined-text,\n\
.edit-theme--peacock .editor__inner .linkref .cl-underlined-text {\n\
  color: #bcd42a;\n\
}\n\
/* Picture Original Link Background Color */\n\
.edit-theme--peacock .editor__inner .img-wrapper .img {\n\
  background-color: transparent;\n\
}\n\
.edit-theme--peacock .editor__inner .keyword {\n\
  color: #47596b;\n\
}\n\
.edit-theme--peacock .editor__inner .email,\n\
.edit-theme--peacock .editor__inner .cl-title,\n\
.edit-theme--peacock .editor__inner .tag,\n\
.edit-theme--peacock .editor__inner .latex,\n\
.edit-theme--peacock .editor__inner .math,\n\
.edit-theme--peacock .editor__inner .entity,\n\
.edit-theme--peacock .editor__inner .pre [class*='language-'] {\n\
  color: #ede0ce;\n\
}";
  document.head.appendChild(style);
}
init_edit_theme_peacock();