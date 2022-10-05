const localKey = 'theme/currEditTheme';

export default {
  namespaced: true,
  state: {
    // 当前编辑主题
    currEditTheme: null,
    initEditTheme: false,
  },
  mutations: {
    setEditTheme: (state, value) => {
      state.currEditTheme = value;
    },
    setInitEditTheme: (state, value) => {
      state.initEditTheme = value;
    },
  },
  getters: {
    currEditTheme: state => state.currEditTheme,
    initEditTheme: state => state.initEditTheme,
  },
  actions: {
    async setEditTheme({ commit }, theme) {
      commit('setEditTheme', theme);
      commit('setInitEditTheme', true);
      localStorage.setItem(localKey, theme);
      // 如果不是default 则加载样式
      if (!theme || theme === 'default') {
        return;
      }
      const themeStyle = document.getElementById(`edit-theme-${theme}`);
      if (themeStyle) {
        return;
      }
      const script = document.createElement('script');
      let timeout;
      try {
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          script.src = `/themes/edit-theme-${theme}.js`;
          try {
            document.head.appendChild(script);
            timeout = setTimeout(reject, 30);
          } catch (e) {
            reject(e);
          }
        });
      } finally {
        clearTimeout(timeout);
        document.head.removeChild(script);
      }
    },
  },
};
