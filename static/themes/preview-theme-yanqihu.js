function init_preview_theme_yanqihu() {
const style = document.createElement('style');
style.id = 'preview-theme-yanqihu';
style.type = 'text/css';
style.innerHTML = "/* 雁栖湖 yanqihu\n \
*/\n \
.preview-theme--yanqihu {\n \
 color: #2b2b2b;\n \
 background-color: #fff;\n \
 counter-reset: counterh1 counterh2 counterh3;\n \
}\n \
\n \
/* 段落，下方未标注标签参数均同此处\n \
*/\n \
.preview-theme--yanqihu p {\n \
}\n \
\n \
/* 一级标题 */\n \
.preview-theme--yanqihu h1 {\n \
 line-height: 28px;\n \
 border-bottom: 1px solid rgb(37,132,181);\n \
}\n \
\n \
.preview-theme--yanqihu h1:before {\n \
 background: rgb(37,132,181);\n \
 color: white;\n \
 counter-increment: counterh1;\n \
 content: 'Part'counter(counterh1); \n \
 padding: 2px 8px;\n \
}\n \
\n \
/* 一级标题内容 */\n \
.preview-theme--yanqihu h1 .content {\n \
 color: rgb(37,132,181);\n \
 margin-left: 8px;\n \
 font-size: 20px;\n \
}\n \
\n \
/* 一级标题前缀 */\n \
.preview-theme--yanqihu h1 .prefix {\n \
}\n \
\n \
/* 一级标题后缀 */\n \
.preview-theme--yanqihu h1 .suffix {\n \
}\n \
\n \
/* 二级标题 */\n \
.preview-theme--yanqihu h2 {\n \
}\n \
\n \
/* 二级标题内容 */\n \
.preview-theme--yanqihu h2 .content {\n \
 font-size: 18px;\n \
 border-bottom: 4px solid rgb(37,132,181);\n \
 padding: 2px 4px;\n \
 color: rgb(37,132,181);\n \
}\n \
\n \
/* 二级标题前缀 */\n \
.preview-theme--yanqihu h2 .prefix {\n \
 display: inline-block;\n \
}\n \
\n \
.preview-theme--yanqihu h2 .prefix:before {\n \
 counter-increment: counterh2;\n \
 content: counter(counterh2); \n \
 color:rgb(159,205,208);\n \
 border-bottom: 4px solid rgb(159,205,208);\n \
 font-size: 18px;\n \
 padding: 2px 4px;\n \
}\n \
\n \
/* 二级标题后缀 */\n \
.preview-theme--yanqihu h2 .suffix {\n \
}\n \
\n \
.preview-theme--yanqihu h1:after, .preview-theme--yanqihu h2:after {\n \
   border-bottom: unset;\n \
}\n \
\n \
/* 三级标题 */\n \
.preview-theme--yanqihu h3 {\n \
}\n \
\n \
/* 三级标题内容 */\n \
.preview-theme--yanqihu h3 .content {\n \
 font-size: 16px;\n \
 border-bottom: 1px solid rgb(37,132,181);\n \
 padding: 2px 10px;\n \
 color: rgb(37,132,181);\n \
}\n \
\n \
/* 三级标题前缀 */\n \
.preview-theme--yanqihu h3 .prefix {\n \
 display:inline-block;\n \
 background:linear-gradient(45deg, transparent 48%, rgb(37,132,181) 48%, \n \
           rgb(37,132,181) 52%, transparent 52%);\n \
 width:24px;\n \
 height:24px;\n \
 margin-bottom: -7px;\n \
}\n \
\n \
/* 三级标题后缀 */\n \
.preview-theme--yanqihu h3 .suffix {\n \
}\n \
\n \
/* 无序列表整体样式\n \
* list-style-type: square|circle|disc;\n \
*/\n \
.preview-theme--yanqihu ul {\n \
}\n \
\n \
/* 有序列表整体样式\n \
* list-style-type: upper-roman|lower-greek|lower-alpha;\n \
*/\n \
.preview-theme--yanqihu ol {\n \
}\n \
\n \
/* 列表内容，不要设置li\n \
*/\n \
.preview-theme--yanqihu li section {\n \
}\n \
\n \
/* 一级引用\n \
* 左边缘颜色 border-left-color: black;\n \
* 背景色 background: gray;\n \
*/\n \
.preview-theme--yanqihu blockquote {\n \
 color: rgba(0,0,0,0.5) !important;\n \
 border: 1px dashed rgb(37,132,181) !important;\n \
 background: transparent !important;\n \
}\n \
\n \
/* 一级引用文字 */\n \
.preview-theme--yanqihu blockquote p {\n \
}\n \
\n \
/* 二级引用\n \
*/\n \
.preview-theme--yanqihu .multiquote-2 {\n \
 border: 1px dashed rgb(248,99,77);\n \
 box-shadow: none;\n \
}\n \
\n \
.preview-theme--yanqihu .multiquote-2 blockquote {\n \
 margin: 0;\n \
}\n \
\n \
/* 二级引用文字 */\n \
.preview-theme--yanqihu .multiquote-2 p {\n \
}\n \
\n \
.preview-theme--yanqihu .multiquote-2 strong {\n \
 color:rgb(248,99,77);\n \
}\n \
\n \
.preview-theme--yanqihu .multiquote-2 a {\n \
 color:rgb(248,99,77);\n \
 border-bottom: 1px solid rgb(248,99,77);\n \
}\n \
\n \
/* 三级引用\n \
*/\n \
.preview-theme--yanqihu .multiquote-3 {\n \
}\n \
\n \
/* 三级引用文字 */\n \
.preview-theme--yanqihu .multiquote-3 p {\n \
}\n \
\n \
/* 链接 \n \
* border-bottom: 1px solid #009688;\n \
*/\n \
.preview-theme--yanqihu a {\n \
 color:rgb(37,132,181);\n \
 border-bottom: 1px solid rgb(37,132,181);\n \
}\n \
\n \
/* 加粗 */\n \
.preview-theme--yanqihu strong {\n \
 color: rgb(37,132,181);\n \
}\n \
\n \
/* 斜体 */\n \
.preview-theme--yanqihu em {\n \
 color: rgb(37,132,181);\n \
}\n \
\n \
/* 加粗斜体 */\n \
.preview-theme--yanqihu em strong {\n \
 color: rgb(37,132,181);\n \
}\n \
\n \
/* 删除线 */\n \
.preview-theme--yanqihu del {\n \
}\n \
\n \
/* 分隔线\n \
* 粗细、样式和颜色\n \
* border-top: 1px solid #3e3e3e;\n \
*/\n \
.preview-theme--yanqihu hr {\n \
 border-top: 1px solid rgb(37,132,181);\n \
}\n \
\n \
/* 图片\n \
* 宽度 width: 80%;\n \
* 居中 margin: 0 auto;\n \
* 居左 margin: 0 0;\n \
*/\n \
.preview-theme--yanqihu img {\n \
}\n \
\n \
/* 图片描述文字 */\n \
.preview-theme--yanqihu figcaption {\n \
}\n \
\n \
/* 行内代码 */\n \
.preview-theme--yanqihu p code,\n \
.preview-theme--yanqihu li code,\n \
.preview-theme--yanqihu table code {\n \
 background-color: rgba(0,0,0,.05);\n \
}\n \
\n \
/* \n \
* 代码块不换行 display: -webkit-box !important;\n \
* 代码块换行 display: block;\n \
*/\n \
.preview-theme--yanqihu pre code {\n \
}\n \
\n \
/*\n \
* 表格内的单元格\n \
* 字体大小 font-size: 16px;\n \
* 边框 border: 1px solid #ccc;\n \
* 内边距 padding: 5px 10px;\n \
*/\n \
.preview-theme--yanqihu table tr th {\n \
 border: 1px solid rgb(248,99,77);\n \
 background-color: rgb(235,114, 80);\n \
 color: #f8f8f8;\n \
 border-bottom: 0;\n \
 border: 1px solid rgb(245,203,174);\n \
}\n \
\n \
.preview-theme--yanqihu table tr td {\n \
 border: 1px solid rgb(245,203,174);\n \
}\n \
/* \n \
* 某一列表格列宽控制\n \
* n 可以修改为具体数字，不修改时表示所有列\n \
* 最小列宽 min-width: 85px;\n \
*/\n \
.preview-theme--yanqihu table tr th:nth-of-type(n),\n \
.preview-theme--yanqihu table tr td:nth-of-type(n){\n \
}\n \
\n \
.preview-theme--yanqihu table tr:nth-of-type(2n) {\n \
 background-color: rgb(248,222,203);\n \
}\n \
/* 脚注文字 */\n \
.preview-theme--yanqihu .footnote-word {\n \
 color:rgb(37,132,181);\n \
}\n \
\n \
/* 脚注上标 */\n \
.preview-theme--yanqihu .footnote-ref {\n \
 color:rgb(37,132,181);\n \
}\n \
\n \
/* \"参考资料\"四个字 \n \
* 内容 content: \"参考资料\";\n \
*/\n \
.preview-theme--yanqihu .footnotes-sep:before {\n \
}\n \
\n \
/* 参考资料编号 */\n \
.preview-theme--yanqihu .footnote-num {\n \
}\n \
\n \
/* 参考资料文字 */\n \
.preview-theme--yanqihu .footnote-item p { \n \
}\n \
\n \
/* 参考资料解释 */\n \
.preview-theme--yanqihu .footnote-item p em {\n \
}\n \
\n \
/* 行间公式\n \
* 最大宽度 max-width: 300% !important;\n \
*/\n \
.preview-theme--yanqihu .block-equation svg {\n \
}\n \
\n \
/* 行内公式\n \
*/\n \
.preview-theme--yanqihu .inline-equation svg { \n \
}\n \
.preview-theme--yanqihu pre>code {\n \
background-color: #333;\n \
color: rgba(255,255,255,0.75);\n \
}";
document.head.appendChild(style);
}
init_preview_theme_yanqihu();
