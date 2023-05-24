import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const initialState = {
  userInfo: {
    loggedIn: false,
  },
};


const store = createStore({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  strict: false,
  state: { ...initialState,
    filter: {
        asn_op: 'OR',
        source_op: 'OR',
        cat_op: 'OR',
        bl_op: 'OR',
        tag_op: 'OR',
        subnet: null,
        hostname: null,
        country: null,
        asn: null,
        cat: null,
        source: null,
        blacklist: null,
        tag: null,
        sort: "rep",
        order: "desc",
        whitelisted: false,
        page: 1,
        limit: 20,
    },
    time: false,
    mobileSearch: false,
  },
  getters: {
    filter(state) {
      return state.filter;
    }
  },
  mutations: {
    clearState(state) {
      Object.assign(state, { ...initialState });
    },
    clearFilter(state) {
      Object.assign(state.filter, {
        asn_op: 'OR',
        country_op: 'OR',
        source_op: 'OR',
        cat_op: 'OR',
        bl_op: 'OR',
        tag_op: 'OR',
        subnet: null,
        hostname: null,
        country: null,
        asn: null,
        cat: null,
        source: null,
        blacklist: null,
        tag: null,
        sort: "rep",
        order: "desc",
        whitelisted: false,
        page: 1,
        limit: 20,
      });
    },
    setUserInfo(state, userInfo) {
      state.userInfo = {
        ...userInfo
      };
      state.userInfo.loggedIn = true;
    },
  },
  actions: {
    async getUserInfo({ commit }) {
      const userInfo = {};
      userInfo.loggedIn = true;
      commit('setUserInfo', userInfo);
    },
    async userInfoNotLogged({ commit }) {
      const userInfo = {
        loggedIn: false,
      };
      commit('setUserInfo', userInfo);
    },
    async clearFilterAction({ commit }) {
      commit('clearFilter');
    },
},
});

export default store;
