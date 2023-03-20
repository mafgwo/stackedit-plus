function init_preview_theme_allblue() {
const style = document.createElement('style');
style.id = 'preview-theme-allblue';
style.type = 'text/css';
style.innerHTML = "/* 全栈蓝 */\n \
\n \
/* 全局属性\n \
*/\n \
.preview-theme--allblue {\n \
line-height: 1.25;\n \
color: #2b2b2b;\n \
background-color: #fff;\n \
font-family: Optima-Regular, Optima, PingFangTC-Light, PingFangSC-light, PingFangTC-light;\n \
letter-spacing: 2px;\n \
background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.04) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(50, 0, 0, 0.04) 3%, rgba(0, 0, 0, 0) 3%);\n \
background-size: 20px 20px;\n \
background-position: center;\n \
}\n \
\n \
/* 段落\n \
*/\n \
.preview-theme--allblue p {\n \
color: #2b2b2b;\n \
margin: 10px 0px;\n \
letter-spacing: 2px;\n \
font-size: 14px;\n \
word-spacing: 2px;\n \
}\n \
\n \
/* 一级标题 */\n \
.preview-theme--allblue h1 {\n \
font-size: 25px;\n \
}\n \
\n \
/* 一级标题内容 */\n \
.preview-theme--allblue h1 span {\n \
display: inline-block;\n \
font-weight: bold;\n \
color: #40B8FA;\n \
}\n \
\n \
/* 一级标题修饰 请参考有实例的主题 */\n \
.preview-theme--allblue h1:after {\n \
position: unset;\n \
display: unset;\n \
border-bottom: unset;\n \
}\n \
\n \
/* 二级标题 */\n \
.preview-theme--allblue h2 {\n \
display:block;\n \
border-bottom: 4px solid #40B8FA;\n \
}\n \
\n \
/* 二级标题内容 */\n \
.preview-theme--allblue h2 .content {\n \
display: flex;\n \
color: #40B8FA;\n \
font-size: 20px;\n \
margin-left: 25px;\n \
}\n \
\n \
/* 二级标题前缀 */\n \
.preview-theme--allblue h2 .prefix {\n \
display: flex;\n \
width: 20px;\n \
height: 20px;\n \
background-size: 20px 20px;\n \
background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB00lEQVRYCe1Xy23DMAz1BB2jA+TSU2EBmSMzeIUM4WuHyKXWoWeP02sdS4CLJ4YW5ciKDUdICySAAMn68PHxiVSK4vn7Swy8fQ4vpbYH1ZyPORrOho2oz6r5UaU230r3Q84GG/uv4fUKhNKmJQC2BpgsTXcVbJTanAIAQASvS91/BBMZBjAOWwELzltQ35yPsElawEJbc8zQlwBpbE7Yuwan05azJfZNAYzjy8JwTCC9Tkx7dwDwGppAYwbg/XQ8K6gEokUMJPZvnooD0F1FlMJrW+dtsIGr3lWjNxj4mObNA96OAOCyn0Nl63fd73I2YhdX3h48A0g8TvGk8HEiQyeugf8MAJlNJqhbpN2VAdbOVW5PoFgNwNUJlGdt2iB/F0VBySkUFATMekJ/imUxAHjHhYOuTgwAlW/OljBGhY3vOsAhRF7xiwDI3A8vY57coh97mCFihIrPIgDwhAxIT8JSzexI75juwLB7Z6xkgA9iIGxMagBeoRhJ+rEe7NHDxrToy7NoHnpC6RdzI+WX98B0Ex8sv5OXIp3KyUR/cQgSZ2yaigIg5YLSMM6bLM1sjoXTLcU9p9g94FEKBF48ectx8hUFRbvr94g/JjMhe37OzsAvpzCHV7lWaToAAAAASUVORK5CYII=);\n \
margin-bottom: -22px;\n \
}\n \
\n \
/* 二级标题后缀 */\n \
.preview-theme--allblue h2 .suffix {\n \
display: flex;\n \
box-sizing: border-box;\n \
width: 200px;\n \
height: 10px;\n \
border-top-left-radius: 20px;\n \
background: RGBA(64, 184, 250, .5);\n \
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
.preview-theme--allblue h2:after {\n \
position: unset;\n \
display: unset;\n \
border-bottom: unset;\n \
}\n \
\n \
/* 三级标题 */\n \
.preview-theme--allblue h3 {\n \
font-size: 17px;\n \
font-weight: bold;\n \
text-align: center;\n \
position:relative;\n \
margin-top: 20px;\n \
margin-bottom: 20px;\n \
}\n \
\n \
/* 三级标题内容 */\n \
.preview-theme--allblue h3 .content {\n \
border-bottom: 2px solid RGBA(79, 177, 249, .65);\n \
color: #2b2b2b;\n \
padding-bottom:2px\n \
}\n \
\n \
.preview-theme--allblue h3 .content:before{\n \
content:'';\n \
width:30px;\n \
height:30px;\n \
display:block;\n \
background-position:center;\n \
background-size:30px;\n \
margin:auto;\n \
opacity:1;\n \
background-repeat:no-repeat;\n \
margin-bottom:-8px;\n \
}\n \
\n \
/* 三级标题修饰 请参考有实例的主题 */\n \
.preview-theme--allblue h3:after {}\n \
\n \
.preview-theme--allblue h4 .content {\n \
height:16px;\n \
line-height:16px;\n \
font-size: 16px;\n \
}\n \
\n \
.preview-theme--allblue h4 .content:before{\n \
content:'';\n \
background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABXElEQVRYCe1WsRHCMAzMVHRcvAcz0KekZQ92iNMwCzPQ2SngxJ2MbMm2RCjDHRdb+X/L8kfJMOy/vQIbK3D08eB8fOF/o5yd7pZwwsWdX+92hY2M0YdrSmBZp41ydjrsGhOA47ArNBhuDhcU/1zncCnhzocHYuCehlNqiHONEDXg6OMThTRcxIpXrcC4xDPuvjSgVoMlYCG6Od5SAoIBLVqfRKwEjQHVmmogqRmcO1aAhNmwq90FMMlhoAaEJ0GAZKHqGtUbGZ1PMt4cbxzBIxkH2jc81mKQc1kkM6DQHxih1SN+SYI2IE0H7K7RBRRbQvPRBlRA0lStrQXmBmy/AbWapmzdsk5YAfBCIhcD8+LI7xFpA4J2jDx67WlQrDhuCdAGJBmwxRUXqwVrQqn8QgOqcWprmOMWA5rFNQRqQPgc03D+iqEGhA/Sv4prxL7nH1+SATUaO2avAK3AG91vsolsvFjsAAAAAElFTkSuQmCC);\n \
display:inline-block;\n \
width:16px;\n \
height:16px;\n \
background-size:100% ;\n \
background-position:left bottom;\n \
background-repeat:no-repeat;\n \
width: 16px;\n \
height: 15px;\n \
line-height:15px;\n \
margin-right:6px;\n \
margin-bottom:-2px;\n \
}\n \
\n \
/* 无序列表整体样式\n \
* list-style-type: square|circle|disc;\n \
*/\n \
.preview-theme--allblue ul {\n \
font-size: 15px; /*神奇逻辑，必须比li section的字体大才会在二级中生效*/\n \
color: #595959;\n \
list-style-type: circle;\n \
}\n \
\n \
\n \
/* 有序列表整体样式\n \
* list-style-type: upper-roman|lower-greek|lower-alpha;\n \
*/\n \
.preview-theme--allblue ol {\n \
font-size: 15px;\n \
color: #595959;\n \
}\n \
\n \
/* 列表内容，不要设置li\n \
*/\n \
.preview-theme--allblue li section {\n \
font-size: 14px;\n \
font-weight: normal;\n \
color: #595959;\n \
}\n \
\n \
/* 引用\n \
* 左边缘颜色 border-left-color:black;\n \
* 背景色 background:gray;\n \
*/\n \
.preview-theme--allblue blockquote::before {\n \
content: \"❝\";\n \
color: RGBA(64, 184, 250, .5);\n \
font-size: 34px;\n \
line-height: 1;\n \
font-weight: 700;\n \
}\n \
\n \
.preview-theme--allblue blockquote {\n \
text-size-adjust: 100%;\n \
line-height: 1.55em;\n \
font-weight: 400;\n \
border-radius: 6px;\n \
color: #595959 !important;\n \
font-style: normal;\n \
text-align: left;\n \
box-sizing: inherit;\n \
border-left: none;\n \
padding-bottom: 25px;\n \
border: 1px solid RGBA(64, 184, 250, .4) !important;\n \
background: RGBA(64, 184, 250, .1) !important;\n \
}\n \
\n \
.preview-theme--allblue blockquote p {\n \
color: #595959;\n \
margin: 0px;\n \
}\n \
\n \
.preview-theme--allblue blockquote::after {\n \
content: \"❞\";\n \
float: right;\n \
line-height: 1;\n \
color: RGBA(64, 184, 250, .5);\n \
}\n \
\n \
/* 链接\n \
* border-bottom: 1px solid #009688;\n \
*/\n \
.preview-theme--allblue a {\n \
color: #40B8FA;\n \
font-weight: normal;\n \
border-bottom: 1px solid #3BAAFA;\n \
}\n \
\n \
.preview-theme--allblue strong::before {\n \
content: '「';\n \
}\n \
\n \
/* 加粗 */\n \
.preview-theme--allblue strong {\n \
color: #3594F7;\n \
font-weight: bold;\n \
}\n \
\n \
.preview-theme--allblue strong::after {\n \
content: '」';\n \
}\n \
\n \
/* 斜体 */\n \
.preview-theme--allblue em {\n \
font-style: normal;\n \
color: #3594F7;\n \
font-weight:bold;\n \
}\n \
\n \
/* 加粗斜体 */\n \
.preview-theme--allblue em strong {\n \
color: #3594F7;\n \
}\n \
\n \
/* 删除线 */\n \
.preview-theme--allblue s {\n \
color: #3594F7;\n \
}\n \
\n \
/* 分隔线\n \
* 粗细、样式和颜色\n \
* border-top:1px solid #3e3e3e;\n \
*/\n \
.preview-theme--allblue hr {\n \
height: 1px;\n \
padding: 0;\n \
border: none;\n \
border-top: 2px solid #3BAAFA;\n \
}\n \
\n \
/* 图片\n \
* 宽度 width:80%;\n \
* 居中 margin:0 auto;\n \
* 居左 margin:0 0;\n \
*/\n \
.preview-theme--allblue img {\n \
border-radius: 6px;\n \
display: block;\n \
margin: 20px auto;\n \
object-fit: contain;\n \
box-shadow:2px 4px 7px #999;\n \
}\n \
\n \
/* 图片描述文字 */\n \
.preview-theme--allblue figcaption {\n \
text-align: center;\n \
display: block;\n \
font-size: 13px;\n \
color: #2b2b2b;\n \
}\n \
\n \
.preview-theme--allblue figcaption:before{\n \
content:'';\n \
background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAGFBMVEVHcExAuPtAuPpAuPtAuPpAuPtAvPxAuPokzOX5AAAAB3RSTlMAkDLqNegkoiUM7wAAAGBJREFUKM9jYBhcgMkBTUDVBE1BeDGqEtXychNUBeXlKEqACsrLQxB8lnCQQClCiWt5OYoSiAIkJVAF5eVBqAqAShTAAs7l5ShKWMwRAmAlSArASpAVgJUkCqIAscESHwCVVjMBK9JnbQAAAABJRU5ErkJggg==);\n \
display:inline-block;\n \
width:18px;\n \
height:18px;\n \
background-size:18px;\n \
background-repeat:no-repeat;\n \
background-position:center;\n \
margin-right:5px;\n \
margin-bottom:-5px;\n \
}\n \
\n \
/* 行内代码 */\n \
.preview-theme--allblue p code,\n \
.preview-theme--allblue li code {\n \
color: #3594F7;\n \
background: RGBA(59, 170, 250, .1);\n \
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
.preview-theme--allblue .code-snippet__fix {\n \
background: #f7f7f7;\n \
border-radius: 2px;\n \
}\n \
\n \
.preview-theme--allblue pre code {\n \
letter-spacing: 0px;\n \
}\n \
\n \
/*\n \
* 表格内的单元格\n \
* 字体大小 font-size: 16px;\n \
* 边框 border: 1px solid #ccc;\n \
* 内边距 padding: 5px 10px;\n \
*/\n \
.preview-theme--allblue table tr th,\n \
.preview-theme--allblue table tr td {\n \
font-size: 14px;\n \
color: #595959;\n \
}\n \
\n \
.preview-theme--allblue .footnotes {\n \
background: #F6EEFF;\n \
padding: 20px 20px 20px 20px;\n \
font-size: 14px;\n \
border: 0.8px solid #DEC6FB;\n \
border-radius: 6px;\n \
border: 1px solid #DEC6FB;\n \
}\n \
\n \
/* 脚注文字 */\n \
.preview-theme--allblue .footnote-word {\n \
font-weight: normal;\n \
color: #595959;\n \
}\n \
\n \
/* 脚注上标 */\n \
.preview-theme--allblue .footnote-ref {\n \
font-weight: normal;\n \
color: #595959;\n \
}\n \
\n \
/*脚注链接样式*/\n \
.preview-theme--allblue .footnote-item em {\n \
font-size: 14px;\n \
color: #595959;\n \
display: block;\n \
}\n \
\n \
.preview-theme--allblue .footnotes{\n \
background: RGBA(53, 148, 247, .4);\n \
padding: 20px 20px 20px 20px;\n \
font-size: 14px;\n \
border-radius: 6px;\n \
border: 1px solid RGBA(53, 148, 247, 1);\n \
}\n \
\n \
.preview-theme--allblue .footnotes-sep {\n \
border-top: unset;\n \
}\n \
\n \
/* \"参考资料\"四个字\n \
* 内容 content: \"参考资料\";\n \
*/\n \
.preview-theme--allblue .footnotes-sep:before {\n \
content: 'Reference';\n \
color: #595959;\n \
letter-spacing: 1px;\n \
border-bottom: 2px solid RGBA(64, 184, 250, 1);\n \
display: inline;\n \
background: linear-gradient(white 60%, RGBA(64, 184, 250, .4) 40%);\n \
font-size: 20px;\n \
}\n \
\n \
/* 参考资料编号 */\n \
.preview-theme--allblue .footnote-num {}\n \
\n \
/* 参考资料文字 */\n \
.preview-theme--allblue .footnote-item p {\n \
color: #595959;\n \
font-weight: bold;\n \
}\n \
\n \
/* 参考资料解释 */\n \
.preview-theme--allblue .footnote-item p em {\n \
font-weight: normal;\n \
}\n \
\n \
/* 行间公式\n \
* 最大宽度 max-width: 300% !important;\n \
*/\n \
.preview-theme--allblue .katex--display svg {}\n \
\n \
/* 行内公式\n \
*/\n \
.preview-theme--allblue .katex--inline svg {}\n \
\n \
/* \n \
 */\n \
.preview-theme--allblue pre>code {\n \
background-color: #333;\n \
color: rgba(255,255,255,0.75);\n \
}\n \
\n \
.preview-theme--allblue .language-mermaid {\n \
letter-spacing: 0;\n \
}";
document.head.appendChild(style);
}
init_preview_theme_allblue();
