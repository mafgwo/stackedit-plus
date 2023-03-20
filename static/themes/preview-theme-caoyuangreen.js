function init_preview_theme_caoyuangreen() {
const style = document.createElement('style');
style.id = 'preview-theme-caoyuangreen';
style.type = 'text/css';
style.innerHTML = "/* 草原绿 caoyuangreen\n \
*/\n \
.preview-theme--caoyuangreen {\n \
  line-height: 1.35;\n \
  color: #333;\n \
  background-color: #fff;\n \
  font-family: Optima-Regular, PingFangTC-light;\n \
  letter-spacing: 1.5px;\n \
}\n \
\n \
/* 段落，下方未标注标签参数均同此处\n \
*/\n \
.preview-theme--caoyuangreen p {\n \
  color: #2b2b2b;\n \
  margin: 10px 0px;\n \
  letter-spacing: 2px;\n \
  font-size: 16px;\n \
  word-spacing: 2px;\n \
}\n \
\n \
/* 一级标题 */\n \
.preview-theme--caoyuangreen h1 {\n \
  font-size: 25px;\n \
}\n \
\n \
/* 一级标题内容 */\n \
.preview-theme--caoyuangreen h1 span {\n \
  display: inline-block;\n \
  font-weight: bold;\n \
  color: #4CAF50;\n \
}\n \
\n \
/* 一级标题修饰 请参考有实例的主题 */\n \
.preview-theme--caoyuangreen h1:after {}\n \
\n \
/* 二级标题 */\n \
.preview-theme--caoyuangreen h2 {\n \
  display:block;\n \
  border-bottom: 4px solid #4CAF50;\n \
}\n \
\n \
/* 二级标题内容 */\n \
.preview-theme--caoyuangreen h2 .content {\n \
  display: flex;\n \
  color: #4CAF50;\n \
  font-size: 20px;\n \
\n \
}\n \
\n \
/* 二级标题前缀 */\n \
.preview-theme--caoyuangreen h2 .prefix {\n \
\n \
}\n \
\n \
/* 二级标题后缀 */\n \
.preview-theme--caoyuangreen h2 .suffix {\n \
  display: flex;\n \
  box-sizing: border-box;\n \
  width: 20px;\n \
  height: 10px;\n \
  border-top-left-radius: 20px;\n \
  border-top-right-radius: 20px;\n \
  background: RGBA(76, 175, 80, .5);\n \
  color: rgb(255, 255, 255);\n \
  font-size: 16px;\n \
  letter-spacing: 0.544px;\n \
  justify-content: flex-end;\n \
  box-sizing: border-box !important;\n \
  overflow-wrap: break-word !important;\n \
  float: right;\n \
  margin-top: -10px;\n \
}\n \
\n \
.preview-theme--caoyuangreen h1:after, .preview-theme--caoyuangreen h2:after {\n \
    border-bottom: unset;\n \
}\n \
\n \
/* 三级标题 */\n \
.preview-theme--caoyuangreen h3 {\n \
  font-size: 17px;\n \
  font-weight: bold;\n \
  text-align: center;\n \
  position:relative;\n \
  margin-top: 20px;\n \
  margin-bottom: 20px;\n \
}\n \
\n \
/* 三级标题内容 */\n \
.preview-theme--caoyuangreen h3 .content {\n \
  color: #2b2b2b;\n \
  padding-bottom:2px\n \
}\n \
\n \
.preview-theme--caoyuangreen h3 .content:before{\n \
  content:'';\n \
  width:30px;\n \
  height:30px;\n \
  display:block;\n \
  background-image:url(https://files.mdnice.com/grass-green.png);\n \
  background-position:center;\n \
  background-size:30px;\n \
  margin:auto;\n \
  opacity:1;\n \
  background-repeat:no-repeat;\n \
  margin-bottom:-8px;\n \
}\n \
\n \
/* 三级标题修饰 请参考有实例的主题 */\n \
.preview-theme--caoyuangreen h3:after {}\n \
\n \
.preview-theme--caoyuangreen h4 .content {\n \
  height:16px;\n \
  line-height:16px;\n \
  font-size: 16px;\n \
}\n \
\n \
.preview-theme--caoyuangreen h4 .content:before{\n \
\n \
}\n \
\n \
/* 无序列表整体样式\n \
* list-style-type: square|circle|disc;\n \
*/\n \
.preview-theme--caoyuangreen ul {\n \
  font-size: 15px; /*神奇逻辑，必须比li section的字体大才会在二级中生效*/\n \
  color: #595959;\n \
  list-style-type: circle;\n \
}\n \
\n \
\n \
/* 有序列表整体样式\n \
* list-style-type: upper-roman|lower-greek|lower-alpha;\n \
*/\n \
.preview-theme--caoyuangreen ol {\n \
  font-size: 15px;\n \
  color: #595959;\n \
}\n \
\n \
/* 列表内容，不要设置li\n \
*/\n \
.preview-theme--caoyuangreen li section {\n \
  font-size: 16px;\n \
  font-weight: normal;\n \
  color: #595959;\n \
}\n \
\n \
/* 引用\n \
* 左边缘颜色 border-left-color:black;\n \
* 背景色 background:gray;\n \
*/\n \
.preview-theme--caoyuangreen blockquote::before {\n \
  content: \"❝\";\n \
  color: #74b56d;\n \
  font-size: 34px;\n \
  line-height: 1;\n \
  font-weight: 700;\n \
}\n \
\n \
.preview-theme--caoyuangreen blockquote {\n \
  text-size-adjust: 100%;\n \
  line-height: 1.55em;\n \
  font-weight: 400;\n \
  border-radius: 6px;\n \
  color: #595959 !important;\n \
  font-style: normal;\n \
  text-align: left;\n \
  box-sizing: inherit;\n \
  padding-bottom: 25px;\n \
  border-left: none !important;\n \
  border: 1px solid #1b900d !important;\n \
  background: #fff;\n \
\n \
}\n \
\n \
.preview-theme--caoyuangreen blockquote p {\n \
  margin: 0px;\n \
}\n \
\n \
.preview-theme--caoyuangreen blockquote::after {\n \
  content: \"❞\";\n \
  float: right;\n \
  color: #74b56d;\n \
}\n \
\n \
/* 链接\n \
* border-bottom: 1px solid #009688;\n \
*/\n \
.preview-theme--caoyuangreen a {\n \
  color: #399003;\n \
  font-weight: normal;\n \
  border-bottom: 1px solid #399003;\n \
}\n \
\n \
.preview-theme--caoyuangreen strong::before {\n \
  content: '「';\n \
}\n \
\n \
/* 加粗 */\n \
.preview-theme--caoyuangreen strong {\n \
  color: #399003;\n \
  font-weight: bold;\n \
}\n \
\n \
.preview-theme--caoyuangreen strong::after {\n \
  content: '」';\n \
}\n \
\n \
/* 斜体 */\n \
.preview-theme--caoyuangreen em {\n \
  font-style: normal;\n \
  color: #399003;\n \
  font-weight:bold;\n \
}\n \
\n \
/* 加粗斜体 */\n \
.preview-theme--caoyuangreen em strong {\n \
  color: #399003;\n \
}\n \
\n \
/* 删除线 */\n \
.preview-theme--caoyuangreen del {\n \
  color: #399003;\n \
}\n \
\n \
/* 分隔线\n \
* 粗细、样式和颜色\n \
* border-top:1px solid #3e3e3e;\n \
*/\n \
.preview-theme--caoyuangreen hr {\n \
  height: 1px;\n \
  padding: 0;\n \
  border: none;\n \
  border-top: 2px solid #399003;\n \
}\n \
\n \
/* 图片\n \
* 宽度 width:80%;\n \
* 居中 margin:0 auto;\n \
* 居左 margin:0 0;\n \
*/\n \
.preview-theme--caoyuangreen img {\n \
  border-radius: 6px;\n \
  display: block;\n \
  margin: 20px auto;\n \
  object-fit: contain;\n \
  box-shadow:2px 4px 7px #999;\n \
}\n \
\n \
/* 图片描述文字 */\n \
.preview-theme--caoyuangreen figcaption {\n \
  display: block;\n \
  font-size: 13px;\n \
  color: #2b2b2b;\n \
}\n \
\n \
/* 行内代码 */\n \
.preview-theme--caoyuangreen p code,\n \
.preview-theme--caoyuangreen li code,\n \
.preview-theme--caoyuangreen table code {\n \
  color: #0bb712;\n \
  background: rgba(127, 226, 159, 0.48);\n \
  display:inline-block;\n \
  padding:0 2px;\n \
  border-radius:2px;\n \
  height:21px;\n \
  line-height:22px;\n \
}\n \
\n \
/* 非微信代码块\n \
* 代码块不换行 display:-webkit-box !important;\n \
* 代码块换行 display:block;\n \
*/\n \
.preview-theme--caoyuangreen .code-snippet__fix {\n \
  background: #f7f7f7;\n \
  border-radius: 2px;\n \
}\n \
\n \
.preview-theme--caoyuangreen pre code {\n \
  letter-spacing: 0px;\n \
}\n \
\n \
/*\n \
* 表格内的单元格\n \
* 字体大小 font-size: 16px;\n \
* 边框 border: 1px solid #ccc;\n \
* 内边距 padding: 5px 10px;\n \
*/\n \
.preview-theme--caoyuangreen table tr th,\n \
.preview-theme--caoyuangreen table tr td {\n \
  font-size: 16px;\n \
  color: #595959;\n \
}\n \
\n \
.preview-theme--caoyuangreen .footnotes {\n \
  background: #F6EEFF;\n \
  padding: 20px 20px 20px 20px;\n \
  font-size: 16px;\n \
  border: 0.8px solid #399003;\n \
  border-radius: 6px;\n \
  border: 1px solid #399003;\n \
}\n \
\n \
/* 脚注文字 */\n \
.preview-theme--caoyuangreen .footnote-word {\n \
  font-weight: normal;\n \
  color: #595959;\n \
}\n \
\n \
/* 脚注上标 */\n \
.preview-theme--caoyuangreen .footnote-ref {\n \
  font-weight: normal;\n \
  color: #595959;\n \
}\n \
\n \
/*脚注链接样式*/\n \
.preview-theme--caoyuangreen .footnote-item em {\n \
  font-size: 16px;\n \
  color: #595959;\n \
  display: block;\n \
}\n \
\n \
.preview-theme--caoyuangreen .footnotes{\n \
  background: #fff;\n \
  padding: 20px 20px 20px 20px;\n \
  font-size: 16px;\n \
  border-radius: 6px;\n \
  border: 1px solid #4CAF50;\n \
}\n \
\n \
/* \"参考资料\"四个字\n \
* 内容 content: \"参考资料\";\n \
*/\n \
.preview-theme--caoyuangreen .footnotes-sep:before {\n \
  content: 'Reference';\n \
  color: #595959;\n \
  letter-spacing: 1px;\n \
  border-bottom: 2px solid #4CAF50;\n \
  display: inline;\n \
  font-size: 20px;\n \
}\n \
\n \
/* 参考资料编号 */\n \
.preview-theme--caoyuangreen .footnote-num {}\n \
\n \
/* 参考资料文字 */\n \
.preview-theme--caoyuangreen .footnote-item p {\n \
  color: #595959;\n \
  font-weight: bold;\n \
}\n \
\n \
/* 参考资料解释 */\n \
.preview-theme--caoyuangreen .footnote-item p em {\n \
  font-weight: normal;\n \
}\n \
\n \
/* 行间公式\n \
* 最大宽度 max-width: 300% !important;\n \
*/\n \
.preview-theme--caoyuangreen .block-equation svg {}\n \
\n \
/* 行内公式\n \
*/\n \
.preview-theme--caoyuangreen .inline-equation svg {}\n \
\n \
/* 滑动图片\n \
 */\n \
.preview-theme--caoyuangreen .imageflow-img {\n \
  display: inline-block;\n \
  width:100%;\n \
  margin-bottom: 0;\n \
}\n \
.preview-theme--caoyuangreen pre>code {\n \
background-color: #333;\n \
color: rgba(255,255,255,0.75);\n \
}";
document.head.appendChild(style);
}
init_preview_theme_caoyuangreen();
