function init_preview_theme_simplebrack() {
const style = document.createElement('style');
style.id = 'preview-theme-simplebrack';
style.type = 'text/css';
style.innerHTML = "/* 全局属性\n \
 * 页边距 padding: 30px;\n \
 * 全文字体 font-family: ptima-Regular;\n \
 * 英文换行 word-break: break-all;\n \
 */\n \
 .preview-theme--simplebrack {\n \
font-size:14px;\n \
padding:10px;\n \
color: #2b2b2b;\n \
background-color: #fff;\n \
}\n \
\n \
/*图片下提示*/\n \
.preview-theme--simplebrack figcaption{\n \
font-size:12px;\n \
}\n \
.preview-theme--simplebrack .imageflow-caption{\n \
font-size:12px;\n \
}\n \
\n \
/* 段落，下方未标注标签参数均同此处\n \
 * 上边距 margin-top: 5px;\n \
 * 下边距 margin-bottom: 5px;\n \
 * 行高 line-height: 26px;\n \
 * 词间距 word-spacing: 3px;\n \
 * 字间距 letter-spacing: 3px;\n \
 * 对齐 text-align: left;\n \
 * 颜色 color: #3e3e3e;\n \
 * 字体大小 font-size: 16px;\n \
 * 首行缩进 text-indent: 2em;\n \
 */\n \
.preview-theme--simplebrack p {\n \
font-size:14px;\n \
}\n \
\n \
/* 一级标题 */\n \
.preview-theme--simplebrack h1 {\n \
}\n \
\n \
/* 一级标题内容 */\n \
.preview-theme--simplebrack h1 .content {\n \
}\n \
\n \
/* 一级标题前缀 */\n \
.preview-theme--simplebrack h1 .prefix {\n \
}\n \
\n \
/* 一级标题后缀 */\n \
.preview-theme--simplebrack h1 .suffix{\n \
}\n \
\n \
/* 二级标题 */\n \
.preview-theme--simplebrack h2 {\n \
text-align:center;\n \
position:relative;\n \
font-weight: bold;\n \
color: black;\n \
line-height: 1.1em;\n \
padding-top: 12px;\n \
padding-bottom: 12px;\n \
margin:70px 30px 30px;\n \
border: 1px solid #000;\n \
}\n \
\n \
.preview-theme--simplebrack h2:before{\n \
content: ' ';\n \
float: left;\n \
display: block;\n \
width: 90%;\n \
border-top: 1px solid #000;\n \
height: 1px;\n \
line-height: 1px;\n \
margin-left: -5px;\n \
margin-top: -17px;\n \
}\n \
.preview-theme--simplebrack h2:after{\n \
content: ' ';\n \
float: right;\n \
display: block;\n \
width: 90%;\n \
border-bottom: 1px solid #000;\n \
height: 1px;\n \
line-height: 1px;\n \
margin-right: -5px;\n \
margin-top: 16px;\n \
position: unset;\n \
}\n \
/* 二级标题内容 */\n \
.preview-theme--simplebrack h2 .content {\n \
display: block;\n \
-webkit-box-reflect: below 0em -webkit-gradient(linear,left top,left bottom, from(rgba(0,0,0,0)),to(rgba(255,255,255,0.1)));\n \
}\n \
.preview-theme--simplebrack h2 strong {\n \
}\n \
/* 二级标题前缀 */\n \
.preview-theme--simplebrack h2 .prefix {\n \
display: block;\n \
width: 3px;\n \
margin: 0 0 0 5%;\n \
height: 3px;\n \
line-height: 3px;\n \
overflow: hidden;\n \
background-color: #000;\n \
box-shadow:3px 0 #000,\n \
0 3px #000,\n \
-3px 0 #000,\n \
0 -3px #000;\n \
}\n \
\n \
/* 二级标题后缀 */\n \
.preview-theme--simplebrack h2 .suffix {\n \
display: block;\n \
width: 3px;\n \
margin: 0 0 0 95%;\n \
height: 3px;\n \
line-height: 3px;\n \
overflow: hidden;\n \
background-color: #000;\n \
box-shadow:3px 0 #000,\n \
0 3px #000,\n \
-3px 0 #000,\n \
0 -3px #000;\n \
}\n \
\n \
/* 三级标题 */\n \
.preview-theme--simplebrack h3 {\n \
background-color:#000;\n \
color:#fff;\n \
padding:2px 10px;\n \
width:fit-content;\n \
font-size:17px;\n \
margin:60px auto 10px;\n \
}\n \
.preview-theme--simplebrack h3 strong {\n \
color:#fff;\n \
}\n \
\n \
/* 三级标题内容 */\n \
.preview-theme--simplebrack h3 .content {\n \
}\n \
\n \
/* 三级标题前缀 */\n \
.preview-theme--simplebrack h3 .prefix {\n \
}\n \
\n \
/* 三级标题后缀 */\n \
.preview-theme--simplebrack h3 .suffix {\n \
}\n \
\n \
/* 无序列表整体样式\n \
 * list-style-type: square|circle|disc;\n \
 */\n \
.preview-theme--simplebrack ul {\n \
list-style-type: square;\n \
}\n \
/* 无序二级列表\n \
 */\n \
.preview-theme--simplebrack ul li ul li{\n \
list-style-type: circle;\n \
}\n \
\n \
/* 有序列表整体样式\n \
 * list-style-type: upper-roman|lower-greek|lower-alpha;\n \
 */\n \
.preview-theme--simplebrack ol {\n \
}\n \
\n \
/* 列表内容，不要设置li\n \
 */\n \
.preview-theme--simplebrack li section {\n \
}\n \
\n \
/* 引用\n \
 * 左边缘颜色 border-left-color: black;\n \
 * 背景色 background: gray;\n \
 */\n \
.preview-theme--simplebrack blockquote {\n \
border-left: 3px solid rgba(0, 0, 0, 0.65) !important;\n \
border-right: 1px solid rgba(0, 0, 0, 0.65) !important;\n \
background: rgb(249, 249, 249) !important;\n \
}\n \
\n \
/* 引用文字 */\n \
.preview-theme--simplebrack blockquote p {\n \
}\n \
\n \
/* 链接 \n \
 * border-bottom: 1px solid #009688;\n \
 */\n \
.preview-theme--simplebrack a {\n \
}\n \
\n \
/* 加粗 */\n \
.preview-theme--simplebrack strong {\n \
}\n \
\n \
/* 斜体 */\n \
.preview-theme--simplebrack em {\n \
}\n \
\n \
/* 加粗斜体 */\n \
.preview-theme--simplebrack em strong {\n \
}\n \
\n \
/* 删除线 */\n \
.preview-theme--simplebrack del {\n \
}\n \
\n \
/* 分隔线\n \
 * 粗细、样式和颜色\n \
 * border-top: 1px solid #3e3e3e;\n \
 */\n \
.preview-theme--simplebrack hr {\n \
}\n \
\n \
/* 图片\n \
 * 宽度 width: 80%;\n \
 * 居中 margin: 0 auto;\n \
 * 居左 margin: 0 0;\n \
 */\n \
.preview-theme--simplebrack img {\n \
box-shadow: rgba(170, 170, 170, 0.48) 0px 0px 6px 0px;\n \
border-radius:4px;\n \
margin-top:10px;\n \
}\n \
/* 行内代码 */\n \
.preview-theme--simplebrack p code, .preview-theme--simplebrack li code {\n \
color:#ff6441;\n \
background-color: rgba(27,31,35,.05) !important;\n \
}\n \
\n \
/* 非微信代码块\n \
 * 代码块不换行 display: -webkit-box !important;\n \
 * 代码块换行 display: block;\n \
 */\n \
.preview-theme--simplebrack pre.custom {\n \
box-shadow: rgba(170, 170, 170, 0.48) 0px 0px 6px 0px;\n \
max-width: 100%;\n \
border-radius:4px;\n \
margin: 10px auto 0 auto;\n \
}\n \
.preview-theme--simplebrack pre code {\n \
}\n \
\n \
/*\n \
 * 表格内的单元格\n \
 * 字体大小 font-size: 16px;\n \
 * 边框 border: 1px solid #ccc;\n \
 * 内边距 padding: 5px 10px;\n \
 */\n \
.preview-theme--simplebrack table tr th,\n \
.preview-theme--simplebrack table tr td {\n \
font-size:14px;\n \
}\n \
\n \
/* 脚注文字 */\n \
.preview-theme--simplebrack .footnote-word {\n \
}\n \
\n \
/* 脚注上标 */\n \
.preview-theme--simplebrack .footnote-ref {\n \
}\n \
\n \
/* \"参考资料\"四个字 \n \
 * 内容 content: \"参考资料\";\n \
 */\n \
.preview-theme--simplebrack .footnotes-sep {\n \
font-size: 14px;\n \
color: #888;\n \
border-top: 1px solid #eee;\n \
padding: 30px 0 10px 0px;\n \
background-color: transparent;\n \
margin-bottom: 20px;\n \
width: 100%;\n \
}\n \
.preview-theme--simplebrack .footnotes-sep:before {\n \
content:'参考资料';\n \
}\n \
.preview-theme--simplebrack .footnotes{\n \
border-left:5px solid #eee;\n \
padding-left:10px;\n \
}\n \
\n \
/* 参考资料编号 */\n \
.preview-theme--simplebrack .footnote-num {\n \
font-size:14px;\n \
color:#999;\n \
}\n \
\n \
/* 参考资料文字 */\n \
.preview-theme--simplebrack .footnote-item p { \n \
font-size:14px;\n \
color:#999;\n \
}\n \
\n \
/* 参考资料解释 */\n \
.preview-theme--simplebrack .footnote-item p em {\n \
font-size:14px;\n \
color:#999;\n \
}\n \
\n \
/* 行间公式\n \
 * 最大宽度 max-width: 300% !important;\n \
 */\n \
.preview-theme--simplebrack .block-equation svg {\n \
}\n \
\n \
/* 行内公式\n \
 */\n \
.preview-theme--simplebrack .inline-equation svg {\n \
}\n \
/* 文章结尾 */\n \
.preview-theme--simplebrack:after{\n \
content:'- END -';\n \
font-size:15px;\n \
display:block;\n \
text-align:center;\n \
margin-top:50px;\n \
color:#999;\n \
border-bottom:1px solid #eee;\n \
}\n \
\n \
/*滑动幻灯片*/\n \
.preview-theme--simplebrack .imageflow-layer1 img{\n \
margin:0;\n \
box-shadow: none;\n \
border-radius: 0;\n \
}\n \
.preview-theme--simplebrack pre>code {\n \
background-color: #333;\n \
color: rgba(255,255,255,0.75);\n \
}";
document.head.appendChild(style);
}
init_preview_theme_simplebrack();
