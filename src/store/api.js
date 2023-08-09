import { fetchRoutes } from '@/api';
import { prepareRoute } from '@/api/helpers';

export default {
  state: {
    dataLoaded: false,
    loadingRoutes: false,
    rawRoutes: [],
  },
  getters: {
    routesById(state) {
      return state.rawRoutes.reduce((accum, rawRoute) => {
        const route = prepareRoute(rawRoute);

        // eslint-disable-next-line no-param-reassign
        accum[route.id] = route;

        return accum;
      }, {});
    },
    routes(state, getters) {
      return Object.values(getters.routesById);
    },
    stopsById(state, getters) {
      const stops = {};

      getters.routes.forEach((route) => {
        route.stops.forEach((stop) => {
          /*
            Можно было бы добавить дополнительные проверки по id маршрута,
            потому что я заметил остановки с одинаковым id,
            но c разными направлениями на одном и том же маршруте
          */
          if (stops[stop.id]) {
            stops[stop.id].includeInRoutesCount += 1;
          } else {
            stops[stop.id] = {
              ...stop,
              includeInRoutesCount: 1,
            };
          }
        });
      });

      return stops;
    },
    stops(state, getters) {
      return Object.values(getters.stopsById);
    },
  },
  mutations: {
    setDataLoaded(state, isLoaded) {
      state.dataLoaded = isLoaded;
    },
    setLoading(state, isLoading) {
      state.loadingRoutes = isLoading;
    },
    setRawRoutes(state, routes) {
      state.rawRoutes = routes;
    },
  },
  actions: {
    async fetchRoutes({ commit, state }) {
      if (state.dataLoaded) return;

      let routes = [];

      commit('setLoading', true);
      try {
        routes = await fetchRoutes();
      } catch (e) {
        // TODO: implement catch behaviour
      }
      commit('setLoading', false);
      commit('setDataLoaded', true);
      commit('setRawRoutes', routes);
    },
  },
};
