# 大文档导出PDF方式说明
> 由于大文档导出PDF，需要消费非常多的服务器资源，而且很容易导致导出超时，故导出PDF的MD文档过大时，可以使用 **[wkhtmltopdf](https://wkhtmltopdf.org/downloads.html)** 工具导出。

# 操作步骤
- 先在 **[StackEdit中文版](https://stackedit.cn/app)** 中使用 `导出为HTML` 功能导出MD文档，导出后可以得到一个HTML文档。
- 到 **[wkhtmltopdf](https://wkhtmltopdf.org/downloads.html)** 官网下载安装程序。
- 使用 wkhtmltopdf 的导出PDF的命令 `wkhtmltopdf [GLOBAL OPTION]... [OBJECT]... <output file>` 把HTML导出为PDF，如简单的导出命令：`wkhtmltopdf test.html test.pdf`，具体的 `GLOBAL OPTION` 参数说明可以通过 `wkhtmltopdf -H` 查看帮助文档。



