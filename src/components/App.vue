<template>
  <div class="app" :class="classes" @keydown.esc="close">
    <splash-screen v-if="!ready"></splash-screen>
    <layout v-else></layout>
    <modal></modal>
    <notification></notification>
    <context-menu></context-menu>
  </div>
</template>

<script>
import '../styles';
import '../styles/markdownHighlighting.scss';
import '../styles/app.scss';
import Layout from './Layout';
import Modal from './Modal';
import Notification from './Notification';
import ContextMenu from './ContextMenu';
import SplashScreen from './SplashScreen';
import syncSvc from '../services/syncSvc';
import networkSvc from '../services/networkSvc';
import tempFileSvc from '../services/tempFileSvc';
import store from '../store';
import './common/vueGlobals';
import utils from '../services/utils';
import providerRegistry from '../services/providers/common/providerRegistry';

const themeClasses = {
  light: ['app--light'],
  dark: ['app--dark'],
};

export default {
  components: {
    Layout,
    Modal,
    Notification,
    ContextMenu,
    SplashScreen,
  },
  data: () => ({
    ready: false,
  }),
  computed: {
    classes() {
      const result = themeClasses[store.getters['data/computedSettings'].colorTheme];
      return Array.isArray(result) ? result : themeClasses.light;
    },
  },
  methods: {
    close() {
      tempFileSvc.close();
    },
    // 通过路径查看文件 支持相对路径
    viewFileByPath(path) {
      // 如果是md结尾
      if (!path) {
        return;
      }
      const currDirNode = store.getters['explorer/selectedNodeFolder'];
      if (path.slice(-3) === '.md') {
        const rootNode = store.getters['explorer/rootNode'];
        const node = utils.findNodeByPath(rootNode, currDirNode, path);
        if (!node) {
          return;
        }
        store.commit('explorer/setSelectedId', node.item.id);
        // Prevent from freezing the UI while loading the file
        setTimeout(() => {
          store.commit('file/setCurrentId', node.item.id);
        }, 10);
      } else {
        const workspace = store.getters['workspace/currentWorkspace'];
        const provider = providerRegistry.providersById[workspace.providerId];
        if (provider == null) {
          return;
        }
        const absolutePath = utils.getAbsoluteFilePath(currDirNode, path);
        const url = provider.getFilePathUrl(absolutePath);
        if (url) {
          window.open(url, '_blank');
        }
      }
    },
  },
  async created() {
    window.viewFileByPath = this.viewFileByPath;
    try {
      await syncSvc.init();
      await networkSvc.init();
      // store 编辑主题
      const editTheme = localStorage.getItem('theme/currEditTheme');
      store.dispatch('theme/setEditTheme', editTheme || 'default');
      this.ready = true;
      tempFileSvc.setReady();
    } catch (err) {
      if (err && err.message === 'RELOAD') {
        window.location.reload();
      } else if (err && err.message !== 'RELOAD') {
        console.error(err); // eslint-disable-line no-console
        store.dispatch('notification/error', err);
      }
    }
  },
};
</script>
