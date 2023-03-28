function init_edit_theme_iceberg_contrast() {
  const style = document.createElement('style');
  style.id = 'edit-theme-iceberg_contrast';
  style.type = 'text/css';
  style.innerHTML = "/* Default font color, cursor color, background color*/\n\
.edit-theme--iceberg_contrast .editor__inner {\n\
  color: #BDD6DB;\n\
  caret-color: #fff;\n\
}\n\
.edit-theme--iceberg_contrast .editor {\n\
  background-color: #0b0e0e;\n\
}\n\
/* Header Color */\n\
.edit-theme--iceberg_contrast .editor__inner .cn-head,\n\
.edit-theme--iceberg_contrast .editor-in-page-buttons .icon {\n\
  color: #fff;\n\
}\n\
/* Bold Color */\n\
.edit-theme--iceberg_contrast .editor__inner .cn-strong {\n\
  color: #B1E2F2;\n\
}\n\
/* Blockquote Color */\n\
.edit-theme--iceberg_contrast .editor__inner .blockquote {\n\
  color: #ffffff;\n\
}\n\
/* Color of non critical information such as source information and md marker symbols */\n\
.edit-theme--iceberg_contrast .editor__inner .cl,\n\
.edit-theme--iceberg_contrast .editor__inner .hr,\n\
.edit-theme--iceberg_contrast .editor__inner .link,\n\
.edit-theme--iceberg_contrast .editor__inner .linkref, \n\
.edit-theme--iceberg_contrast .editor__inner .linkdef .url {\n\
  color: rgba(139,158,177,0.8);\n\
}\n\
.edit-theme--iceberg_contrast .editor__inner .cn-toc, \n\
.edit-theme--iceberg_contrast .editor__inner .code,\n\
.edit-theme--iceberg_contrast .editor__inner .img,\n\
.edit-theme--iceberg_contrast .editor__inner .img-wrapper,\n\
.edit-theme--iceberg_contrast .editor__inner .imgref,\n\
.edit-theme--iceberg_contrast .editor__inner .cl-toc {\n\
  color: rgba(139,158,177,0.8);\n\
  background-color: rgba(0,0,0,0.33);\n\
}\n\
/* Code Color */\n\
.edit-theme--iceberg_contrast .editor__inner .cn-code {\n\
  color: #fff;\n\
}\n\
/* Link Color */\n\
.edit-theme--iceberg_contrast .editor__inner .img .cl-underlined-text,\n\
.edit-theme--iceberg_contrast .editor__inner .imgref .cl-underlined-text,\n\
.edit-theme--iceberg_contrast .editor__inner .link .cl-underlined-text,\n\
.edit-theme--iceberg_contrast .editor__inner .linkref .cl-underlined-text {\n\
  color: #fff;\n\
}\n\
/* Picture Original Link Background Color */\n\
.edit-theme--iceberg_contrast .editor__inner .img-wrapper .img {\n\
  background-color: transparent;\n\
}\n\
.edit-theme--iceberg_contrast .editor__inner .keyword {\n\
  color: #fff;\n\
}\n\
.edit-theme--iceberg_contrast .editor__inner .email,\n\
.edit-theme--iceberg_contrast .editor__inner .cl-title,\n\
.edit-theme--iceberg_contrast .editor__inner .tag,\n\
.edit-theme--iceberg_contrast .editor__inner .latex,\n\
.edit-theme--iceberg_contrast .editor__inner .math,\n\
.edit-theme--iceberg_contrast .editor__inner .entity,\n\
.edit-theme--iceberg_contrast .editor__inner .pre [class*='language-'] {\n\
  color: #BDD6DB;\n\
}";
  document.head.appendChild(style);
}
init_edit_theme_iceberg_contrast();