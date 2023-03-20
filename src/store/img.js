import utils from '../services/utils';

const checkStorageLocalKey = 'img/checkedStorage';
const workspacePathLocalKey = 'img/workspaceImgPath';

export default {
  namespaced: true,
  state: {
    // 当前图片上传中的临时ID
    currImgId: null,
    // 选择的存储图床信息
    checkedStorage: {
      type: 'workspace', // 目前存储类型分三种 token 与 tokenRepo 、workspace
      provider: null, // 对应是何种账号
      sub: '/imgs/{YYYY}-{MM}-{DD}', // 对应 token 中的sub
      sid: null,
    },
    // 当前仓库图片存储位置 key 为path value 为true
    workspaceImagePath: {
      '/imgs/{YYYY}-{MM}-{DD}': true,
    },
  },
  mutations: {
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
    setWorkspaceImgPath: (state, value) => {
      state.workspaceImagePath = value;
      localStorage.setItem(workspacePathLocalKey, JSON.stringify(state.workspaceImagePath));
    },
    addWorkspaceImgPath: (state, value) => {
      state.workspaceImagePath[value] = true;
      state.workspaceImagePath = utils.deepCopy(state.workspaceImagePath);
      localStorage.setItem(workspacePathLocalKey, JSON.stringify(state.workspaceImagePath));
    },
    removeWorkspaceImgPath: (state, value) => {
      delete state.workspaceImagePath[value];
      state.workspaceImagePath = utils.deepCopy(state.workspaceImagePath);
      localStorage.setItem(workspacePathLocalKey, JSON.stringify(state.workspaceImagePath));
    },
  },
  getters: {
    currImgId: state => state.currImgId,
    getCheckedStorage: state => state.checkedStorage,
    getCheckedStorageSub: state => state.checkedStorage.sub,
    getWorkspaceImgPath: state => state.workspaceImagePath,
  },
  actions: {
    setCurrImgId({ commit }, imgId) {
      commit('setCurrImgId', imgId);
    },
    clearImg({ commit }) {
      commit('clearCurrImg');
    },
    changeCheckedStorage({ commit }, checkedStorage) {
      commit('changeCheckedStorage', checkedStorage);
      localStorage.setItem(checkStorageLocalKey, JSON.stringify(checkedStorage));
    },
    setWorkspaceImgPath({ commit }, workspaceImgPath) {
      commit('setWorkspaceImgPath', workspaceImgPath);
    },
    addWorkspaceImgPath({ commit }, workspaceImgPathValue) {
      commit('addWorkspaceImgPath', workspaceImgPathValue);
    },
    removeWorkspaceImgPath({ commit }, workspaceImgPathValue) {
      commit('removeWorkspaceImgPath', workspaceImgPathValue);
    },
  },
};
