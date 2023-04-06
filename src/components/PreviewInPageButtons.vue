<template>
  <div class="preview-in-page-buttons">
    <ul>
      <li class="before">
        <icon-ellipsis></icon-ellipsis>
      </li>
      <li title="Share">
        <a href="javascript:void(0)" @click="share"><icon-share></icon-share></a>
      </li>
      <li title="Switch Preview Area theme">
        <dropdown-menu :selected="selectedTheme" :options="allThemes" :closeOnItemClick="false" @change="changeTheme">
          <icon-select-theme></icon-select-theme>
        </dropdown-menu>
      </li>
      <li title="Markdown helper">
        <a href="javascript:void(0)" @click="showHelp"><icon-help-circle></icon-help-circle></a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import juice from 'juice';
import store from '../store';
import DropdownMenu from './common/DropdownMenu';
import publishSvc from '../services/publishSvc';
import gistProvider from '../services/providers/gistProvider';

export default {
  components: {
    DropdownMenu,
  },
  data: () => ({
    allThemes: [{
      name: 'Default',
      value: 'default',
    }, {
      name: 'Curdled night violet',
      value: 'ningyezi',
    }, {
      name: 'Grassland green',
      value: 'caoyuangreen',
    }, {
      name: 'Yanqi Lake',
      value: 'yanqihu',
    }, {
      name: 'Smart Blue',
      value: 'activeblue',
    }, {
      name: 'Geek Black',
      value: 'jikebrack',
    }, {
      name: 'Minimalist black',
      value: 'simplebrack',
    }, {
      name: 'Full stack blue',
      value: 'allblue',
    }, {
      name: 'Custom',
      value: 'custom',
    }],
    baseCss: '',
  }),
  computed: {
    ...mapGetters('theme', [
      'currPreviewTheme',
      'customPreviewThemeStyle',
    ]),
    ...mapGetters('publishLocation', {
      publishLocations: 'current',
    }),
    selectedTheme() {
      return {
        value: this.currPreviewTheme || 'default',
      };
    },
  },
  methods: {
    ...mapActions('data', [
      'toggleSideBar',
    ]),
    async changeTheme(item) {
      await store.dispatch('theme/setPreviewTheme', item.value);
      // 如果自定义主题没内容 则弹出编辑区域
      if (item.value === 'custom' && !this.customPreviewThemeStyle) {
        this.toggleSideBar(true);
        store.dispatch('data/setSideBarPanel', 'previewTheme');
      }
    },
    showHelp() {
      this.toggleSideBar(true);
      store.dispatch('data/setSideBarPanel', 'help');
    },
    async share() {
      if (this.sharing) {
        store.dispatch('notification/info', 'Sharing link creating... Please try again later!');
        return;
      }
      try {
        const currentFile = store.getters['file/current'];
        await store.dispatch('modal/open', { type: 'shareHtmlPre', name: currentFile.name });
        this.sharing = true;
        const mainToken = store.getters['workspace/mainWorkspaceToken'];
        if (!mainToken) {
          store.dispatch('notification/info', 'You can only use the sharing function after logging into the main workspace!');
          return;
        }
        let githubGistId = null;
        const filterLocations = this.publishLocations.filter(it => it.providerId === 'gist' && it.url && it.gistId);
        if (filterLocations.length > 0) {
          githubGistId = filterLocations[0].gistId;
        }
        const location = gistProvider.makeLocation(
          mainToken,
          `share-${currentFile.name}`,
          true,
          null,
        );
        location.templateId = 'styledHtmlWithTheme';
        location.fileId = currentFile.id;
        location.gistId = githubGistId;
        const { gistId } = await publishSvc.publishLocationAndStore(location);
        const url = `${window.location.protocol}//${window.location.host}/share.html?id=${gistId}`;
        await store.dispatch('modal/open', { type: 'shareHtml', name: currentFile.name, url });
      } catch (err) {
        if (err) {
          store.dispatch('notification/error', err);
        }
      } finally {
        this.sharing = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.preview-in-page-buttons {
  position: absolute;
  bottom: 10px;
  right: -98px;
  height: 34px;
  padding: 5px;
  background-color: rgba(84, 96, 114, 0.4);
  border-radius: $border-radius-base;
  transition: 0.5s;
  display: flex;

  .dropdown-menu {
    display: none;
  }

  &:active,
  &:focus,
  &:hover {
    right: 0;
    transition: 0.5s;
    background-color: #546072;

    .dropdown-menu {
      display: block;
    }
  }

  .dropdown-menu-items {
    bottom: 100%;
    top: unset;
  }

  ul {
    padding: 0;
    margin-left: 10px;
    line-height: 20px;

    li {
      line-height: 16px;
      width: 16px;
      display: inline-block;
      vertical-align: middle;
      list-style: none;
      cursor: pointer;
      font-size: 14px;
      margin-right: 10px;

      .icon {
        color: #fff;
        opacity: 0.7;

        &:active,
        &:focus,
        &:hover {
          opacity: 1;
        }
      }
    }

    .before {
      margin-left: -16px;
      margin-right: 0;
    }
  }
}
</style>
