import utils from '../services/utils';
import providerRegistry from '../services/providers/common/providerRegistry';

export default {
  namespaced: true,
  state: {
    currentWorkspaceId: null,
    lastFocus: 0,
  },
  mutations: {
    setCurrentWorkspaceId: (state, value) => {
      state.currentWorkspaceId = value;
    },
    setLastFocus: (state, value) => {
      state.lastFocus = value;
    },
  },
  getters: {
    workspacesById: (state, getters, rootState, rootGetters) => {
      const workspacesById = {};
      const mainWorkspaceToken = rootGetters['workspace/mainWorkspaceToken'];
      Object.entries(rootGetters['data/workspaces']).forEach(([id, workspace]) => {
        const sanitizedWorkspace = {
          id,
          providerId: 'giteeAppData',
          sub: mainWorkspaceToken && mainWorkspaceToken.sub,
          ...workspace,
        };
        // Filter workspaces that don't have a provider
        const workspaceProvider = providerRegistry.providersById[sanitizedWorkspace.providerId];
        if (workspaceProvider) {
          // Build the url with the current hostname
          const params = workspaceProvider.getWorkspaceParams(sanitizedWorkspace);
          sanitizedWorkspace.url = utils.addQueryParams('app', params, true);
          sanitizedWorkspace.locationUrl = workspaceProvider
            .getWorkspaceLocationUrl(sanitizedWorkspace);
          workspacesById[id] = sanitizedWorkspace;
        }
      });
      return workspacesById;
    },
    mainWorkspace: (state, { workspacesById }) => workspacesById.main,
    currentWorkspace: ({ currentWorkspaceId }, { workspacesById, mainWorkspace }) =>
      workspacesById[currentWorkspaceId] || mainWorkspace,
    currentWorkspaceIsGit: (state, { currentWorkspace }) =>
      currentWorkspace.providerId === 'githubWorkspace'
      || currentWorkspace.providerId === 'giteeWorkspace'
      || currentWorkspace.providerId === 'gitlabWorkspace'
      || currentWorkspace.providerId === 'giteaWorkspace'
      || currentWorkspace.providerId === 'giteeAppData',
    currentWorkspaceHasUniquePaths: (state, { currentWorkspace }) =>
      currentWorkspace.providerId === 'githubWorkspace'
      || currentWorkspace.providerId === 'giteeWorkspace'
      || currentWorkspace.providerId === 'gitlabWorkspace'
      || currentWorkspace.providerId === 'giteaWorkspace'
      || currentWorkspace.providerId === 'giteeAppData',
    lastSyncActivityKey: (state, { currentWorkspace }) => `${currentWorkspace.id}/lastSyncActivity`,
    lastFocusKey: (state, { currentWorkspace }) => `${currentWorkspace.id}/lastWindowFocus`,
    mainWorkspaceToken: (state, getters, rootState, rootGetters) =>
      utils.someResult(Object.values(rootGetters['data/giteeTokensBySub']), (token) => {
        if (token.isLogin) {
          return token;
        }
        return null;
      }),
    syncToken: (state, { currentWorkspace, mainWorkspaceToken }, rootState, rootGetters) => {
      switch (currentWorkspace.providerId) {
        case 'googleDriveWorkspace':
          return rootGetters['data/googleTokensBySub'][currentWorkspace.sub];
        case 'githubWorkspace':
          return rootGetters['data/githubTokensBySub'][currentWorkspace.sub];
        case 'giteeWorkspace':
          return rootGetters['data/giteeTokensBySub'][currentWorkspace.sub];
        case 'gitlabWorkspace':
          return rootGetters['data/gitlabTokensBySub'][currentWorkspace.sub];
        case 'giteaWorkspace':
          return rootGetters['data/giteaTokensBySub'][currentWorkspace.sub];
        case 'couchdbWorkspace':
          return rootGetters['data/couchdbTokensBySub'][currentWorkspace.id];
        default:
          return mainWorkspaceToken;
      }
    },
    loginType: (state, { currentWorkspace }) => {
      switch (currentWorkspace.providerId) {
        case 'googleDriveWorkspace':
          return 'google';
        case 'githubWorkspace':
          return 'github';
        case 'giteeWorkspace':
        default:
          return 'gitee';
        case 'gitlabWorkspace':
          return 'gitlab';
        case 'giteaWorkspace':
          return 'gitea';
      }
    },
    loginToken: (state, { loginType, currentWorkspace }, rootState, rootGetters) => {
      const tokensBySub = rootGetters['data/tokensByType'][loginType];
      return tokensBySub && tokensBySub[currentWorkspace.sub];
    },
    sponsorToken: (state, { mainWorkspaceToken }) => mainWorkspaceToken,
  },
  actions: {
    removeWorkspace: ({ commit, rootGetters }, id) => {
      const workspaces = {
        ...rootGetters['data/workspaces'],
      };
      delete workspaces[id];
      commit(
        'data/setItem',
        { id: 'workspaces', data: workspaces },
        { root: true },
      );
    },
    patchWorkspacesById: ({ commit, rootGetters }, workspaces) => {
      const sanitizedWorkspaces = {};
      Object
        .entries({
          ...rootGetters['data/workspaces'],
          ...workspaces,
        })
        .forEach(([id, workspace]) => {
          sanitizedWorkspaces[id] = {
            ...workspace,
            id,
            // Do not store urls
            url: undefined,
            locationUrl: undefined,
          };
        });

      commit(
        'data/setItem',
        { id: 'workspaces', data: sanitizedWorkspaces },
        { root: true },
      );
    },
    setCurrentWorkspaceId: ({ commit, getters }, value) => {
      commit('setCurrentWorkspaceId', value);
      const lastFocus = parseInt(localStorage.getItem(getters.lastFocusKey), 10) || 0;
      commit('setLastFocus', lastFocus);
    },
  },
};
