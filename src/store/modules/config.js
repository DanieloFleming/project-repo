
const ConfigModule = {
  state: {
    windowHeight: null,
    pageHeight: null,
    scrollPosition: 0,
    device: null,
    scrollable: true,
    scrolling: false,
    traceShape: null
  },
  getters: {
    scrollPosition: state => state.scrollPosition,
    windowHeight: state => state.windowHeight,
    pageHeight: state => state.pageHeight,
    scrollable: state => state.scrollable,
    isMobile: state => state.device === 'mobile',
    scrolling: state => state.scrolling,
    traceShape: state => state.traceShape
  },
  mutations: {
    setScrollPosition (state, position) {
      state.scrollPosition = position;
    },
    setWindowHeight (state, height) {
      state.windowHeight = height;
    },
    setPageHeight (state, height) {
      state.pageHeight = height;
    },
    setMobile (state) {
      state.device = 'mobile';
    },
    setScrollable (state, isScrollable) {
      state.scrollable = isScrollable;
    },
    setScrolling (state, isScrolling) {
      state.scrolling = isScrolling;
    },
    setTraceShape (state, shape) {
      state.traceShape = shape;
    }
  }
};

export default ConfigModule;
