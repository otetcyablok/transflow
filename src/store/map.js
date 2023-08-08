const saintPetersburgPoint = [59.938951, 30.315635];

export default {
  namespaced: true,
  state: () => ({
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    zoom: 5,
    center: saintPetersburgPoint,
    bounds: null,
  }),
  mutations: {
    setZoom(state, zoom) {
      state.zoom = zoom;
    },
    setCenter(state, center) {
      state.center = center;
    },
    setBounds(state, bounds) {
      state.bounds = bounds;
    },
  },
};
