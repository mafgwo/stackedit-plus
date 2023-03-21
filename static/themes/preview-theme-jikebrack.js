function init_preview_theme_jikebrack() {
const style = document.createElement('style');
style.id = 'preview-theme-jikebrack';
style.type = 'text/css';
style.innerHTML = "/*Geek black style, effective in real time*/\n \
\n \
/* Global Properties\n \
 */\n \
.preview-theme--jikebrack {\n \
color: #2b2b2b;\n \
background-color: #fff;\n \
}\n \
\n \
/* Paragraph\n \
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
/* First level header */\n \
.preview-theme--jikebrack h1 {\n \
margin-top: -0.46em;\n \
margin-bottom: 0.1em;\n \
border-bottom: 2px solid rgb(198, 196, 196);\n \
box-sizing: border-box;\n \
}\n \
\n \
/* First level header content */\n \
.preview-theme--jikebrack h1 .content {\n \
padding-top: 5px;\n \
padding-bottom: 5px;\n \
color: rgb(160, 160, 160);\n \
font-size: 13px;\n \
line-height: 2;\n \
box-sizing: border-box;\n \
}\n \
\n \
/* First level header decoration */\n \
.preview-theme--jikebrack h1:after {\n \
}\n \
\n \
/* Secondary header */\n \
.preview-theme--jikebrack h2 {\n \
margin: 10px auto;\n \
height: 40px;\n \
background-color: rgb(251, 251, 251);\n \
border-bottom: 1px solid rgb(246, 246, 246);\n \
overflow: hidden;\n \
box-sizing: border-box;\n \
}\n \
\n \
/* Secondary header content */\n \
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
/* Secondary header decoration */\n \
.preview-theme--jikebrack h2:after {\n \
}\n \
\n \
/* Third level header */\n \
.preview-theme--jikebrack h3 {\n \
margin: 20px auto 5px;\n \
border-top: 1px solid rgb(221, 221, 221);\n \
box-sizing: border-box;\n \
}\n \
\n \
/* Third level header content */\n \
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
/* Third level header decoration */\n \
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
/* Unordered List Overall Style\n \
 * list-style-type: square|circle|disc;\n \
 */\n \
.preview-theme--jikebrack ul {\n \
}\n \
\n \
/* Ordered List Overall Style\n \
 * list-style-type: upper-roman|lower-greek|lower-alpha;\n \
 */\n \
.preview-theme--jikebrack ol {\n \
}\n \
\n \
/* List content, do not set li\n \
 */\n \
.preview-theme--jikebrack li section {\n \
font-size: 15px;\n \
font-family: \"Helvetica Neue\", Helvetica, \"Segoe UI\", Arial, freesans, sans-serif;\n \
}\n \
\n \
/* blockquote\n \
 * Left Edge Color border-left-color: black;\n \
 * background: gray;\n \
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
/* blockquote words */\n \
.preview-theme--jikebrack blockquote p {\n \
font-size: 15px;\n \
font-family: -apple-system-font, BlinkMacSystemFont, \"Helvetica Neue\", \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei UI\", \"Microsoft YaHei\", Arial, sans-serif;\n \
color: rgb(119, 119, 119);\n \
line-height: 1.75em;\n \
}\n \
\n \
/* Link \n \
 * border-bottom: 1px solid #009688;\n \
 */\n \
.preview-theme--jikebrack a {\n \
color: rgb(239, 112, 96);\n \
border-bottom: 1px solid rgb(239, 112, 96);\n \
}\n \
\n \
/* Bold */\n \
.preview-theme--jikebrack strong {\n \
}\n \
\n \
/* Italic */\n \
.preview-theme--jikebrack em {\n \
}\n \
\n \
/* Bold Italic */\n \
.preview-theme--jikebrack em strong {\n \
}\n \
\n \
/* Strikethrough */\n \
.preview-theme--jikebrack s {\n \
}\n \
\n \
/* Divider line\n \
 * Thickness, style, and color\n \
 * border-top: 1px solid #3e3e3e;\n \
 */\n \
.preview-theme--jikebrack hr {\n \
}\n \
\n \
.preview-theme--jikebrack img {\n \
}\n \
\n \
/* Picture description text */\n \
.preview-theme--jikebrack figcaption {\n \
}\n \
\n \
/* in-line code */\n \
.preview-theme--jikebrack p code,.preview-theme--jikebrack li code {\n \
color: rgb(239, 112, 96) !important;\n \
background-color: rgba(27,31,35,.05) !important;\n \
}\n \
\n \
/* Non WeChat code block\n \
 * Code block does not wrap display: -webkit-box !important;\n \
 * Code Block Wrap display: block;\n \
 */\n \
.preview-theme--jikebrack pre code {\n \
}\n \
\n \
/*\n \
 * Cells within a table\n \
 * Font size  font-size: 16px;\n \
 * Border  border: 1px solid #ccc;\n \
 * Padding  padding: 5px 10px;\n \
 */\n \
.preview-theme--jikebrack table tr th,\n \
.preview-theme--jikebrack table tr td {\n \
}\n \
\n \
/* Footnote word */\n \
.preview-theme--jikebrack .footnote-word {\n \
color: #ff3502;\n \
}\n \
\n \
/* Footnote reference */\n \
.preview-theme--jikebrack .footnote-ref {\n \
color: rgb(239, 112, 96);\n \
}\n \
\n \
/* \"Reference material\" Four words \n \
 * Content  content: \"Reference material\";\n \
 */\n \
.preview-theme--jikebrack .footnotes-sep:before {\n \
}\n \
\n \
/* Reference material number */\n \
.preview-theme--jikebrack .footnote-num {\n \
}\n \
\n \
/* Reference material words */\n \
.preview-theme--jikebrack .footnote-item p { \n \
}\n \
\n \
/* Reference material Interpretation */\n \
.preview-theme--jikebrack .footnote-item p em {\n \
}\n \
\n \
/* Interline formula\n \
 * Maximum width max-width: 300% !important;\n \
 */\n \
.preview-theme--jikebrack .block-equation svg {\n \
}\n \
\n \
/* Inline Formula\n \
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
