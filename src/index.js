import Vue from 'vue';
import 'babel-polyfill';
import 'indexeddbshim/dist/indexeddbshim';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import './extensions';
import './services/optional';
import './icons';
import App from './components/App';
import store from './store';
import localDbSvc from './services/localDbSvc';
import versionsDescription from './data/versions';

if (!indexedDB) {
  throw new Error('不支持您的浏览器，请升级到最新版本。');
}

OfflinePluginRuntime.install({
  onUpdateReady: () => {
    // Tells to new SW to take control immediately
    OfflinePluginRuntime.applyUpdate();
  },
  onUpdated: async () => {
    if (!store.state.light) {
      await localDbSvc.sync();
      localStorage.updated = true;
      // Reload the webpage to load into the new version
      window.location.reload();
    }
  },
});

if (localStorage.updated) {
  const versionDesc = versionsDescription[VERSION];
  store.dispatch('notification/info', `StackEdit中文版刚刚更新了！${versionDesc}`);
  setTimeout(() => localStorage.removeItem('updated'), 3000);
}

if (!localStorage.installPrompted) {
  window.addEventListener('beforeinstallprompt', async (promptEvent) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    promptEvent.preventDefault();

    try {
      await store.dispatch('notification/confirm', '将StackEdit中文版添加到您的主屏幕上？');
      promptEvent.prompt();
      await promptEvent.userChoice;
    } catch (err) {
      // Cancel
    }
    localStorage.installPrompted = true;
  });
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
