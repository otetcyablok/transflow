import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import routesJSON from './data.json';

Vue.use(Vuex);

const apiURL = 'https://220.transflow.ru/api/public/v1/routes_data?key=012345678abc';

function prepareStop(rawStop) {
  return {
    id: rawStop.ID,
    name: rawStop.Name,
    point: [rawStop.Lat, rawStop.Lon],
    forward: rawStop.Forward,
  };
}
function prepareRoute(rawRoute) {
  return {
    id: rawRoute.ID,
    name: rawRoute.Name,
    description: rawRoute.Description,
    stopsLength: rawRoute.Stops.length,
    points: rawRoute.Stops.map((point) => [point.Lat, point.Lon]),
    stops: rawRoute.Stops.map((rawStop) => prepareStop(rawStop)),
  };
}

export default new Vuex.Store({
  state: {
    loadingRoutes: false,
    rawRoutes: [routesJSON[0]],
    // rawRoutes: [],
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
    setLoading(state, isLoading) {
      state.loadingRoutes = isLoading;
    },
    setRawRoutes(state, routes) {
      state.rawRoutes = routes;
    },
  },
  actions: {
    async fetchRoutes({ commit, state }) {
      // TODO: remove next line
      if (state.rawRoutes.length) return;

      let routes = [];

      commit('setLoading', true);
      try {
        ({ data: routes } = await axios.get(apiURL));
      } catch (e) {
        // TODO: implement catch behaviour
      }
      commit('setLoading', false);
      commit('setRawRoutes', routes);
    },
  },
  modules: {
  },
});
