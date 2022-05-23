# StackEdit

从 [StackEdit 官方](https://github.com/benweet/stackedit) fork出来，然后加上了 **Gitee** 的支持，并且已经重新打了镜像，以下官方的部署方式，除了Docker镜像地址不同，其他均一致。

Fork出来修改的原因：Stackedit的作者可能因为什么原因，已经很久不维护了，Github授权登录很早之前就登录不了了，并且还没发支持国内常用的Gitee，比较蛋疼，所以想到Fork出来改，大概花了周末一整天终于改好了。

新的Docker镜像在中央仓库为：mafgwo/stackedit，当前最新版本为：5.15.2（延续原有版本号）

并增加了以下三个环境变量：
- `GITEE_CLIENT_ID` Gitee 的 Client ID
- `GITEE_CLIENT_SECRET` Gitee 的 Client Secret
- `GITEE_CALLBACK` Gitee的回调地址，Gitee授权获取token时还需要传入回调地址，格式是 http[s]://[hostname]:[port]/oauth2/callback


[![Build Status](https://img.shields.io/travis/benweet/stackedit.svg?style=flat)](https://travis-ci.org/benweet/stackedit) [![NPM version](https://img.shields.io/npm/v/stackedit.svg?style=flat)](https://www.npmjs.org/package/stackedit)

> Full-featured, open-source Markdown editor based on PageDown, the Markdown library used by Stack Overflow and the other Stack Exchange sites.

https://edit.qicoder.com/

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
