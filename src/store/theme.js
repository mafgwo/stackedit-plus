const localKey = 'theme/currEditTheme';
const customEditThemeKey = 'theme/customEditThemeStyle';

export default {
  namespaced: true,
  state: {
    // 当前编辑主题
    currEditTheme: '',
    customEditThemeStyle: null,
  },
  mutations: {
    setEditTheme: (state, value) => {
      state.currEditTheme = value;
    },
    setCustomEditThemeStyle: (state, value) => {
      state.customEditThemeStyle = value;
    },
  },
  getters: {
    currEditTheme: state => state.currEditTheme,
    customEditThemeStyle: state => state.customEditThemeStyle,
  },
  actions: {
    async setEditTheme({ commit }, theme) {
      // 如果不是default 则加载样式
      if (!theme || theme === 'default') {
        commit('setEditTheme', theme);
        localStorage.setItem(localKey, theme);
        return;
      }
      const themeStyle = document.getElementById(`edit-theme-${theme}`);
      if (themeStyle) {
        commit('setEditTheme', theme);
        localStorage.setItem(localKey, theme);
        return;
      }
      // 如果是自定义则直接追加
      if (theme === 'custom') {
        const styleEle = document.createElement('style');
        styleEle.id = `edit-theme-${theme}`;
        styleEle.type = 'text/css';
        styleEle.innerHTML = localStorage.getItem(customEditThemeKey) || '';
        commit('setCustomEditThemeStyle', styleEle.innerHTML);
        document.head.appendChild(styleEle);
        commit('setEditTheme', theme);
        localStorage.setItem(localKey, theme);
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
            commit('setEditTheme', theme);
            localStorage.setItem(localKey, theme);
          } catch (e) {
            reject(e);
          }
        });
      } finally {
        clearTimeout(timeout);
        document.head.removeChild(script);
      }
    },
    setCustomEditThemeStyle({ commit }, value) {
      commit('setCustomEditThemeStyle', value);
      localStorage.setItem(customEditThemeKey, value);
    },
  },
};
