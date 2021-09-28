// initial state
const state = () => ({
  skillTree: [],
  bankSelect: [],
  industryCategoryTree: [],
  jobCatTree: [],
  areaLocalTree: [],
  areaWorldTree: [],
});

// getters
const getters = {
  skillTree: state => state.skillTree,
  bankSelect: state => state.bankSelect,
  industryCategoryTree: state => state.industryCategoryTree,
  jobCatTree: state => state.jobCatTree,
  areaLocalTree: state => state.areaLocalTree,
  areaWorldTree: state => state.areaWorldTree,
};

// actions
const actions = {
  getSkillTree({ commit }) {
    this.$api('getListSkillTree').then(data => {
      commit('GET_SKILL_TREE', data);
    });
  },
  getBankSelect({ commit }) {
    this.$api('getBankSelect').then(data => {
      commit('GET_BANK_SELECT', data);
    });
  },
  getIndustryCategoryTree({ commit }) {
    this.$api('getIndustryCategoryTree').then(data => {
      commit('GET_INDUSTRY_CATEGORY_TREE', data);
    });
  },
  getJobCatTree({ commit }) {
    this.$api('getJobCat').then(data => {
      commit('GET_JOB_CAT_TREE', data);
    });
  },
  getAreaLocalTree({ commit }) {
    this.$api('getArea', { flag: 0 }).then(data => {
      commit('GET_AREA_LOCAL_TREE', data);
    });
  },
  getAreaWorldTree({ commit }) {
    this.$api('getArea', { flag: 1 }).then(data => {
      commit('GET_AREA_WORLD_TREE', data);
    });
  },
};

// mutations
const mutations = {
  GET_SKILL_TREE(state, data) {
    state.skillTree = data;
  },
  GET_BANK_SELECT(state, data) {
    state.bankSelect = data;
  },
  GET_INDUSTRY_CATEGORY_TREE(state, data) {
    state.industryCategoryTree = data;
  },
  GET_JOB_CAT_TREE(state, data) {
    state.jobCatTree = data;
  },
  GET_AREA_LOCAL_TREE(state, data) {
    state.areaLocalTree = data;
  },
  GET_AREA_WORLD_TREE(state, data) {
    state.areaWorldTree = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
