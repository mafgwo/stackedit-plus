<template>
    <div class="preview-theme side-bar__panel side-bar__panel--menu">
      <div class="side-bar__info">
        <div class="menu-entry menu-entry--info flex flex--row flex--align-center">
          <span v-if="currPreviewTheme==='custom'">
            The following custom theme styles can be edited, and you can refer to other theme styles to fill in your favorite preview styles.<br>
            Theme class name: preview-theme--custom
          </span>
          <span v-else>
            The following theme styles are not editable.
          </span>
        </div>
      </div>
      <div class="side-bar__content">
        <template v-if="currPreviewTheme === 'default'">
          The default theme has no additional styles. Please choose another theme.
        </template>
        <template v-else>
          <code-editor v-for="(value, index) in styleEles" :key="index"
            v-if="value.id === `preview-theme-${currPreviewTheme}`" lang="css" :value="value.innerHTML"
            :disabled="value.id!=='preview-theme-custom'" @changed="changeText" scrollClass="side-bar__inner"></code-editor>
        </template>
      </div>
      <div class="flex flex--row flex--end" v-if="currPreviewTheme==='custom'">
        <button class="preview-theme__button button" @click="saveStyleText">Save</button>
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
        store.dispatch('notification/info', 'Successfully saved the custom theme style!');
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
  