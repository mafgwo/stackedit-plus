function init_edit_theme_github() {
  const style = document.createElement('style');
  style.id = 'edit-theme-github';
  style.type = 'text/css';
  style.innerHTML = "/* Default font color, cursor color, background color*/\n\
.edit-theme--github .editor__inner {\n\
  color: #000;\n\
  caret-color: #000;\n\
  background-color: #fff;\n\
}\n\
.edit-theme--github .editor {\n\
  background-color: #fff;\n\
}\n\
/* Header Color */\n\
.edit-theme--github .editor__inner .cn-head,\n\
.edit-theme--github .editor-in-page-buttons .icon {\n\
  color: #AAAAAA;\n\
}\n\
/* Bold Color */\n\
.edit-theme--github .editor__inner .cn-strong {\n\
  color: #000;\n\
}\n\
/* Blockquote Color */\n\
.edit-theme--github .editor__inner .blockquote {\n\
  color: rgba(0,0,0,0.48);\n\
}\n\
/* Color of non critical information such as source information and md marker symbols */\n\
.edit-theme--github .editor__inner .cl,\n\
.edit-theme--github .editor__inner .hr,\n\
.edit-theme--github .editor__inner .link,\n\
.edit-theme--github .editor__inner .linkref, \n\
.edit-theme--github .editor__inner .linkdef .url {\n\
  color: rgba(0,0,0,0.28);\n\
}\n\
.edit-theme--github .editor__inner .cn-toc, \n\
.edit-theme--github .editor__inner .code,\n\
.edit-theme--github .editor__inner .img,\n\
.edit-theme--github .editor__inner .img-wrapper,\n\
.edit-theme--github .editor__inner .imgref,\n\
.edit-theme--github .editor__inner .cl-toc {\n\
  color: rgba(0,0,0,0.28);\n\
  background-color: rgba(102,128,153,0.075);\n\
}\n\
/* Code Color */\n\
.edit-theme--github .editor__inner .cn-code {\n\
  color: #0086B3;\n\
}\n\
/* Link Color */\n\
.edit-theme--github .editor__inner .img .cl-underlined-text,\n\
.edit-theme--github .editor__inner .imgref .cl-underlined-text,\n\
.edit-theme--github .editor__inner .link .cl-underlined-text,\n\
.edit-theme--github .editor__inner .linkref .cl-underlined-text {\n\
  color: #D14;\n\
}\n\
/* Picture Original Link Background Color */\n\
.edit-theme--github .editor__inner .img-wrapper .img {\n\
  background-color: transparent;\n\
}\n\
.edit-theme--github .editor__inner .keyword {\n\
  color: rgba(0,0,0,0.75);\n\
}\n\
.edit-theme--github .editor__inner .email,\n\
.edit-theme--github .editor__inner .cl-title,\n\
.edit-theme--github .editor__inner .tag,\n\
.edit-theme--github .editor__inner .latex,\n\
.edit-theme--github .editor__inner .math,\n\
.edit-theme--github .editor__inner .entity,\n\
.edit-theme--github .editor__inner .pre [class*='language-'] {\n\
  color: #29333d;\n\
}";
  document.head.appendChild(style);
}
init_edit_theme_github();