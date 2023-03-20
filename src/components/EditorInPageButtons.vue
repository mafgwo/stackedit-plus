<template>
  <div class="editor-in-page-buttons">
    <ul>
      <li :title="`查找 ${mod}+F`">
        <a @click="showFind"><icon-search></icon-search></a>
      </li>
      <li :title="`替换 ${mod}+Alt+F`">
        <a @click="showFindReplace"><icon-find-replace></icon-find-replace></a>
      </li>
      <li title="切换编辑主题">
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
      name: '默认主题',
      value: 'default',
    }, {
      name: '天蓝黑',
      value: 'azure',
    }, {
      name: '冰山黑',
      value: 'iceberg_contrast',
    }, {
      name: '黎明白',
      value: 'dawn',
    }, {
      name: '孔雀黑',
      value: 'peacock',
    }, {
      name: '薄荷黑',
      value: 'mintchoc',
    }, {
      name: '薄荷绿',
      value: 'spearmint',
    }, {
      name: '暗蓝黑',
      value: 'slate',
    }, {
      name: '文墨黑',
      value: 'carbonight',
    }, {
      name: '日光白',
      value: 'solarized_light',
    }, {
      name: '咖啡黑',
      value: 'espresso_libre',
    }, {
      name: '薰衣草黑',
      value: 'lavender',
    }, {
      name: '耀斑黑',
      value: 'solarflare',
    }, {
      name: 'Clouds白',
      value: 'clouds',
    }, {
      name: 'Clouds黑',
      value: 'clouds_midnight',
    }, {
      name: 'GitHub白',
      value: 'github',
    }, {
      name: '自定义',
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
