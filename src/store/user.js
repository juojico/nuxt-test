// initial state
const state = () => ({
  token: null,
  menu: null,
  isMaster: null,
  oid: null,
  userName: null,
  userEngName: null,
  userIdNumber: null,
  email: null,
  referCode: null,
  captchaCode: null,
  captchaImg: null,
});

// getters
const getters = {
  token: state => state.token,
  menu: state => state.menu,
  isMaster: state => state.isMaster,
  oid: state => state.oid,
  userName: state => state.userName,
  userEngName: state => state.userEngName,
  userIdNumber: state => state.userIdNumber,
  email: state => state.email,
  referCode: state => state.referCode,
  captchaCode: state => state.captchaCode,
  captchaImg: state => state.captchaImg,
};

// actions
const actions = {
  setToken({ commit }, payload) {
    commit('SET_LOGIN_TOKEN', payload);
  },
  setMenu({ commit }, payload) {
    commit('SET_LOGIN_MENU', payload);
  },
  setIsMaster({ commit }, payload) {
    commit('SET_LOGIN_MASTER', payload);
  },
  setOid({ commit }, payload) {
    commit('SET_LOGIN_OID', payload);
  },
  setUserName({ commit }, payload) {
    commit('SET_LOGIN_USERNAME', payload);
  },
  setUserEngName({ commit }, payload) {
    commit('SET_LOGIN_USERENGNAME', payload);
  },
  setUserIdNumber({ commit }, payload) {
    commit('SET_LOGIN_USERIDNUMBER', payload);
  },
  setEmail({ commit }, payload) {
    commit('SET_LOGIN_EMAIL', payload);
  },
  setReferCode({ commit }) {
    this.$api('userGetReferCode').then(data => {
      commit('SET_REFER_CODE', data);
    });
  },
  setCaptchaImg({ commit }) {
    this.$api('captchaImg').then(data => {
      commit('SET_CAPTCHA_CODE', data.code);
      commit('SET_CAPTCHA_IMG', data.image);
    });
  },
  logout({ commit }) {
    commit('CLEAR_LOGIN_TOKEN');
  },
};

// mutations
const mutations = {
  SET_LOGIN_TOKEN(state, data) {
    sessionStorage.setItem('_loginToken', data);
    state.token = data;
  },
  SET_LOGIN_MENU(state, data) {
    sessionStorage.setItem('_loginMenu', data);
    state.menu = data;
  },
  SET_LOGIN_MASTER(state, data) {
    sessionStorage.setItem('_loginIsMaster', data);
    state.isMaster = data;
  },
  SET_LOGIN_OID(state, data) {
    sessionStorage.setItem('_loginOid', data);
    state.oid = data;
  },
  SET_LOGIN_USERNAME(state, data) {
    sessionStorage.setItem('_loginUserName', data);
    state.userName = data;
  },
  SET_LOGIN_USERENGNAME(state, data) {
    sessionStorage.setItem('_loginUserEngName', data);
    state.userEngName = data;
  },
  SET_LOGIN_USERIDNUMBER(state, data) {
    sessionStorage.setItem('_loginUserIdNumber', data);
    state.userIdNumber = data;
  },
  SET_LOGIN_EMAIL(state, data) {
    sessionStorage.setItem('_loginEmail', data);
    state.email = data;
  },
  SET_REFER_CODE(state, data) {
    sessionStorage.setItem('_referCode', data);
    state.referCode = data;
  },
  SET_CAPTCHA_CODE(state, data) {
    sessionStorage.setItem('_captchaCode', data);
    state.captchaCode = data;
  },
  SET_CAPTCHA_IMG(state, data) {
    sessionStorage.setItem('_captchaImg', data);
    state.captchaImg = data;
  },
  CLEAR_LOGIN_TOKEN(state) {
    sessionStorage.removeItem('_loginToken');
    sessionStorage.removeItem('_loginMenu');
    sessionStorage.removeItem('_loginIsMaster');
    sessionStorage.removeItem('_loginOid');
    sessionStorage.removeItem('_loginUserName');
    sessionStorage.removeItem('_loginUserEngName');
    sessionStorage.removeItem('_loginUserIdNumber');
    sessionStorage.removeItem('_loginEmail');
    sessionStorage.removeItem('_referCode');
    state.token = null;
    state.menu = null;
    state.isMaster = null;
    state.oid = null;
    state.userName = null;
    state.email = null;
    state.referCode = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
