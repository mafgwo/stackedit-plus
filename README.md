<h1 align="center" style="text-align:center;">
<img src="chrome-app/icon-512.png" width="128" />
<br />
StackEdit中文版
</h1>
<p align="center">
	<strong>笔记利器，在线Markdown编辑器。</strong><br>
  如果你喜欢该项目，请点一下Star，您的肯定是作者最大的动力！
</p>
<p align="center">
	<a href="https://stackedit.cn/">https://stackedit.cn</a>
</p>
<p align="center">
    <a target="_blank" href="https://www.apache.org/licenses/LICENSE-2.0.txt">
		<img src="https://img.shields.io/:license-Apache2-blue.svg" alt="Apache 2" />
	</a>
    <a target="_blank" href="https://hub.docker.com/r/mafgwo/stackedit">
		<img src="https://img.shields.io/docker/pulls/mafgwo/stackedit.svg" alt="Docker Pulls" />
	</a>
    <a target="_blank" href='https://gitee.com/mafgwo/stackedit/stargazers'>
		<img src='https://gitee.com/mafgwo/stackedit/badge/star.svg' alt='gitee star'/>
	</a>
</p>
<br/>
<p align="center">
	<a target="_blank" href="https://jq.qq.com/?_wv=1027&k=wUSCNqmN">
	<img src="https://img.shields.io/badge/QQ交流群-703187410-orange"/></a>
</p>
<hr />
1 笔记支持Gitee、GitHub、Gitea等Git仓库存储。<br>
2 支持直接上传图片，也支持多种外部图床（GitHub、Gitea、SM.MS、自定义图床）粘贴或拖拽上传。<br>
3 编辑区域支持选择主题或自定义，总有你喜欢的主题。<br>
4 支持历史版本管理，不用担心编辑覆盖后无法回滚。<br>
5 支持KaTeX数学表达式、Mermaid UML图、乐谱等扩展。
<hr />

## 截图

**亮暗主题切换、编辑主题切换**
![](./images/theme.gif)

**支持的文档空间**
![](./images/workspace.png)

**拖拽粘贴上传图片**
![](./images/uploadimg.gif)

**支持文档搜索**
![](./images/search.gif)

## 相比国外开源版本的区别：
- 修复了Github授权登录问题
- 支持了Gitee仓库（2022-05-25）
- 支持了Gitea仓库（2022-05-25）
- 汉化（2022-06-01）
- 主文档空间从GoogleDrive切换为Gitee（2022-06-04）
- 支持SM.MS图床粘贴/拖拽图片自动上传（2022-07-01）
- 支持Gitea图床粘贴/拖拽图片自动上传（2022-07-02）
- 支持自定义图床粘贴/拖拽图片自动上传（2022-07-04）
- 支持GitHub图床粘贴/拖拽图片自动上传（2022-07-31）
- 支持了右上角一键切换主题，补全了深色主题的样式（2022-08-07）
- 编辑与预览区域样式优化（2022-08-10）
- 左边栏文件资源管理支持搜索文件（2022-08-17）
- 支持[TOC]目录（2022-09-04）
- 发布支持填写提交信息[针对Gitee、GitHub、Gitea、Gitlab]（2022-09-10）
- 支持文档空间关闭自动同步[针对Gitee、GitHub、Gitea、Gitlab]，关闭后可自定义提交信息（2022-09-23）
- Gitea支持后端配置指定应用ID和Secret（2022-10-03）
- 支持编辑区域选择主题样式（2022-10-06）
- 支持图片直接存储到当前文档空间（2022-10-29）
- 支持MD文档之间链接跳转（2022-11-20）
- 支持预览区域选择主题样式（2022-12-04）

## 国外开源版本弊端：
- 作者已经不维护了
- Github授权登录存在问题
- 不支持国内常用Gitee
- 强依赖GoogleDrive，而Google Drive在国内不能正常访问

## 部署说明
> 建议docker-compose方式部署，其他部署方式如遇到问题欢迎提issue。

docker官方仓库下载太慢可以使用阿里云的镜像仓库，镜像仓库地址：registry.cn-hangzhou.aliyuncs.com/mafgwo/stackedit:【版本号】

