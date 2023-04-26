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
        asn_value: 'OR',
        source_value: 'OR',
        cat_value: 'OR',
        bl_value: 'OR',
        tag_value: 'OR',
        subnet: null,
        hostname: null,
        country: null,
        asn: null,
        cat: null,
        source: null,
        cat_op: null,
        blacklist: null,
        bl_op: null,
        tag: null,
        sort: null,
        desc: false,
        whitelisted: false,
        page: 1,
    },
    time: false,

  },
  getters: {
  },
  mutations: {
    clearState(state) {
      Object.assign(state, { ...initialState });
    },
    clearFilter(state) {
      Object.assign(state.filter, {
        asn_value: 'OR',
        country_value: 'OR',
        source_value: 'OR',
        cat_value: 'OR',
        bl_value: 'OR',
        tag_value: 'OR',
        subnet: null,
        hostname: null,
        country: null,
        asn: null,
        cat: null,
        source: null,
        cat_op: null,
        blacklist: null,
        bl_op: null,
        tag: null,
        sort: null,
        desc: false,
        whitelisted: false,
        page: 1,
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
