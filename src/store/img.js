const localKey = 'img/checkedStorage';

export default {
  namespaced: true,
  state: {
    // 来自粘贴板 或者 拖拽的图片的文件对象
    currImg: null,
    // 当前图片ID
    currImgId: null,
    // 选择的存储图床信息
    checkedStorage: {
      type: null, // 目前存储类型分两种 token 与 tokenRepo
      provider: null, // 对应是何种账号
      sub: null, // 对应 token 中的sub
    },
  },
  mutations: {
    setNewImg: (state, value) => {
      state.currImg = value;
    },
    setCurrImgId: (state, value) => {
      state.currImgId = value;
    },
    clearCurrImg: (state) => {
      state.currImg = null;
    },
    changeCheckedStorage: (state, value) => {
      if (value) {
        state.checkedStorage = {
          type: value.type, // 目前存储类型分两种 token 与 tokenRepo
          provider: value.provider, // 对应是何种账号
          sub: value.sub, // 对应 token 中的sub
          sid: value.sid,
        };
      } else {
        state.checkedStorage = {
          type: null, // 目前存储类型分两种 token 与 tokenRepo
          provider: null, // 对应是何种账号
          sub: null, // 对应 token 中的sub
          sid: null,
        };
      }
    },
  },
  getters: {
    getImg: state => state.currImg,
    currImgId: state => state.currImgId,
    getCheckedStorage: state => state.checkedStorage,
    getCheckedStorageSub: state => state.checkedStorage.sub,
  },
  actions: {
    setImg({ commit }, img) {
      commit('setNewImg', img);
    },
    setCurrImgId({ commit }, imgId) {
      commit('setCurrImgId', imgId);
    },
    clearImg({ commit }) {
      commit('clearCurrImg');
    },
    changeCheckedStorage({ commit }, checkedStorage) {
      commit('changeCheckedStorage', checkedStorage);
      localStorage.setItem(localKey, JSON.stringify(checkedStorage));
    },
  },
};
