<template>
  <div class="preview-in-page-buttons">
    <ul>
      <li class="before">
        <icon-ellipsis></icon-ellipsis>
      </li>
      <li title="切换预览主题">
        <dropdown-menu :selected="selectedTheme" :options="allThemes" :closeOnItemClick="false" @change="changeTheme">
          <icon-select-theme></icon-select-theme>
        </dropdown-menu>
      </li>
      <li title="Markdown语法帮助">
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

export default {
  components: {
    DropdownMenu,
  },
  data: () => ({
    allThemes: [{
      name: '默认主题',
      value: 'default',
    }, {
      name: '凝夜紫',
      value: 'ningyezi',
    }, {
      name: '草原绿',
      value: 'caoyuangreen',
    }, {
      name: '雁栖湖',
      value: 'yanqihu',
    }, {
      name: '灵动蓝',
      value: 'activeblue',
    }, {
      name: '极客黑',
      value: 'jikebrack',
    }, {
      name: '极简黑',
      value: 'simplebrack',
    }, {
      name: '全栈蓝',
      value: 'allblue',
    }, {
      name: '自定义',
      value: 'custom',
    }],
    baseCss: '',
  }),
  computed: {
    ...mapGetters('theme', [
      'currPreviewTheme',
      'customPreviewThemeStyle',
    ]),
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
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.preview-in-page-buttons {
  position: absolute;
  bottom: 10px;
  right: -68px;
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
