// initial state
const state = () => ({
  category: null,
  currentId: null,
});

// getters
const getters = {
  category: state => state.category,
  currentId: state => state.currentId,
};

// actions
const actions = {
  setCategory({ commit }, payload) {
    commit('SET_ARTICLE_CATEGORY', payload);
  },
  setCurrentId({ commit }, payload) {
    commit('SET_ARTICLE_CURRENT_ID', payload);
  },
};

// mutations
const mutations = {
  SET_ARTICLE_CATEGORY(state, data) {
    sessionStorage.setItem('_articleCategory', data);
    state.category = data;
  },
  SET_ARTICLE_CURRENT_ID(state, data) {
    sessionStorage.setItem('_articleCurrentId', data);
    state.currentId = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
