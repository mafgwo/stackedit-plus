<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <menu-entry @click.native="manageWorkspaces">
      <icon-database slot="icon"></icon-database>
      <div><div class="menu-entry__label menu-entry__label--count">{{workspaceCount}}</div> Manage workspaces</div>
      <span>List, rename, remove workspaces</span>
    </menu-entry>
    <hr>
    <div class="workspace" v-for="(workspace, id) in workspacesById" :key="id">
      <menu-entry :href="workspace.url" target="_blank">
        <icon-provider slot="icon" :provider-id="workspace.providerId"></icon-provider>
        <div class="workspace__name"><div class="menu-entry__label" v-if="currentWorkspace === workspace">current</div>{{workspace.name}}</div>
      </menu-entry>
    </div>
    <hr>
    <menu-entry @click.native="addGithubWorkspace">
      <icon-provider slot="icon" provider-id="githubWorkspace"></icon-provider>
      <span>Add <b>GitHub</b> workspace</span>
    </menu-entry>
    <menu-entry @click.native="addGiteeWorkspace">
      <icon-provider slot="icon" provider-id="giteeWorkspace"></icon-provider>
      <span>Add <b>Gitee</b> workspace</span>
    </menu-entry>
    <menu-entry @click.native="addGitlabWorkspace">
      <icon-provider slot="icon" provider-id="gitlabWorkspace"></icon-provider>
      <span>Add <b>GitLab</b> workspace</span>
    </menu-entry>
    <menu-entry @click.native="addGiteaWorkspace">
      <icon-provider slot="icon" provider-id="giteaWorkspace"></icon-provider>
      <span>Add <b>Gitea</b> workspace</span>
    </menu-entry>
    <menu-entry @click.native="addGoogleDriveWorkspace">
      <icon-provider slot="icon" provider-id="googleDriveWorkspace"></icon-provider>
      <span>Add <b>Google Drive</b> workspace</span>
    </menu-entry>
    <menu-entry @click.native="addCouchdbWorkspace">
      <icon-provider slot="icon" provider-id="couchdbWorkspace"></icon-provider>
      <span>Add <b>CouchDB</b> workspace</span>
    </menu-entry>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MenuEntry from './common/MenuEntry';
import googleHelper from '../../services/providers/helpers/googleHelper';
import gitlabHelper from '../../services/providers/helpers/gitlabHelper';
import giteaHelper from '../../services/providers/helpers/giteaHelper';
import store from '../../store';

export default {
  components: {
    MenuEntry,
  },
  computed: {
    ...mapGetters('workspace', [
      'workspacesById',
      'currentWorkspace',
    ]),
    workspaceCount() {
      return Object.keys(this.workspacesById).length;
    },
  },
  methods: {
    async addCouchdbWorkspace() {
      try {
        store.dispatch('modal/open', {
          type: 'couchdbWorkspace',
        });
      } catch (e) { /* Cancel */ }
    },
    async addGithubWorkspace() {
      try {
        store.dispatch('modal/open', {
          type: 'githubWorkspace',
        });
      } catch (e) { /* Cancel */ }
    },
    async addGiteeWorkspace() {
      try {
        store.dispatch('modal/open', {
          type: 'giteeWorkspace',
        });
      } catch (e) { /* Cancel */ }
    },
    async addGitlabWorkspace() {
      try {
        const { serverUrl, applicationId, applicationSecret } = await store.dispatch('modal/open', { type: 'gitlabAccount' });
        const token = await gitlabHelper.addAccount(serverUrl, applicationId, applicationSecret);
        store.dispatch('modal/open', {
          type: 'gitlabWorkspace',
          token,
        });
      } catch (e) { /* Cancel */ }
    },
    async addGiteaWorkspace() {
      try {
        const applicationInfo = await store.dispatch('modal/open', { type: 'giteaAccount' });
        const token = await giteaHelper.addAccount(applicationInfo);
        store.dispatch('modal/open', {
          type: 'giteaWorkspace',
          token,
        });
      } catch (e) { /* Cancel */ }
    },
    async addGoogleDriveWorkspace() {
      try {
        const token = await googleHelper.addDriveAccount(true);
        store.dispatch('modal/open', {
          type: 'googleDriveWorkspace',
          token,
        });
      } catch (e) { /* Cancel */ }
    },
    manageWorkspaces() {
      try {
        store.dispatch('modal/open', 'workspaceManagement');
      } catch (e) { /* Cancel */ }
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.workspace .menu-entry {
  padding-top: 12px;
  padding-bottom: 12px;
}

.workspace__name {
  font-weight: bold;
  line-height: 1.2;
}
</style>
