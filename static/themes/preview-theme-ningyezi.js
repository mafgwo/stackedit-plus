function init_preview_theme_ningyezi() {
const style = document.createElement('style');
style.id = 'preview-theme-ningyezi';
style.type = 'text/css';
style.innerHTML = "/*凝夜紫 ningyezi\n \
*/\n \
.preview-theme--ningyezi {\n \
  line-height: 1.5;\n \
  font-family: Optima-Regular, Optima, PingFangTC-Light, PingFangSC-light, PingFangTC-light;\n \
  letter-spacing: 2px;\n \
  color: #2b2b2b;\n \
  background-color: #fff;\n \
  background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%);\n \
  background-size: 20px 20px;\n \
  background-position: center center;\n \
}\n \
\n \
/* 段落，下方未标注标签参数均同此处\n \
  */\n \
.preview-theme--ningyezi p {\n \
  margin: 10px 0px;\n \
  letter-spacing: 2px;\n \
  font-size: 14px;\n \
  word-spacing: 2px;\n \
}\n \
\n \
/* 一级标题 */\n \
.preview-theme--ningyezi h1 {\n \
  font-size: 25px;\n \
}\n \
\n \
/* 一级标题内容 */\n \
.preview-theme--ningyezi h1 .content {\n \
  display: inline-block;\n \
  font-weight: bold;\n \
  color: #773098;\n \
}\n \
\n \
/* 一级标题修饰 请参考有实例的主题 */\n \
.preview-theme--ningyezi h1:after {}\n \
\n \
/* 二级标题 */\n \
.preview-theme--ningyezi h2 {\n \
  text-align: left;\n \
  margin: 20px 10px 0px 0px;\n \
}\n \
\n \
/* 二级标题内容 */\n \
.preview-theme--ningyezi h2 .content {\n \
  font-size: 18px;\n \
  font-weight: bold;\n \
  display: inline-block;\n \
  padding-left: 10px;\n \
  border-left: 5px solid #916dd5;\n \
}\n \
\n \
/* 二级标题修饰 请参考有实例的主题 */\n \
.preview-theme--ningyezi h2:after {}\n \
\n \
/* 三级标题 */\n \
.preview-theme--ningyezi h3 {\n \
  font-size: 16px;\n \
  font-weight: bold;\n \
  text-align: center;\n \
}\n \
\n \
/* 三级标题内容 */\n \
.preview-theme--ningyezi h3 .content {\n \
  border-bottom: 2px solid #d89cf6;\n \
}\n \
\n \
/* 三级标题修饰 请参考有实例的主题 */\n \
.preview-theme--ningyezi h3:after {}\n \
\n \
/* 无序列表整体样式\n \
  * list-style-type: square|circle|disc;\n \
  */\n \
.preview-theme--ningyezi ul {\n \
  font-size: 15px;\n \
  /*神奇逻辑，必须比li section的字体大才会在二级中生效*/\n \
  list-style-type: circle;\n \
}\n \
\n \
\n \
/* 有序列表整体样式\n \
  * list-style-type: upper-roman|lower-greek|lower-alpha;\n \
  */\n \
.preview-theme--ningyezi ol {\n \
  font-size: 15px;\n \
}\n \
\n \
/* 列表内容，不要设置li\n \
  */\n \
.preview-theme--ningyezi li section {\n \
  font-size: 14px;\n \
  font-weight: normal;\n \
}\n \
\n \
/* 引用\n \
  * 左边缘颜色 border-left-color:black;\n \
  * 背景色 background:gray;\n \
  */\n \
.preview-theme--ningyezi blockquote {\n \
  color: rgba(0,0,0,0.5) !important;\n \
  border-left-color: #d89cf6 !important;\n \
  background: #f4eeff !important;\n \
}\n \
\n \
/* 链接 \n \
  * border-bottom: 1px solid #009688;\n \
  */\n \
.preview-theme--ningyezi a {\n \
  color: #916dd5;\n \
  font-weight: bolder;\n \
  border-bottom: 1px solid #916dd5;\n \
}\n \
\n \
.preview-theme--ningyezi strong::before {\n \
  content: '「';\n \
}\n \
\n \
/* 加粗 */\n \
.preview-theme--ningyezi strong {\n \
  color: #916dd5;\n \
  font-weight: bold;\n \
}\n \
\n \
.preview-theme--ningyezi strong::after {\n \
  content: '」';\n \
}\n \
\n \
/* 斜体 */\n \
.preview-theme--ningyezi em {\n \
  font-style: normal;\n \
  color: #916dd5;\n \
}\n \
\n \
/* 加粗斜体 */\n \
.preview-theme--ningyezi em strong {\n \
  color: #916dd5;\n \
}\n \
\n \
/* 删除线 */\n \
.preview-theme--ningyezi del {\n \
  color: #916dd5;\n \
}\n \
\n \
/* 分隔线\n \
  * 粗细、样式和颜色\n \
  */\n \
.preview-theme--ningyezi hr {\n \
  height: 1px;\n \
  padding: 0;\n \
  border: none;\n \
  border-top: 2px solid #d9b8fa;\n \
}\n \
\n \
/* 图片\n \
  * 宽度 width:80%;\n \
  * 居中 margin:0 auto;\n \
  * 居左 margin:0 0;\n \
  */\n \
.preview-theme--ningyezi img {\n \
  border-radius: 6px;\n \
  display: block;\n \
  margin: 20px auto;\n \
  object-fit: contain;\n \
  box-shadow: 2px 4px 7px #999;\n \
}\n \
\n \
/* 图片描述文字 */\n \
.preview-theme--ningyezi figcaption {\n \
  display: block;\n \
  font-size: 13px;\n \
}\n \
\n \
/* 行内代码 */\n \
.preview-theme--ningyezi p code,\n \
.preview-theme--ningyezi li code,\n \
.preview-theme--ningyezi table code {\n \
  color: #916dd5;\n \
  font-weight: bolder;\n \
  background: none;\n \
}\n \
\n \
/* 非微信代码块\n \
  * 代码块不换行 display:-webkit-box !important;\n \
  * 代码块换行 display:block;\n \
  */\n \
.preview-theme--ningyezi .code-snippet__fix {\n \
  background: #f7f7f7;\n \
  border-radius: 2px;\n \
}\n \
\n \
.preview-theme--ningyezi pre code {}\n \
\n \
/*\n \
  * 表格内的单元格\n \
  * 字体大小 font-size: 16px;\n \
  * 边框 border: 1px solid #ccc;\n \
  * 内边距 padding: 5px 10px;\n \
  */\n \
.preview-theme--ningyezi table tr th,\n \
.preview-theme--ningyezi table tr td {\n \
  font-size: 14px;\n \
}\n \
\n \
.preview-theme--ningyezi .footnotes {\n \
  font-size: 14px;\n \
}\n \
\n \
/* 脚注文字 */\n \
.preview-theme--ningyezi .footnote-word {\n \
  font-weight: normal;\n \
  color: #916dd5;\n \
  font-weight: bold;\n \
}\n \
\n \
/* 脚注上标 */\n \
.preview-theme--ningyezi .footnote-ref {\n \
  font-weight: normal;\n \
  color: #916dd5;\n \
}\n \
\n \
/*脚注链接样式*/\n \
.preview-theme--ningyezi .footnote-item em {\n \
  font-size: 14px;\n \
  color: #916dd5;\n \
  display: block;\n \
}\n \
\n \
/* \"参考资料\"四个字 \n \
  * 内容 content: \"参考资料\";\n \
  */\n \
.preview-theme--ningyezi .footnotes-sep:before {\n \
  font-size: 20px;\n \
}\n \
\n \
/* 参考资料编号 */\n \
.preview-theme--ningyezi .footnote-num {\n \
  color: #916dd5;\n \
}\n \
\n \
/* 参考资料文字 */\n \
.preview-theme--ningyezi .footnote-item p {\n \
  color: #916dd5;\n \
  font-weight: bold;\n \
}\n \
\n \
/* 参考资料解释 */\n \
.preview-theme--ningyezi .footnote-item p em {\n \
  font-weight: normal;\n \
}\n \
\n \
/* 行间公式\n \
  * 最大宽度 max-width: 300% !important;\n \
  */\n \
.preview-theme--ningyezi .block-equation svg {}\n \
\n \
/* 行内公式\n \
  */\n \
.preview-theme--ningyezi .inline-equation svg {}\n \
.preview-theme--ningyezi pre>code {\n \
background-color: #333;\n \
color: rgba(255,255,255,0.75);\n \
}";
document.head.appendChild(style);
}
init_preview_theme_ningyezi();
