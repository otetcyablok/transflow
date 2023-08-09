export default {
  state: {
    selectedRouteId: null,
    selectedStopId: null,
  },
  mutations: {
    setSelectedRouteId(state, id) {
      state.selectedRouteId = id;
    },
    setSelectedStopId(state, id) {
      state.selectedStopId = id;
    },
  },
};
