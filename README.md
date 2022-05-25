# StackEdit

从 [StackEdit 官方](https://github.com/benweet/stackedit) fork出来，然后加上了 **Gitee** 的支持，并且已经重新打了镜像，以下官方的部署方式，除了Docker镜像地址不同，其他均一致。

### Fork出来修改的原因
StackEdit的作者可能因为什么原因，已经很久不维护了，Github授权登录很早之前就登录不了了，并且还没法支持国内常用的Gitee，比较蛋疼，所以想到Fork出来改，大概花了周末一整天终于改好了。

新的Docker镜像在中央仓库为：[mafgwo/stackedit](https://hub.docker.com/r/mafgwo/stackedit)，当前最新版本为：5.15.3（延续原有版本号）

并增加了以下三个环境变量：
- `GITEE_CLIENT_ID` Gitee 的 Client ID
- `GITEE_CLIENT_SECRET` Gitee 的 Client Secret

### TODO: 关于后续的一些想法
- 支持**Gitea**、**Gogs**两个轻量级且适于自建的Git仓库（毕竟Gitlab对机器配置要求较高）。想支持这两个主要也是考虑到其实很多公司已经禁用了Github或Gitee仓库，在公司都没法连上自己的Git仓库。
- 汉化，毕竟大家最熟悉的还是母语，并且该编辑器功能页面也不多，汉化工作量并不会很大。
- 引入mdnice，右边预览增加mdnice预览选项，主要含选主题(含mdnice常用20多个主题)、支持自定义主题、复制到公众号、复制到知乎、复制到稀土掘金等基本功能，便于喜欢写公众号、博客的你可以更好更快的排版。
- ... 另外，朋友们有好的想法也可以在Issue或者加我微信 qicoding 提给我。

#### TODO 进度

**已支持Gitea (2022-05-25)**

对应Docker版本：5.15.3, tag: 5.15.3


### 目前已部署地址
https://edit.qicoder.com/ 

该地址可以作为试用或长期使用，本人承诺绝对没采集任何人的Token等敏感信息，不需要担心私有仓库泄漏。


# 以下是官方原有README内容

[![Build Status](https://img.shields.io/travis/benweet/stackedit.svg?style=flat)](https://travis-ci.org/benweet/stackedit) [![NPM version](https://img.shields.io/npm/v/stackedit.svg?style=flat)](https://www.npmjs.org/package/stackedit)

> Full-featured, open-source Markdown editor based on PageDown, the Markdown library used by Stack Overflow and the other Stack Exchange sites.

https://stackedit.io/

### Ecosystem

- [Chrome app](https://chrome.google.com/webstore/detail/iiooodelglhkcpgbajoejffhijaclcdg)
- NEW! Embed StackEdit in any website with [stackedit.js](https://github.com/benweet/stackedit.js)
- NEW! [Chrome extension](https://chrome.google.com/webstore/detail/ajehldoplanpchfokmeempkekhnhmoha) that uses stackedit.js
- [Community](https://community.stackedit.io/)

### Build

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### Deploy with Helm

StackEdit Helm chart allows easy StackEdit deployment to any Kubernetes cluster.
You can use it to configure deployment with your existing ingress controller and cert-manager.

```bash
# Add the StackEdit Helm repository
helm repo add stackedit https://benweet.github.io/stackedit-charts/

# Update your local Helm chart repository cache
helm repo update

# Deploy StackEdit chart to your cluster
helm install --name stackedit stackedit/stackedit \
  --set dropboxAppKey=$DROPBOX_API_KEY \
  --set dropboxAppKeyFull=$DROPBOX_FULL_ACCESS_API_KEY \
  --set googleClientId=$GOOGLE_CLIENT_ID \
  --set googleApiKey=$GOOGLE_API_KEY \
  --set githubClientId=$GITHUB_CLIENT_ID \
  --set githubClientSecret=$GITHUB_CLIENT_SECRET \
  --set wordpressClientId=\"$WORDPRESS_CLIENT_ID\" \
  --set wordpressSecret=$WORDPRESS_CLIENT_SECRET
```

Later, to upgrade StackEdit to the latest version:

```bash
helm repo update
helm upgrade stackedit stackedit/stackedit
```

If you want to uninstall StackEdit:

```bash
helm delete --purge stackedit
```

If you want to use your existing ingress controller and cert-manager issuer:

```bash
# See https://docs.cert-manager.io/en/latest/tutorials/acme/quick-start/index.html
helm install --name stackedit stackedit/stackedit \
  --set dropboxAppKey=$DROPBOX_API_KEY \
  --set dropboxAppKeyFull=$DROPBOX_FULL_ACCESS_API_KEY \
  --set googleClientId=$GOOGLE_CLIENT_ID \
  --set googleApiKey=$GOOGLE_API_KEY \
  --set githubClientId=$GITHUB_CLIENT_ID \
  --set githubClientSecret=$GITHUB_CLIENT_SECRET \
  --set wordpressClientId=\"$WORDPRESS_CLIENT_ID\" \
  --set wordpressSecret=$WORDPRESS_CLIENT_SECRET \
  --set ingress.enabled=true \
  --set ingress.annotations."kubernetes\.io/ingress\.class"=nginx \
  --set ingress.annotations."cert-manager\.io/cluster-issuer"=letsencrypt-prod \
  --set ingress.hosts[0].host=stackedit.example.com \
  --set ingress.hosts[0].paths[0]=/ \
  --set ingress.tls[0].secretName=stackedit-tls \
  --set ingress.tls[0].hosts[0]=stackedit.example.com
```
