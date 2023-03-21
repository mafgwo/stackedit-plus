<template>
  <div class="editor-in-page-buttons">
    <ul>
      <li :title="`Search ${mod}+F`">
        <a @click="showFind"><icon-search></icon-search></a>
      </li>
      <li :title="`Replace ${mod}+Alt+F`">
        <a @click="showFindReplace"><icon-find-replace></icon-find-replace></a>
      </li>
      <li title="Switch edit area theme">
        <dropdown-menu :selected="selectedTheme" :options="allThemes" :closeOnItemClick="false" @change="changeTheme">
          <icon-select-theme></icon-select-theme>
        </dropdown-menu>
      </li>
      <li class="after">
        <icon-ellipsis></icon-ellipsis>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import store from '../store';
import editorSvc from '../services/editorSvc';
import DropdownMenu from './common/DropdownMenu';

const mod = /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'Meta' : 'Ctrl';

export default {
  components: {
    DropdownMenu,
  },
  data: () => ({
    mod,
    allThemes: [{
      name: 'Default',
      value: 'default',
    }, {
      name: 'Azure black',
      value: 'azure',
    }, {
      name: 'Iceberg black',
      value: 'iceberg_contrast',
    }, {
      name: 'Dawn white',
      value: 'dawn',
    }, {
      name: 'Peacock black',
      value: 'peacock',
    }, {
      name: 'Mintchoc black',
      value: 'mintchoc',
    }, {
      name: 'Spearmint green',
      value: 'spearmint',
    }, {
      name: 'Slate black',
      value: 'slate',
    }, {
      name: 'Carbonight black',
      value: 'carbonight',
    }, {
      name: 'Solarized light white',
      value: 'solarized_light',
    }, {
      name: 'Espresso libre black',
      value: 'espresso_libre',
    }, {
      name: 'Lavender black',
      value: 'lavender',
    }, {
      name: 'Solarflare black',
      value: 'solarflare',
    }, {
      name: 'Clouds white',
      value: 'clouds',
    }, {
      name: 'Clouds midnight',
      value: 'clouds_midnight',
    }, {
      name: 'GitHub white',
      value: 'github',
    }, {
      name: 'Custom',
      value: 'custom',
    }],
  }),
  computed: {
    ...mapGetters('theme', [
      'currEditTheme',
      'customEditThemeStyle',
    ]),
    selectedTheme() {
      return {
        value: this.currEditTheme || 'default',
      };
    },
  },
  methods: {
    ...mapActions('data', [
      'toggleSideBar',
    ]),
    showFind() {
      store.dispatch('findReplace/open', {
        type: 'find',
        findText: editorSvc.clEditor.selectionMgr.hasFocus() &&
          editorSvc.clEditor.selectionMgr.getSelectedText(),
      });
    },
    showFindReplace() {
      store.dispatch('findReplace/open', {
        type: 'replace',
        findText: editorSvc.clEditor.selectionMgr.hasFocus() &&
          editorSvc.clEditor.selectionMgr.getSelectedText(),
      });
    },
    async changeTheme(item) {
      await store.dispatch('theme/setEditTheme', item.value);
      // 如果自定义主题没内容 则弹出编辑区域
      if (item.value === 'custom' && !this.customEditThemeStyle) {
        this.toggleSideBar(true);
        store.dispatch('data/setSideBarPanel', 'editTheme');
      }
    },
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.editor-in-page-buttons {
  position: absolute;
  top: 0;
  left: -108px;
  height: 34px;
  padding: 5px;
  background-color: rgba(84, 96, 114, 0.4);
  border-radius: $border-radius-base;
  transition: 0.5s;
  display: flex;

  .dropdown-menu {
    display: none;

    .dropdown-menu-items {
      right: unset;
      left: 0;
    }
  }

  &:active,
  &:focus,
  &:hover {
    left: 0;
    transition: 0.5s;
    background-color: #546072;

    .dropdown-menu {
      display: block;
    }
  }

  ul {
    padding: 0;
    margin-left: 10px;
    line-height: 20px;

    li {
      width: 16px;
      display: inline-block;
      vertical-align: middle;
      list-style: none;
      cursor: pointer;
      font-size: 14px;
      margin-right: 10px;
    }
  }

  .icon {
    color: #dea731;
    opacity: 0.7;

    &:active,
    &:focus,
    &:hover {
      opacity: 1;
    }
  }

  .after {
    margin-left: 0;
    margin-right: -6px;
  }
}
</style>
