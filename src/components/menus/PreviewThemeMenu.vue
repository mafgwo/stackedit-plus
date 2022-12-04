<template>
    <div class="preview-theme side-bar__panel side-bar__panel--menu">
      <div class="side-bar__info">
        <div class="menu-entry menu-entry--info flex flex--row flex--align-center">
          <span v-if="currPreviewTheme==='custom'">
            下面的自定义主题样式可编辑，可参考其他主题样式填入自己喜欢的预览样式。<br>
            主题class为：preview-theme--custom
          </span>
          <span v-else>
            下面的主题样式不可编辑。
          </span>
        </div>
      </div>
      <div class="side-bar__content">
        <template v-if="currPreviewTheme === 'default'">
          默认主题无额外样式，请选择其他主题。
        </template>
        <template v-else>
          <code-editor v-for="(value, index) in styleEles" :key="index"
            v-if="value.id === `preview-theme-${currPreviewTheme}`" lang="css" :value="value.innerHTML"
            :disabled="value.id!=='preview-theme-custom'" @changed="changeText" scrollClass="side-bar__inner"></code-editor>
        </template>
      </div>
      <div class="flex flex--row flex--end" v-if="currPreviewTheme==='custom'">
        <button class="preview-theme__button button" @click="saveStyleText">保存</button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import MenuEntry from './common/MenuEntry';
  import CodeEditor from '../CodeEditor';
  import store from '../../store';
  
  export default {
    components: {
      MenuEntry,
      CodeEditor,
    },
    data: () => ({
      themeStyleText: '',
      styleEles: [],
    }),
    computed: {
      ...mapGetters('theme', [
        'currPreviewTheme',
      ]),
    },
    methods: {
      saveStyleText() {
        const typeEle = this.findByTheme(this.currPreviewTheme);
        if (!typeEle || !this.themeStyleText) {
          return;
        }
        typeEle.innerHTML = this.themeStyleText;
        store.dispatch('theme/setCustomPreviewThemeStyle', this.themeStyleText);
        store.dispatch('notification/info', '保存自定义主题样式成功！');
      },
      findByTheme(theme) {
        const findEles = this.styleEles.filter(it => it.id === `preview-theme-${theme}`);
        return findEles.length ? findEles[0] : null;
      },
      changeText(text) {
        this.themeStyleText = text;
      },
      close() {
        store.dispatch('data/setSideBarPanel', 'menu');
      },
      initStyle(theme) {
        if (theme === 'default') {
          return;
        }
        const value = theme || this.currPreviewTheme;
        if (this.findByTheme(value)) {
          return;
        }
        const styleId = `preview-theme-${value}`;
        const styleEle = document.getElementById(styleId);
        if (!styleEle) {
          setTimeout(() => this.initStyle(value), 1000);
          return;
        }
        this.styleEles.push(styleEle);
      },
    },
    watch: {
      currPreviewTheme: {
        immediate: true,
        handler(val) {
          this.initStyle(val);
        },
      },
    },
    created() {
      this.initStyle();
    },
  };
  </script>
  
  <style lang="scss">
  .side-bar__panel--menu {
    .side-bar__content {
      .code-editor {
        min-height: 400px !important;
        max-height: 100%;
      }
    }

    .preview-theme__button {
      font-size: 14px;
      margin-top: 0.5em;
    }
  }
  </style>
  