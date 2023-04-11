const chatgptConfigKey = 'chatgpt/config';

export default {
  namespaced: true,
  state: {
    config: {
      apiKey: null,
      proxyHost: null,
    },
  },
  mutations: {
    setCurrConfig: (state, value) => {
      state.config = value;
    },
  },
  getters: {
    chatGptConfig: state => state.config,
  },
  actions: {
    setCurrConfig({ commit }, value) {
      commit('setCurrConfig', value);
      localStorage.setItem(chatgptConfigKey, JSON.stringify(value));
    },
  },
};
