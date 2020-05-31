import cases from '@/assets/cases';

const projectCases = {
  state: {
    cases,
    case: null
  },
  getters: {
    cases: state => {
      return state.cases;
    },
    case: state => slug => {
      return state.cases.find(item => item.slug === slug);
    }
  },
  mutations: {
    setCase (state, slug) {
      state.case = state.cases.find(item => item.slug === slug);
    }
  }
};

export default projectCases;
