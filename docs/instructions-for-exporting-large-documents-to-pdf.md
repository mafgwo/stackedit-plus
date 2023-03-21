# Instructions for exporting large documents to PDF
> Due to the fact that exporting large documents to PDF requires a significant amount of server resources and can easily lead to export timeouts, when exporting a PDF with an MD document that is too large, you can use **[wkhtmltopdf](https://wkhtmltopdf.org/downloads.html)** Tool export.

# Operating Steps
- Start with **[StackEdit+](https://stackedit.net/app)** Use the 'Export as HTML' function to export an MD document. After exporting, you can obtain an HTML document.
- To **[wkhtmltopdf](https://wkhtmltopdf.org/downloads.html)** download the installer from the official website.
- Commands for Exporting PDF Using wkhtmltopdf `wkhtmltopdf [GLOBAL OPTION] [OBJECT]... <Output file>` Export HTML to PDF, such as a simple export command: 'wkhtmltopdf test.html test.pdf'. For specific 'GLOBAL OPTION' parameter descriptions, you can view the help document through 'wkhtmltopdf - H'.