`docker-compose.yml`如下：

```yaml
version: "3.7"
services:
  stackedit:
    image: mafgwo/stackedit:【docker中央仓库找到最新版本】
    container_name: stackedit
    environment:
      - LISTENING_PORT=8080
      - ROOT_URL=/
      - USER_BUCKET_NAME=root
      - DROPBOX_APP_KEY=【不需要支持则删掉】
      - DROPBOX_APP_KEY_FULL=【不需要支持则删掉】
      - GITHUB_CLIENT_ID=【不需要支持则删掉】
      - GITHUB_CLIENT_SECRET=【不需要支持则删掉】
      - GITEE_CLIENT_ID=【不需要支持则删掉】
      - GITEE_CLIENT_SECRET=【不需要支持则删掉】
      - GOOGLE_CLIENT_ID=【不需要支持则删掉】
      - GOOGLE_API_KEY=【不需要支持则删掉】
      - GITEA_CLIENT_ID=【不需要支持则删掉】
      - GITEA_CLIENT_SECRET=【不需要支持则删掉】
      - GITEA_URL=【不需要支持则删掉】
    ports:
      - 8080:8080/tcp
    network_mode: bridge
    restart: always
```

docker-compose方式的启动或停止命令
```bash
# 在 docker-compose.yml 文件目录下 启动命令 
docker-compose up -d
# 在 docker-compose.yml 文件目录下 停止命令 
docker-compose down
# 更新镜像只需要修改docker-compose.yml中镜像版本执行再停止、启动命令即可
```

或者可以直接通过Docker命名直接启动，命令如下：

```bash
docker run -itd --name stackedit \
  -p 8080:8080 \
  -e LISTENING_PORT=8080 \
  -e ROOT_URL=/ \
  -e USER_BUCKET_NAME=root \
  -e DROPBOX_APP_KEY=【不需要支持则删掉】 \
  -e DROPBOX_APP_KEY_FULL=【不需要支持则删掉】 \
  -e GITHUB_CLIENT_ID=【不需要支持则删掉】 \
  -e GITHUB_CLIENT_SECRET=【不需要支持则删掉】 \
  -e GITEE_CLIENT_ID=【不需要支持则删掉】 \
  -e GITEE_CLIENT_SECRET=【不需要支持则删掉】 \
  -e GOOGLE_CLIENT_ID=【不需要支持则删掉】 \
  -e GOOGLE_API_KEY=【不需要支持则删掉】 \
  -e GITEA_CLIENT_ID=【不需要支持则删掉】 \
  -e GITEA_CLIENT_SECRET=【不需要支持则删掉】 \
  -e GITEA_URL=【不需要支持则删掉】 \
  mafgwo/stackedit:【docker中央仓库找到最新版本】

```

## 如何创建三方平台应用
> 部署时，如果需要支持Gitee或GitHub，则需要自行到对应三方平台创建应用，获取到应用ID和秘钥，替换到以上的环境变量中，再启动应用。

- Gitee的环境变量：GITEE_CLIENT_ID、GITEE_CLIENT_SECRET，**[如何创建Gitee应用](./docs/部署之Gitee应用创建.md)**

- GitHub的环境变量：GITHUB_CLIENT_ID、GITEE_CLIENT_SECRET，**[如何创建GitHub应用](./docs/部署之GitHub应用创建.md)**

- Gitea可选择性配置环境变量（未配置则在关联时前端指定，有配置则仅允许配置的应用信息）：GITEA_CLIENT_ID、GITEA_CLIENT_SECRET、GITEA_URL，**[如何创建Gitea应用](./docs/部署之Gitea应用创建.md)**


## 编译与运行
> 编译运行的nodejs版本选择11.15.0版本

```bash
# 安装依赖
npm install

# serve with hot reload at localhost:8080
npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 欢迎加群交流
关于StackEdit，如果你有想法，或者使用中遇到了问题，可以提Issue，如果需要快速得到反馈，可以加QQ群如下（加群后可直接@群主）：
![](./images/qq.jpeg)
