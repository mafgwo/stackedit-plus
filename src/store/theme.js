const localKey = 'theme/currEditTheme';
const customEditThemeKey = 'theme/customEditThemeStyle';
const previewLocalKey = 'theme/currPreviewTheme';
const customPreviewThemeKey = 'theme/customPreviewThemeStyle';

export default {
  namespaced: true,
  state: {
    // 当前编辑主题
    currEditTheme: '',
    customEditThemeStyle: null,
    // 当前预览主题
    currPreviewTheme: '',
    customPreviewThemeStyle: null,
  },
  mutations: {
    setEditTheme: (state, value) => {
      state.currEditTheme = value;
    },
    setCustomEditThemeStyle: (state, value) => {
      state.customEditThemeStyle = value;
    },
    setPreviewTheme: (state, value) => {
      state.currPreviewTheme = value;
    },
    setCustomPreviewThemeStyle: (state, value) => {
      state.customPreviewThemeStyle = value;
    },
  },
  getters: {
    currEditTheme: state => state.currEditTheme,
    customEditThemeStyle: state => state.customEditThemeStyle,
    currPreviewTheme: state => state.currPreviewTheme,
    customPreviewThemeStyle: state => state.customPreviewThemeStyle,
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
    async setPreviewTheme({ commit }, theme) {
      // 如果不是default 则加载样式
      if (!theme || theme === 'default') {
        commit('setPreviewTheme', theme);
        localStorage.setItem(previewLocalKey, theme);
        return;
      }
      const themeStyle = document.getElementById(`preview-theme-${theme}`);
      if (themeStyle) {
        commit('setPreviewTheme', theme);
        localStorage.setItem(previewLocalKey, theme);
        return;
      }
      // 如果是自定义则直接追加
      if (theme === 'custom') {
        const styleEle = document.createElement('style');
        styleEle.id = `preview-theme-${theme}`;
        styleEle.type = 'text/css';
        styleEle.innerHTML = localStorage.getItem(customPreviewThemeKey) || '';
        commit('setCustomPreviewThemeStyle', styleEle.innerHTML);
        document.head.appendChild(styleEle);
        commit('setPreviewTheme', theme);
        localStorage.setItem(previewLocalKey, theme);
        return;
      }
      const script = document.createElement('script');
      let timeout;
      try {
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          script.src = `/themes/preview-theme-${theme}.js`;
          try {
            document.head.appendChild(script);
            timeout = setTimeout(reject, 30);
            commit('setPreviewTheme', theme);
            localStorage.setItem(previewLocalKey, theme);
          } catch (e) {
            reject(e);
          }
        });
      } finally {
        clearTimeout(timeout);
        document.head.removeChild(script);
      }
    },
    setCustomPreviewThemeStyle({ commit }, value) {
      commit('setCustomPreviewThemeStyle', value);
      localStorage.setItem(customPreviewThemeKey, value);
    },
  },
};
