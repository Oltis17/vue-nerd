import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const initialState = {
  userInfo: {
    loggedIn: null,
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
        cat_op: null,
        blacklist: null,
        bl_op: null,
        tag: null,
        sort: null,
        desc: false,
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
        cat_op: null,
        blacklist: null,
        bl_op: null,
        tag: null,
        sort: null,
        desc: false,
      });
    },
    setUserInfo(state, userInfo) {
      state.userInfo = {
        ...userInfo
      };
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
