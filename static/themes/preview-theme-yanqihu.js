function init_preview_theme_yanqihu() {
const style = document.createElement('style');
style.id = 'preview-theme-yanqihu';
style.type = 'text/css';
style.innerHTML = "/* yanqihu\n \
*/\n \
.preview-theme--yanqihu {\n \
 color: #2b2b2b;\n \
 background-color: #fff;\n \
 counter-reset: counterh1 counterh2 counterh3;\n \
}\n \
\n \
/* Paragraph, the parameters not marked below are the same as here\n \
*/\n \
.preview-theme--yanqihu p {\n \
}\n \
\n \
/* First level header */\n \
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
/* First level header content */\n \
.preview-theme--yanqihu h1 .content {\n \
 color: rgb(37,132,181);\n \
 margin-left: 8px;\n \
 font-size: 20px;\n \
}\n \
\n \
/* First level header prefix */\n \
.preview-theme--yanqihu h1 .prefix {\n \
}\n \
\n \
/* First level header suffix */\n \
.preview-theme--yanqihu h1 .suffix {\n \
}\n \
\n \
/* Secondary header */\n \
.preview-theme--yanqihu h2 {\n \
}\n \
\n \
/* Secondary header content */\n \
.preview-theme--yanqihu h2 .content {\n \
 font-size: 18px;\n \
 border-bottom: 4px solid rgb(37,132,181);\n \
 padding: 2px 4px;\n \
 color: rgb(37,132,181);\n \
}\n \
\n \
/* Secondary header prefix */\n \
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
/* Secondary header suffix */\n \
.preview-theme--yanqihu h2 .suffix {\n \
}\n \
\n \
.preview-theme--yanqihu h1:after, .preview-theme--yanqihu h2:after {\n \
   border-bottom: unset;\n \
}\n \
\n \
/* Third level header */\n \
.preview-theme--yanqihu h3 {\n \
}\n \
\n \
/* Third level header content */\n \
.preview-theme--yanqihu h3 .content {\n \
 font-size: 16px;\n \
 border-bottom: 1px solid rgb(37,132,181);\n \
 padding: 2px 10px;\n \
 color: rgb(37,132,181);\n \
}\n \
\n \
/* Third level header prefix */\n \
.preview-theme--yanqihu h3 .prefix {\n \
 display:inline-block;\n \
 background:linear-gradient(45deg, transparent 48%, rgb(37,132,181) 48%, \n \
           rgb(37,132,181) 52%, transparent 52%);\n \
 width:24px;\n \
 height:24px;\n \
 margin-bottom: -7px;\n \
}\n \
\n \
/* Third level header suffix */\n \
.preview-theme--yanqihu h3 .suffix {\n \
}\n \
\n \
/* Unordered List Overall Style\n \
* list-style-type: square|circle|disc;\n \
*/\n \
.preview-theme--yanqihu ul {\n \
}\n \
\n \
/* Ordered List Overall Style\n \
* list-style-type: upper-roman|lower-greek|lower-alpha;\n \
*/\n \
.preview-theme--yanqihu ol {\n \
}\n \
\n \
/* List content, do not set li\n \
*/\n \
.preview-theme--yanqihu li section {\n \
}\n \
\n \
/* First level blockquote\n \
* Left Edge Color border-left-color: black;\n \
* background: gray;\n \
*/\n \
.preview-theme--yanqihu blockquote {\n \
 color: rgba(0,0,0,0.5) !important;\n \
 border: 1px dashed rgb(37,132,181) !important;\n \
 background: transparent !important;\n \
}\n \
\n \
/* First level blockquote words */\n \
.preview-theme--yanqihu blockquote p {\n \
}\n \
\n \
/* Secondary level blockquote\n \
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
/* Secondary level blockquote words */\n \
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
/* Thrid level blockquote\n \
*/\n \
.preview-theme--yanqihu .multiquote-3 {\n \
}\n \
\n \
/* Thrid level blockquote words */\n \
.preview-theme--yanqihu .multiquote-3 p {\n \
}\n \
\n \
/* Link \n \
* border-bottom: 1px solid #009688;\n \
*/\n \
.preview-theme--yanqihu a {\n \
 color:rgb(37,132,181);\n \
 border-bottom: 1px solid rgb(37,132,181);\n \
}\n \
\n \
/* Bold */\n \
.preview-theme--yanqihu strong {\n \
 color: rgb(37,132,181);\n \
}\n \
\n \
/* Italic */\n \
.preview-theme--yanqihu em {\n \
 color: rgb(37,132,181);\n \
}\n \
\n \
/* Bold Italic */\n \
.preview-theme--yanqihu em strong {\n \
 color: rgb(37,132,181);\n \
}\n \
\n \
/* Strikethrough */\n \
.preview-theme--yanqihu del {\n \
}\n \
\n \
/* Divider line\n \
* Thickness, style, and color\n \
* border-top: 1px solid #3e3e3e;\n \
*/\n \
.preview-theme--yanqihu hr {\n \
 border-top: 1px solid rgb(37,132,181);\n \
}\n \
\n \
.preview-theme--yanqihu img {\n \
}\n \
\n \
/* Picture description text */\n \
.preview-theme--yanqihu figcaption {\n \
}\n \
\n \
/* in-line code */\n \
.preview-theme--yanqihu p code,\n \
.preview-theme--yanqihu li code,\n \
.preview-theme--yanqihu table code {\n \
 background-color: rgba(0,0,0,.05);\n \
}\n \
\n \
/* \n \
* Code block does not wrap display: -webkit-box !important;\n \
* Code Block Wrap display: block;\n \
*/\n \
.preview-theme--yanqihu pre code {\n \
}\n \
\n \
/*\n \
* Cells within a table\n \
* Font size  font-size: 16px;\n \
* Border  border: 1px solid #ccc;\n \
* Padding  padding: 5px 10px;\n \
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
* Column width control for a column table\n \
* n Can be modified to a specific number, indicating all columns if not modified\n \
* Minimum column width min-width: 85px;\n \
*/\n \
.preview-theme--yanqihu table tr th:nth-of-type(n),\n \
.preview-theme--yanqihu table tr td:nth-of-type(n){\n \
}\n \
\n \
.preview-theme--yanqihu table tr:nth-of-type(2n) {\n \
 background-color: rgb(248,222,203);\n \
}\n \
/* Footnote word */\n \
.preview-theme--yanqihu .footnote-word {\n \
 color:rgb(37,132,181);\n \
}\n \
\n \
/* Footnote reference */\n \
.preview-theme--yanqihu .footnote-ref {\n \
 color:rgb(37,132,181);\n \
}\n \
\n \
/* \"Reference material\" Four words \n \
* Content  content: \"Reference material\";\n \
*/\n \
.preview-theme--yanqihu .footnotes-sep:before {\n \
}\n \
\n \
/* Reference material number */\n \
.preview-theme--yanqihu .footnote-num {\n \
}\n \
\n \
/* Reference material words */\n \
.preview-theme--yanqihu .footnote-item p { \n \
}\n \
\n \
/* Reference material Interpretation */\n \
.preview-theme--yanqihu .footnote-item p em {\n \
}\n \
\n \
/* Interline formula\n \
* Maximum width max-width: 300% !important;\n \
*/\n \
.preview-theme--yanqihu .block-equation svg {\n \
}\n \
\n \
/* Inline Formula\n \
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
