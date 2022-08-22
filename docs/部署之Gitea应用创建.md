# Gitea应用配置说明

> StackEdit中文版支持Gitea，则需要到Gitea创建一个应用，在StackEdit中文版绑定Gitea账号的时候填入。


# 如何创建Gitea应用

按下面图的指示创建


![](../images/gitea/gitea01.pngg)

![](../images/gitea/gitea02.pngg)

![](../images/gitea/gitea03.pngg)

![](../images/gitea/gitea04.pngg)

创建成功后即可看到应用ID 和 应用秘钥。

# Gitea跨域问题

由于StackEdit中文版是从浏览器直接访问Gitea接口，故个人部署的Gitea需要支持跨域，至于如何支持跨域，请参考官方文档：https://docs.gitea.io/en-us/config-cheat-sheet/#cors-cors
