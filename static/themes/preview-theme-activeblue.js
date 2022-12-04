function init_preview_theme_activeblue() {
const style = document.createElement('style');
style.id = 'preview-theme-activeblue';
style.type = 'text/css';
style.innerHTML = "/** activeblue 灵动蓝\n \
*/\n \
.preview-theme--activeblue {\n \
 color: #333;\n \
 background-color: #fff;\n \
 font-family: -apple-system,system-ui,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;\n \
}\n \
\n \
/* 标题的通用设置 */\n \
.preview-theme--activeblue h1,\n \
.preview-theme--activeblue h2,\n \
.preview-theme--activeblue h3,\n \
.preview-theme--activeblue h4,\n \
.preview-theme--activeblue h5,\n \
.preview-theme--activeblue h6 {\n \
 padding: 30px 0;\n \
 margin: 0;\n \
 color: #135ce0;\n \
}\n \
\n \
/* 一级标题 */\n \
.preview-theme--activeblue h1 {\n \
 position: relative;\n \
 margin-top: 30px;\n \
 margin-bottom: 10px;\n \
 text-align: center;\n \
}\n \
\n \
/* 一级标题前缀，用来放背景图，支持透明度控制 */\n \
.preview-theme--activeblue h1 .prefix {\n \
 display: inline-block;\n \
 top: 0;\n \
 width: 60px;\n \
 height: 60px;\n \
 background: url(https://my-wechat.mdnice.com/ape_blue.svg);\n \
 background-size: 100% 100%;\n \
 opacity: .12;\n \
}\n \
\n \
/* 一级标题内容 */\n \
.preview-theme--activeblue h1 .content {\n \
 font-size: 22px;\n \
 display: block;\n \
 margin-top: -36px;\n \
}\n \
\n \
/* 二级标题 */\n \
.preview-theme--activeblue h2 {\n \
 position: relative;\n \
   font-size: 20px;\n \
}\n \
\n \
/* 二级标题前缀，有兴趣加内容的可以魔改 */\n \
.preview-theme--activeblue h2 .prefix {\n \
\n \
}\n \
\n \
/* 二级标题内容 */\n \
.preview-theme--activeblue h2 .content {\n \
   border-left: 4px solid;\n \
 padding-left: 10px;\n \
}\n \
\n \
/* 一二级标题之间间距控制一下 */\n \
.preview-theme--activeblue h1 + h2 {\n \
 padding-top: 0;\n \
}\n \
\n \
/* 三级标题 */\n \
.preview-theme--activeblue h3 {\n \
 font-size: 16px;\n \
}\n \
\n \
/* 段落 */\n \
.preview-theme--activeblue p {\n \
 font-size: 16px;\n \
 line-height: 2;\n \
 font-weight: 400;\n \
}\n \
\n \
/* 段落间距控制 */\n \
.preview-theme--activeblue p+p {\n \
 margin-top: 16px;\n \
}\n \
\n \
/* 无序列表 */\n \
.preview-theme--activeblue ul>li ul>li {\n \
 list-style: circle;\n \
}\n \
\n \
/* 无序列表内容行高 */\n \
.preview-theme--activeblue li section {\n \
 line-height: 2;\n \
}\n \
\n \
/* 引用 */\n \
.preview-theme--activeblue blockquote {\n \
 border-left-color: #b2aec5 !important;\n \
 background: #fff9f9 !important;\n \
}\n \
\n \
/* 引用文字 */\n \
.preview-theme--activeblue blockquote p {\n \
 color: #666;\n \
 line-height: 2;\n \
}\n \
\n \
/* 链接 */\n \
.preview-theme--activeblue a {\n \
 color: #036aca;\n \
 border-bottom: 0;\n \
 font-weight: 400;\n \
 text-decoration: none;\n \
}\n \
\n \
/* 加粗 */\n \
.preview-theme--activeblue strong {\n \
 background: linear-gradient(to right ,#3299d2,#efbdb5);\n \
 color: #fff;\n \
 font-weight: 400;\n \
 padding: 0 4px;\n \
 display: inline-block;\n \
 border-radius: 4px;\n \
 margin: 0 2px;\n \
 letter-spacing: 1px;\n \
}\n \
\n \
/* 加粗斜体 */\n \
.preview-theme--activeblue em strong {\n \
 color: #fff;\n \
}\n \
\n \
/* 分隔线 */\n \
.preview-theme--activeblue hr {\n \
 border-top: 1px solid #135ce0;\n \
}\n \
\n \
/* 图片描述文字，隐藏了，如果需要，请删除display */\n \
.preview-theme--activeblue figcaption {\n \
 display: none;\n \
 opacity: .6;\n \
 margin-top: 12px;\n \
 font-size: 12px;\n \
}\n \
\n \
/* 行内代码 */\n \
.preview-theme--activeblue p code,\n \
.preview-theme--activeblue li code,\n \
.preview-theme--activeblue table code {\n \
 background-color: rgba(0,0,0,.05);\n \
 color: #1394d8;\n \
 padding: 2px 6px;\n \
 word-break: normal;\n \
}\n \
\n \
/* 表格 */\n \
.preview-theme--activeblue table {\n \
 border-spacing: 0;\n \
}\n \
\n \
/*\n \
* 表格内的单元格\n \
*/\n \
.preview-theme--activeblue table tr th {\n \
 background-color: #d4f1ff;\n \
}\n \
\n \
/* 脚注文字 */\n \
.preview-theme--activeblue .footnote-word {\n \
 color: #135ce0;\n \
 font-weight: 400;\n \
}\n \
\n \
/* 脚注上标 */\n \
.preview-theme--activeblue .footnote-ref {\n \
 color: #5ba1e2;\n \
 font-weight: 400;\n \
}\n \
\n \
/* 参考资料 */\n \
.preview-theme--activeblue .footnotes-sep:before {\n \
 text-align: center;\n \
 color: #135ce0;\n \
 content: \"参考\";\n \
}\n \
\n \
/* 参考编号 */\n \
.preview-theme--activeblue .footnote-num {\n \
 color: #666;\n \
}\n \
\n \
/* 参考文字 */\n \
.preview-theme--activeblue .footnote-item p { \n \
 color: #999;\n \
 font-weight: 700;\n \
 font-style: italic;\n \
 font-size: 13px;\n \
}\n \
\n \
/* 参考解释 */\n \
.preview-theme--activeblue .footnote-item p em {\n \
 color: #3375e2;\n \
 font-style: normal;\n \
 margin-left: 4px;\n \
}\n \
.preview-theme--activeblue pre>code {\n \
background-color: #333;\n \
color: rgba(255,255,255,0.75);\n \
}";
document.head.appendChild(style);
}
init_preview_theme_activeblue();
