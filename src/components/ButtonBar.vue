<template>
  <div class="button-bar">
    <div class="button-bar__inner button-bar__inner--top">
      <button class="button-bar__button button-bar__button--navigation-bar-toggler button" :class="{ 'button-bar__button--on': layoutSettings.showNavigationBar }" v-if="!light" @click="toggleNavigationBar()" v-title="'切换导航栏'">
        <icon-navigation-bar></icon-navigation-bar>
      </button>
      <button class="button-bar__button button-bar__button--side-preview-toggler button" :class="{ 'button-bar__button--on': layoutSettings.showSidePreview }" tour-step-anchor="editor" @click="toggleSidePreview()" v-title="'切换侧边预览'">
        <icon-side-preview></icon-side-preview>
      </button>
      <button class="button-bar__button button-bar__button--editor-toggler button" @click="toggleEditor(false)" v-title="'阅读模式'">
        <icon-eye></icon-eye>
      </button>
    </div>
    <div class="button-bar__inner button-bar__inner--bottom">
      <button class="button-bar__button button-bar__button--focus-mode-toggler button" :class="{ 'button-bar__button--on': layoutSettings.focusMode }" @click="toggleFocusMode()" v-title="'切换对焦模式'">
        <icon-target></icon-target>
      </button>
      <button class="button-bar__button button-bar__button--scroll-sync-toggler button" :class="{ 'button-bar__button--on': layoutSettings.scrollSync }" @click="toggleScrollSync()" v-title="'切换滚动同步'">
        <icon-scroll-sync></icon-scroll-sync>
      </button>
      <button class="button-bar__button button-bar__button--status-bar-toggler button" :class="{ 'button-bar__button--on': layoutSettings.showStatusBar }" @click="toggleStatusBar()" v-title="'切换状态栏'">
        <icon-status-bar></icon-status-bar>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState([
      'light',
    ]),
    ...mapGetters('data', [
      'layoutSettings',
    ]),
  },
  methods: mapActions('data', [
    'toggleNavigationBar',
    'toggleEditor',
    'toggleSidePreview',
    'toggleStatusBar',
    'toggleFocusMode',
    'toggleScrollSync',
  ]),
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.button-bar {
  position: absolute;
  width: 100%;
  height: 100%;
}

.button-bar__inner {
  position: absolute;
}

.button-bar__inner--bottom {
  bottom: 0;
}

.button-bar__button {
  color: rgba(0, 0, 0, 0.2);
  display: block;
  width: 26px;
  height: 26px;
  padding: 2px;
  margin: 3px 0;

  .app--dark & {
    color: rgba(255, 255, 255, 0.15);
  }

  &:active,
  &:focus,
  &:hover {
    color: rgba(0, 0, 0, 0.2);

    .app--dark & {
      color: rgba(255, 255, 255, 0.15);
      background-color: $navbar-hover-background;
    }
  }
}

.button-bar__button--on {
  color: rgba(0, 0, 0, 0.4);

  .app--dark & {
    color: rgba(255, 255, 255, 0.4);
  }

  &:active,
  &:focus,
  &:hover {
    color: rgba(0, 0, 0, 0.4);

    .app--dark & {
      color: rgba(255, 255, 255, 0.4);
    }
  }
}
</style>
