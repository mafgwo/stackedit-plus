function init_preview_theme_ningyezi() {
const style = document.createElement('style');
style.id = 'preview-theme-ningyezi';
style.type = 'text/css';
style.innerHTML = "/*ningyezi\n \
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
/* Paragraph, the parameters not marked below are the same as here\n \
  */\n \
.preview-theme--ningyezi p {\n \
  margin: 10px 0px;\n \
  letter-spacing: 2px;\n \
  font-size: 14px;\n \
  word-spacing: 2px;\n \
}\n \
\n \
/* First level header */\n \
.preview-theme--ningyezi h1 {\n \
  font-size: 25px;\n \
}\n \
\n \
/* First level header content */\n \
.preview-theme--ningyezi h1 .content {\n \
  display: inline-block;\n \
  font-weight: bold;\n \
  color: #773098;\n \
}\n \
\n \
/* First level header decoration */\n \
.preview-theme--ningyezi h1:after {}\n \
\n \
/* Secondary header */\n \
.preview-theme--ningyezi h2 {\n \
  text-align: left;\n \
  margin: 20px 10px 0px 0px;\n \
}\n \
\n \
/* Secondary header content */\n \
.preview-theme--ningyezi h2 .content {\n \
  font-size: 18px;\n \
  font-weight: bold;\n \
  display: inline-block;\n \
  padding-left: 10px;\n \
  border-left: 5px solid #916dd5;\n \
}\n \
\n \
/* Secondary header decoration */\n \
.preview-theme--ningyezi h2:after {}\n \
\n \
/* Third level header */\n \
.preview-theme--ningyezi h3 {\n \
  font-size: 16px;\n \
  font-weight: bold;\n \
  text-align: center;\n \
}\n \
\n \
/* Third level header content */\n \
.preview-theme--ningyezi h3 .content {\n \
  border-bottom: 2px solid #d89cf6;\n \
}\n \
\n \
/* Third level header decoration */\n \
.preview-theme--ningyezi h3:after {}\n \
\n \
/* Unordered List Overall Style\n \
  * list-style-type: square|circle|disc;\n \
  */\n \
.preview-theme--ningyezi ul {\n \
  font-size: 15px;\n \
 \n \
  list-style-type: circle;\n \
}\n \
\n \
\n \
/* Ordered List Overall Style\n \
  * list-style-type: upper-roman|lower-greek|lower-alpha;\n \
  */\n \
.preview-theme--ningyezi ol {\n \
  font-size: 15px;\n \
}\n \
\n \
/* List content, do not set li\n \
  */\n \
.preview-theme--ningyezi li section {\n \
  font-size: 14px;\n \
  font-weight: normal;\n \
}\n \
\n \
/* blockquote\n \
  * Left Edge Color border-left-color:black;\n \
  * background:gray;\n \
  */\n \
.preview-theme--ningyezi blockquote {\n \
  color: rgba(0,0,0,0.5) !important;\n \
  border-left-color: #d89cf6 !important;\n \
  background: #f4eeff !important;\n \
}\n \
\n \
/* Link \n \
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
/* Bold */\n \
.preview-theme--ningyezi strong {\n \
  color: #916dd5;\n \
  font-weight: bold;\n \
}\n \
\n \
.preview-theme--ningyezi strong::after {\n \
  content: '」';\n \
}\n \
\n \
/* Italic */\n \
.preview-theme--ningyezi em {\n \
  font-style: normal;\n \
  color: #916dd5;\n \
}\n \
\n \
/* Bold Italic */\n \
.preview-theme--ningyezi em strong {\n \
  color: #916dd5;\n \
}\n \
\n \
/* Strikethrough */\n \
.preview-theme--ningyezi del {\n \
  color: #916dd5;\n \
}\n \
\n \
/* Divider line\n \
  * Thickness, style, and color\n \
  */\n \
.preview-theme--ningyezi hr {\n \
  height: 1px;\n \
  padding: 0;\n \
  border: none;\n \
  border-top: 2px solid #d9b8fa;\n \
}\n \
\n \
.preview-theme--ningyezi img {\n \
  border-radius: 6px;\n \
  display: block;\n \
  margin: 20px auto;\n \
  object-fit: contain;\n \
  box-shadow: 2px 4px 7px #999;\n \
}\n \
\n \
/* Picture description text */\n \
.preview-theme--ningyezi figcaption {\n \
  display: block;\n \
  font-size: 13px;\n \
}\n \
\n \
/* in-line code */\n \
.preview-theme--ningyezi p code,\n \
.preview-theme--ningyezi li code,\n \
.preview-theme--ningyezi table code {\n \
  color: #916dd5;\n \
  font-weight: bolder;\n \
  background: none;\n \
}\n \
\n \
/* Non WeChat code block\n \
  * Code block does not wrap display:-webkit-box !important;\n \
  * Code Block Wrap display:block;\n \
  */\n \
.preview-theme--ningyezi .code-snippet__fix {\n \
  background: #f7f7f7;\n \
  border-radius: 2px;\n \
}\n \
\n \
.preview-theme--ningyezi pre code {}\n \
\n \
/*\n \
  * Cells within a table\n \
  * Font size  font-size: 16px;\n \
  * Border  border: 1px solid #ccc;\n \
  * Padding  padding: 5px 10px;\n \
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
/* Footnote word */\n \
.preview-theme--ningyezi .footnote-word {\n \
  font-weight: normal;\n \
  color: #916dd5;\n \
  font-weight: bold;\n \
}\n \
\n \
/* Footnote reference */\n \
.preview-theme--ningyezi .footnote-ref {\n \
  font-weight: normal;\n \
  color: #916dd5;\n \
}\n \
\n \
/*Footnote Link Style*/\n \
.preview-theme--ningyezi .footnote-item em {\n \
  font-size: 14px;\n \
  color: #916dd5;\n \
  display: block;\n \
}\n \
\n \
/* \"Reference material\" Four words \n \
  * Content  content: \"Reference material\";\n \
  */\n \
.preview-theme--ningyezi .footnotes-sep:before {\n \
  font-size: 20px;\n \
}\n \
\n \
/* Reference material number */\n \
.preview-theme--ningyezi .footnote-num {\n \
  color: #916dd5;\n \
}\n \
\n \
/* Reference material words */\n \
.preview-theme--ningyezi .footnote-item p {\n \
  color: #916dd5;\n \
  font-weight: bold;\n \
}\n \
\n \
/* Reference material Interpretation */\n \
.preview-theme--ningyezi .footnote-item p em {\n \
  font-weight: normal;\n \
}\n \
\n \
/* Interline formula\n \
  * Maximum width max-width: 300% !important;\n \
  */\n \
.preview-theme--ningyezi .block-equation svg {}\n \
\n \
/* Inline Formula\n \
  */\n \
.preview-theme--ningyezi .inline-equation svg {}\n \
.preview-theme--ningyezi pre>code {\n \
background-color: #333;\n \
color: rgba(255,255,255,0.75);\n \
}";
document.head.appendChild(style);
}
init_preview_theme_ningyezi();
