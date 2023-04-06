function init_preview_theme_simplebrack() {
const style = document.createElement('style');
style.id = 'preview-theme-simplebrack';
style.type = 'text/css';
style.innerHTML = "/* Global Properties\n \
 * padding: 30px;\n \
 * font-family: ptima-Regular;\n \
 * word-break: break-all;\n \
 */\n \
 .preview-theme--simplebrack {\n \
font-size:14px;\n \
padding:10px;\n \
color: #2b2b2b;\n \
background-color: #fff;\n \
}\n \
\n \
/*Prompt under image*/\n \
.preview-theme--simplebrack figcaption{\n \
font-size:12px;\n \
}\n \
.preview-theme--simplebrack .imageflow-caption{\n \
font-size:12px;\n \
}\n \
\n \
/* Paragraph, the parameters not marked below are the same as here\n \
 */\n \
.preview-theme--simplebrack p {\n \
font-size:14px;\n \
}\n \
\n \
/* First level header */\n \
.preview-theme--simplebrack h1 {\n \
}\n \
\n \
/* First level header content */\n \
.preview-theme--simplebrack h1 .content {\n \
}\n \
\n \
/* First level header prefix */\n \
.preview-theme--simplebrack h1 .prefix {\n \
}\n \
\n \
/* First level header suffix */\n \
.preview-theme--simplebrack h1 .suffix{\n \
}\n \
\n \
/* Secondary header */\n \
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
/* Secondary header content */\n \
.preview-theme--simplebrack h2 .content {\n \
display: block;\n \
-webkit-box-reflect: below 0em -webkit-gradient(linear,left top,left bottom, from(rgba(0,0,0,0)),to(rgba(255,255,255,0.1)));\n \
}\n \
.preview-theme--simplebrack h2 strong {\n \
}\n \
/* Secondary header prefix */\n \
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
/* Secondary header suffix */\n \
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
/* Third level header */\n \
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
/* Third level header content */\n \
.preview-theme--simplebrack h3 .content {\n \
}\n \
\n \
/* Third level header prefix */\n \
.preview-theme--simplebrack h3 .prefix {\n \
}\n \
\n \
/* Third level header suffix */\n \
.preview-theme--simplebrack h3 .suffix {\n \
}\n \
\n \
/* Unordered List Overall Style\n \
 * list-style-type: square|circle|disc;\n \
 */\n \
.preview-theme--simplebrack ul {\n \
list-style-type: square;\n \
}\n \
/* Unordered secondary list\n \
 */\n \
.preview-theme--simplebrack ul li ul li{\n \
list-style-type: circle;\n \
}\n \
\n \
/* Ordered List Overall Style\n \
 * list-style-type: upper-roman|lower-greek|lower-alpha;\n \
 */\n \
.preview-theme--simplebrack ol {\n \
}\n \
\n \
/* List content, do not set li\n \
 */\n \
.preview-theme--simplebrack li section {\n \
}\n \
\n \
/* blockquote\n \
 * Left Edge Color border-left-color: black;\n \
 * background: gray;\n \
 */\n \
.preview-theme--simplebrack blockquote {\n \
border-left: 3px solid rgba(0, 0, 0, 0.65) !important;\n \
border-right: 1px solid rgba(0, 0, 0, 0.65) !important;\n \
background: rgb(249, 249, 249) !important;\n \
color: rgba(0,0,0,0.5) !important;\n \
}\n \
\n \
/* blockquote words */\n \
.preview-theme--simplebrack blockquote p {\n \
}\n \
\n \
/* Link \n \
 * border-bottom: 1px solid #009688;\n \
 */\n \
.preview-theme--simplebrack a {\n \
}\n \
\n \
/* Bold */\n \
.preview-theme--simplebrack strong {\n \
}\n \
\n \
/* Italic */\n \
.preview-theme--simplebrack em {\n \
}\n \
\n \
/* Bold Italic */\n \
.preview-theme--simplebrack em strong {\n \
}\n \
\n \
/* Strikethrough */\n \
.preview-theme--simplebrack del {\n \
}\n \
\n \
/* Divider line\n \
 * Thickness, style, and color\n \
 * border-top: 1px solid #3e3e3e;\n \
 */\n \
.preview-theme--simplebrack hr {\n \
}\n \
\n \
.preview-theme--simplebrack img {\n \
box-shadow: rgba(170, 170, 170, 0.48) 0px 0px 6px 0px;\n \
border-radius:4px;\n \
margin-top:10px;\n \
}\n \
/* in-line code */\n \
.preview-theme--simplebrack p code, .preview-theme--simplebrack li code {\n \
color:#ff6441;\n \
background-color: rgba(27,31,35,.05) !important;\n \
}\n \
\n \
/* Non WeChat code block\n \
 * Code block does not wrap display: -webkit-box !important;\n \
 * Code Block Wrap display: block;\n \
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
 * Cells within a table\n \
 * Font size  font-size: 16px;\n \
 * Border  border: 1px solid #ccc;\n \
 * Padding  padding: 5px 10px;\n \
 */\n \
.preview-theme--simplebrack table tr th,\n \
.preview-theme--simplebrack table tr td {\n \
font-size:14px;\n \
}\n \
\n \
/* Footnote word */\n \
.preview-theme--simplebrack .footnote-word {\n \
}\n \
\n \
/* Footnote reference */\n \
.preview-theme--simplebrack .footnote-ref {\n \
}\n \
\n \
/* \"Reference material\" Four words \n \
 * Content  content: \"Reference material\";\n \
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
content:'Reference material';\n \
}\n \
.preview-theme--simplebrack .footnotes{\n \
border-left:5px solid #eee;\n \
padding-left:10px;\n \
}\n \
\n \
/* Reference material number */\n \
.preview-theme--simplebrack .footnote-num {\n \
font-size:14px;\n \
color:#999;\n \
}\n \
\n \
/* Reference material words */\n \
.preview-theme--simplebrack .footnote-item p { \n \
font-size:14px;\n \
color:#999;\n \
}\n \
\n \
/* Reference material Interpretation */\n \
.preview-theme--simplebrack .footnote-item p em {\n \
font-size:14px;\n \
color:#999;\n \
}\n \
\n \
/* Interline formula\n \
 * Maximum width max-width: 300% !important;\n \
 */\n \
.preview-theme--simplebrack .block-equation svg {\n \
}\n \
\n \
/* Inline Formula\n \
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
/* Slice image */\n \
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
