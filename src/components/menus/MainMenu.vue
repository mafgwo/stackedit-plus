<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <div class="side-bar__info">
      <div class="menu-entry menu-entry--info flex flex--row flex--align-center" v-if="loginToken">
        <div class="menu-entry__icon menu-entry__icon--image">
          <user-image :user-id="userId"></user-image>
        </div>
        <span>登录名为<b>{{loginToken.name}}</b>。</span>
      </div>
      <div class="menu-entry menu-entry--info flex flex--row flex--align-center" v-if="syncToken">
        <div class="menu-entry__icon menu-entry__icon--image">
          <icon-provider :provider-id="currentWorkspace.providerId"></icon-provider>
        </div>
        <span v-if="currentWorkspace.providerId === 'googleDriveAppData'">
          <b>{{currentWorkspace.name}}</b> 与您的 Google Drive 应用数据文件夹同步。
        </span>
        <span v-else-if="currentWorkspace.providerId === 'googleDriveWorkspace'">
          <b>{{currentWorkspace.name}}</b> 与 <a :href="workspaceLocationUrl" target="_blank">Google Drive 文件夹</a>同步。
        </span>
        <span v-else-if="currentWorkspace.providerId === 'couchdbWorkspace'">
          <b>{{currentWorkspace.name}}</b> 与 <a :href="workspaceLocationUrl" target="_blank">CouchDB 数据库</a>同步。
        </span>
        <span v-else-if="currentWorkspace.providerId === 'githubWorkspace'">
          <b>{{currentWorkspace.name}}</b> 与 <a :href="workspaceLocationUrl" target="_blank">GitHub repo</a> 同步。
        </span>
        <span v-else-if="currentWorkspace.providerId === 'giteeWorkspace'">
          <b>{{currentWorkspace.name}}</b> 与 <a :href="workspaceLocationUrl" target="_blank">Gitee repo</a> 同步。
        </span>
        <span v-else-if="currentWorkspace.providerId === 'gitlabWorkspace'">
          <b>{{currentWorkspace.name}}</b> 与 <a :href="workspaceLocationUrl" target="_blank">GitLab 项目</a>同步。
        </span>
        <span v-else-if="currentWorkspace.providerId === 'giteaWorkspace'">
          <b>{{currentWorkspace.name}}</b> 与 <a :href="workspaceLocationUrl" target="_blank">Gitea 项目</a>同步。
        </span>
      </div>
      <div class="menu-entry menu-entry--info flex flex--row flex--align-center" v-else>
        <div class="menu-entry__icon menu-entry__icon--disabled">
          <icon-sync-off></icon-sync-off>
        </div>
        <span><b>{{currentWorkspace.name}}</b> 未同步。</span>
      </div>
    </div>
    <menu-entry v-if="!loginToken" @click.native="signin">
      <icon-login slot="icon"></icon-login>
      <div>使用 Google 登录</div>
      <span>同步您的主工作区并解锁功能。</span>
    </menu-entry>
    <menu-entry @click.native="setPanel('workspaces')">
      <icon-database slot="icon"></icon-database>
      <div><div class="menu-entry__label menu-entry__label--count" v-if="workspaceCount">{{workspaceCount}}</div> 工作区</div>
      <span>切换到另一个工作区。</span>
    </menu-entry>
    <hr>
    <menu-entry @click.native="setPanel('sync')">
      <icon-sync slot="icon"></icon-sync>
      <div><div class="menu-entry__label menu-entry__label--count" v-if="syncLocationCount">{{syncLocationCount}}</div> 同步</div>
      <span>在云端同步您的文件。</span>
    </menu-entry>
    <menu-entry @click.native="setPanel('publish')">
      <icon-upload slot="icon"></icon-upload>
      <div><div class="menu-entry__label menu-entry__label--count" v-if="publishLocationCount">{{publishLocationCount}}</div>发布</div>
      <span>将您的文件导出到 Web。</span>
    </menu-entry>
    <menu-entry @click.native="setPanel('history')">
      <icon-history slot="icon"></icon-history>
      <div>历史</div>
      <span>跟踪和恢复文件修订。</span>
    </menu-entry>
    <menu-entry @click.native="fileProperties">
      <icon-view-list slot="icon"></icon-view-list>
      <div>文件属性</div>
      <span>添加元数据并配置扩展。</span>
    </menu-entry>
    <hr>
    <menu-entry @click.native="setPanel('toc')">
      <icon-toc slot="icon"></icon-toc>
      目录
    </menu-entry>
    <menu-entry @click.native="setPanel('help')">
      <icon-help-circle slot="icon"></icon-help-circle>
      Markdown 帮助
    </menu-entry>
    <hr>
    <menu-entry @click.native="setPanel('importExport')">
      <icon-content-save slot="icon"></icon-content-save>
      导入/导出
    </menu-entry>
    <menu-entry @click.native="print">
      <icon-printer slot="icon"></icon-printer>
      打印
    </menu-entry>
    <hr>
    <menu-entry @click.native="badges">
      <icon-seal slot="icon"></icon-seal>
      <div><div class="menu-entry__label menu-entry__label--count">{{badgeCount}}/{{featureCount}}</div> 徽章</div>
      <span>列出应用程序功能和获得的徽章。</span>
    </menu-entry>
    <menu-entry @click.native="accounts">
      <icon-key slot="icon"></icon-key>
      <div><div class="menu-entry__label menu-entry__label--count">{{accountCount}}</div> 账号</div>
      <span>管理对您的外部账号的访问。</span>
    </menu-entry>
    <menu-entry @click.native="templates">
      <icon-code-braces slot="icon"></icon-code-braces>
      <div><div class="menu-entry__label menu-entry__label--count">{{templateCount}}</div> 模板</div>
      <span>为您的导出配置 Handlebars 模板。</span>
    </menu-entry>
    <menu-entry @click.native="settings">
      <icon-settings slot="icon"></icon-settings>
      <div>配置</div>
      <span>调整应用程序和键盘快捷键。</span>
    </menu-entry>
    <hr>
    <menu-entry @click.native="setPanel('workspaceBackups')">
      <icon-content-save slot="icon"></icon-content-save>
      工作区备份
    </menu-entry>
    <menu-entry @click.native="reset">
      <icon-logout slot="icon"></icon-logout>
      重置应用程序
    </menu-entry>
    <menu-entry @click.native="about">
      <icon-help-circle slot="icon"></icon-help-circle>
      关于 StackEdit
    </menu-entry>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MenuEntry from './common/MenuEntry';
