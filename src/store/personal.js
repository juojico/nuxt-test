// initial state
const state = () => ({
  basicData: {},
  resumeData: [],
  isEdit: false,
});

// getters
const getters = {
  basicData: state => state.basicData,
  resumeData: state => state.resumeData,
  isEdit: state => state.isEdit,
};

// actions
const actions = {
  setBasicData({ commit }, payload) {
    commit('SET_BASIC_DATA', payload);
  },
  setResumeData({ commit }, payload) {
    commit('SET_RESUME_DATA', payload);
  },
  setFamilyList({ commit }, payload) {
    commit('SET_FAMILY_LIST', payload);
  },
  setEducationList({ commit }, payload) {
    commit('SET_EDUCATION_LIST', payload);
  },
  setExperienceList({ commit }, payload) {
    commit('SET_EXPERIENCE_LIST', payload);
  },
  setLanguageList({ commit }, payload) {
    commit('SET_LANGUAGE_LIST', payload);
  },
  setSkillList({ commit }, payload) {
    commit('SET_SKILL_LIST', payload);
  },
  setIsEdit({ commit }, payload) {
    commit('SET_IS_EDIT', payload);
  },
};

// mutations
const mutations = {
  SET_BASIC_DATA(state, data) {
    state.basicData = data;
  },
  SET_RESUME_DATA(state, data) {
    state.resumeData = data;
  },
  SET_FAMILY_LIST(state, data) {
    state.basicData.userFamilyInfoList = data;
  },
  SET_EDUCATION_LIST(state, data) {
    state.resumeData.userEducationList = data;
  },
  SET_EXPERIENCE_LIST(state, data) {
    state.resumeData.userExperienceList = data;
  },
  SET_LANGUAGE_LIST(state, data) {
    state.resumeData.userLanguageList = data;
  },
  SET_SKILL_LIST(state, data) {
    state.resumeData.userSkillList = data;
  },
  SET_IS_EDIT(state, data) {
    state.isEdit = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
