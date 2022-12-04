function init_preview_theme_jikebrack() {
const style = document.createElement('style');
style.id = 'preview-theme-jikebrack';
style.type = 'text/css';
style.innerHTML = "/*极客黑样式，实时生效*/\n \
\n \
/* 全局属性\n \
 */\n \
.preview-theme--jikebrack {\n \
color: #2b2b2b;\n \
background-color: #fff;\n \
}\n \
\n \
/* 段落\n \
 */\n \
.preview-theme--jikebrack p {\n \
box-sizing: border-box;\n \
margin-bottom: 16px;\n \
font-family: \"Helvetica Neue\", Helvetica, \"Segoe UI\", Arial, freesans, sans-serif;\n \
font-size: 15px;\n \
text-align: start;\n \
white-space: normal;\n \
text-size-adjust: auto;\n \
line-height: 1.75em;\n \
}\n \
\n \
/* 一级标题 */\n \
.preview-theme--jikebrack h1 {\n \
margin-top: -0.46em;\n \
margin-bottom: 0.1em;\n \
border-bottom: 2px solid rgb(198, 196, 196);\n \
box-sizing: border-box;\n \
}\n \
\n \
/* 一级标题内容 */\n \
.preview-theme--jikebrack h1 .content {\n \
padding-top: 5px;\n \
padding-bottom: 5px;\n \
color: rgb(160, 160, 160);\n \
font-size: 13px;\n \
line-height: 2;\n \
box-sizing: border-box;\n \
}\n \
\n \
/* 一级标题修饰 请参考有实例的主题 */\n \
.preview-theme--jikebrack h1:after {\n \
}\n \
\n \
/* 二级标题 */\n \
.preview-theme--jikebrack h2 {\n \
margin: 10px auto;\n \
height: 40px;\n \
background-color: rgb(251, 251, 251);\n \
border-bottom: 1px solid rgb(246, 246, 246);\n \
overflow: hidden;\n \
box-sizing: border-box;\n \
}\n \
\n \
/* 二级标题内容 */\n \
.preview-theme--jikebrack h2 .content {\n \
margin-left: -10px;\n \
display: inline-block;\n \
width: auto;\n \
height: 40px;\n \
background-color: rgb(33, 33, 34);\n \
border-bottom-right-radius:100px;\n \
color: rgb(255, 255, 255);\n \
padding-right: 30px;\n \
padding-left: 30px;\n \
line-height: 40px;\n \
font-size: 16px;\n \
}\n \
\n \
/* 二级标题修饰 请参考有实例的主题 */\n \
.preview-theme--jikebrack h2:after {\n \
}\n \
\n \
/* 三级标题 */\n \
.preview-theme--jikebrack h3 {\n \
margin: 20px auto 5px;\n \
border-top: 1px solid rgb(221, 221, 221);\n \
box-sizing: border-box;\n \
}\n \
\n \
/* 三级标题内容 */\n \
.preview-theme--jikebrack h3 .content {\n \
margin-top: -1px;\n \
padding-top: 6px;\n \
padding-right: 5px;\n \
padding-left: 5px;\n \
font-size: 17px;\n \
border-top: 2px solid rgb(33, 33, 34);\n \
display: inline-block;\n \
line-height: 1.1;\n \
}\n \
\n \
/* 三级标题修饰 请参考有实例的主题 */\n \
.preview-theme--jikebrack h3:after {\n \
}\n \
\n \
.preview-theme--jikebrack h4 {\n \
margin: 10px auto -1px;\n \
border-top: 1px solid rgb(221, 221, 221);\n \
box-sizing: border-box;\n \
}\n \
\n \
.preview-theme--jikebrack h4 .content {\n \
margin-top: -1px;\n \
padding-top: 6px;\n \
padding-right: 5px;\n \
padding-left: 5px;\n \
font-size: 16px;\n \
border-top: 2px solid rgb(33, 33, 34);\n \
display: inline-block;\n \
line-height: 1.1;\n \
}\n \
\n \
/* 无序列表整体样式\n \
 * list-style-type: square|circle|disc;\n \
 */\n \
.preview-theme--jikebrack ul {\n \
}\n \
\n \
/* 有序列表整体样式\n \
 * list-style-type: upper-roman|lower-greek|lower-alpha;\n \
 */\n \
.preview-theme--jikebrack ol {\n \
}\n \
\n \
/* 列表内容，不要设置li\n \
 */\n \
.preview-theme--jikebrack li section {\n \
font-size: 15px;\n \
font-family: \"Helvetica Neue\", Helvetica, \"Segoe UI\", Arial, freesans, sans-serif;\n \
}\n \
\n \
/* 引用\n \
 * 左边缘颜色 border-left-color: black;\n \
 * 背景色 background: gray;\n \
 */\n \
.preview-theme--jikebrack blockquote {\n \
border-left-color: rgb(221, 221, 221) !important;\n \
margin-top: 1.2em;\n \
margin-bottom: 1.2em;\n \
padding-right: 1em;\n \
padding-left: 1em;\n \
border-left-width: 4px;\n \
color: rgb(119, 119, 119) !important;\n \
quotes: none;\n \
background: rgba(0, 0, 0, 0.05) !important;\n \
}\n \
\n \
/* 引用文字 */\n \
.preview-theme--jikebrack blockquote p {\n \
font-size: 15px;\n \
font-family: -apple-system-font, BlinkMacSystemFont, \"Helvetica Neue\", \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei UI\", \"Microsoft YaHei\", Arial, sans-serif;\n \
color: rgb(119, 119, 119);\n \
line-height: 1.75em;\n \
}\n \
\n \
/* 链接 \n \
 * border-bottom: 1px solid #009688;\n \
 */\n \
.preview-theme--jikebrack a {\n \
color: rgb(239, 112, 96);\n \
border-bottom: 1px solid rgb(239, 112, 96);\n \
}\n \
\n \
/* 加粗 */\n \
.preview-theme--jikebrack strong {\n \
}\n \
\n \
/* 斜体 */\n \
.preview-theme--jikebrack em {\n \
}\n \
\n \
/* 加粗斜体 */\n \
.preview-theme--jikebrack em strong {\n \
}\n \
\n \
/* 删除线 */\n \
.preview-theme--jikebrack s {\n \
}\n \
\n \
/* 分隔线\n \
 * 粗细、样式和颜色\n \
 * border-top: 1px solid #3e3e3e;\n \
 */\n \
.preview-theme--jikebrack hr {\n \
}\n \
\n \
/* 图片\n \
 * 宽度 width: 80%;\n \
 * 居中 margin: 0 auto;\n \
 * 居左 margin: 0 0;\n \
 */\n \
.preview-theme--jikebrack img {\n \
}\n \
\n \
/* 图片描述文字 */\n \
.preview-theme--jikebrack figcaption {\n \
}\n \
\n \
/* 行内代码 */\n \
.preview-theme--jikebrack p code,.preview-theme--jikebrack li code {\n \
color: rgb(239, 112, 96) !important;\n \
background-color: rgba(27,31,35,.05) !important;\n \
}\n \
\n \
/* 非微信代码块\n \
 * 代码块不换行 display: -webkit-box !important;\n \
 * 代码块换行 display: block;\n \
 */\n \
.preview-theme--jikebrack pre code {\n \
}\n \
\n \
/*\n \
 * 表格内的单元格\n \
 * 字体大小 font-size: 16px;\n \
 * 边框 border: 1px solid #ccc;\n \
 * 内边距 padding: 5px 10px;\n \
 */\n \
.preview-theme--jikebrack table tr th,\n \
.preview-theme--jikebrack table tr td {\n \
}\n \
\n \
/* 脚注文字 */\n \
.preview-theme--jikebrack .footnote-word {\n \
color: #ff3502;\n \
}\n \
\n \
/* 脚注上标 */\n \
.preview-theme--jikebrack .footnote-ref {\n \
color: rgb(239, 112, 96);\n \
}\n \
\n \
/* \"参考资料\"四个字 \n \
 * 内容 content: \"参考资料\";\n \
 */\n \
.preview-theme--jikebrack .footnotes-sep:before {\n \
}\n \
\n \
/* 参考资料编号 */\n \
.preview-theme--jikebrack .footnote-num {\n \
}\n \
\n \
/* 参考资料文字 */\n \
.preview-theme--jikebrack .footnote-item p { \n \
}\n \
\n \
/* 参考资料解释 */\n \
.preview-theme--jikebrack .footnote-item p em {\n \
}\n \
\n \
/* 行间公式\n \
 * 最大宽度 max-width: 300% !important;\n \
 */\n \
.preview-theme--jikebrack .block-equation svg {\n \
}\n \
\n \
/* 行内公式\n \
 */\n \
.preview-theme--jikebrack .inline-equation svg {\n \
}\n \
\n \
.preview-theme--jikebrack pre>code {\n \
background-color: #333;\n \
color: rgba(255,255,255,0.75);\n \
}";
document.head.appendChild(style);
}
init_preview_theme_jikebrack();
