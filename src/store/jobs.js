// initial state
const state = () => ({
  currentCompanyId: null,
  currentJobId: null,
});

// getters
const getters = {
  currentCompanyId: state => state.currentCompanyId,
  currentJobId: state => state.currentJobId,
};

// actions
const actions = {
  setCurrentCompanyId({ commit }, payload) {
    commit('SET_CURRENT_COMPANY_ID', payload);
  },
  setCurrentJobId({ commit }, payload) {
    commit('SET_CURRENT_JOB_ID', payload);
  },
};

// mutations
const mutations = {
  SET_CURRENT_COMPANY_ID(state, data) {
    sessionStorage.setItem('_currentCompanyId', data);
    state.currentCompanyId = data;
  },
  SET_CURRENT_JOB_ID(state, data) {
    sessionStorage.setItem('_currentJobId', data);
    state.currentJobId = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