import providerRegistry from '../../services/providers/common/providerRegistry';
import UserImage from '../UserImage';
import googleHelper from '../../services/providers/helpers/googleHelper';
import syncSvc from '../../services/syncSvc';
import userSvc from '../../services/userSvc';
import store from '../../store';

export default {
  components: {
    MenuEntry,
    UserImage,
  },
  computed: {
    ...mapGetters('workspace', [
      'currentWorkspace',
      'syncToken',
      'loginToken',
    ]),
    userId() {
      return userSvc.getCurrentUserId();
    },
    workspaceLocationUrl() {
      const provider = providerRegistry.providersById[this.currentWorkspace.providerId];
      return provider.getWorkspaceLocationUrl(this.currentWorkspace);
    },
    workspaceCount() {
      return Object.keys(store.getters['workspace/workspacesById']).length;
    },
    syncLocationCount() {
      return Object.keys(store.getters['syncLocation/currentWithWorkspaceSyncLocation']).length;
    },
    publishLocationCount() {
      return Object.keys(store.getters['publishLocation/current']).length;
    },
    templateCount() {
      return Object.keys(store.getters['data/allTemplatesById']).length;
    },
    accountCount() {
      return Object.values(store.getters['data/tokensByType'])
        .reduce((count, tokensBySub) => count + Object.values(tokensBySub).length, 0);
    },
    badgeCount() {
      return store.getters['data/allBadges'].filter(badge => badge.isEarned).length;
    },
    featureCount() {
      return store.getters['data/allBadges'].length;
    },
  },
  methods: {
    ...mapActions('data', {
      setPanel: 'setSideBarPanel',
    }),
    async signin() {
      try {
        await googleHelper.signin();
        syncSvc.requestSync();
      } catch (e) {
        // Cancel
      }
    },
    async fileProperties() {
      try {
        await store.dispatch('modal/open', 'fileProperties');
      } catch (e) {
        // Cancel
      }
    },
    print() {
      window.print();
    },
    async settings() {
      try {
        await store.dispatch('modal/open', 'settings');
      } catch (e) { /* Cancel */ }
    },
    async templates() {
      try {
        await store.dispatch('modal/open', 'templates');
      } catch (e) { /* Cancel */ }
    },
    async accounts() {
      try {
        await store.dispatch('modal/open', 'accountManagement');
      } catch (e) { /* Cancel */ }
    },
    async badges() {
      try {
        await store.dispatch('modal/open', 'badgeManagement');
      } catch (e) { /* Cancel */ }
    },
    async reset() {
      try {
        await store.dispatch('modal/open', 'reset');
        localStorage.setItem('resetStackEdit', '1');
        window.location.reload();
      } catch (e) { /* Cancel */ }
    },
    about() {
      store.dispatch('modal/open', 'about');
    },
  },
};
</script>
