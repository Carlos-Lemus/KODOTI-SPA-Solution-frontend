import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    isLoggedIn: false
  },
  mutations: {

    loginSign(state) {
      state.isLoggedIn = true;
    },
    loginOut(state) {
      state.isLoggedIn = false;
    },
    setUser(state, userData) {
      state.user = userData;
    }

  },
  actions: {
    loginSignAction(context) {
      context.commit('loginSign');
    },
    loginOutAction(context) {
      context.commit('loginOut');
    },
    setUserAction(context, userData) {
      context.commit('setUser', userData);
    }

  },
  modules: {
  },
  getters: {
    statusAccess(state) {
      return state.isLoggedIn;
    },
    user(state) {
      return state.user;
    }
  }
})
