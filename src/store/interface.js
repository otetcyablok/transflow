const TABS = {
  ROUTES: 'routes',
  STOPS: 'stops',
};

export default {
  state: {
    tabActive: TABS.ROUTES,
    tabs: Object.freeze(TABS),
  },
  mutations: {
    setActiveTab(state, tab) {
      state.tabActive = tab;
    },
  },
};
