// initial state
const state = () => ({
  loginShow: false,
  registerShow: false,
});

// getters
const getters = {
  loginShow: state => state.loginShow,
  registerShow: state => state.registerShow,
};

// actions
const actions = {
  setLoginShow({ commit }, payload) {
    commit('SET_LOGIN_SHOW', payload);
  },
  setRegisterShow({ commit }, payload) {
    commit('SET_REGISTER_SHOW', payload);
  },
};

// mutations
const mutations = {
  SET_LOGIN_SHOW(state, data) {
    sessionStorage.setItem('_loginShow', data);
    state.loginShow = data;
  },
  SET_REGISTER_SHOW(state, data) {
    sessionStorage.setItem('_registerShow', data);
    state.registerShow = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
