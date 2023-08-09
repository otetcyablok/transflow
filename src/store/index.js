import Vue from 'vue';
import Vuex from 'vuex';

import apiModule from './api';
import interfaceModule from './interface';
import mapModule from './map';
import selectionModule from './selection';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    api: apiModule,
    interface: interfaceModule,
    map: mapModule,
    selection: selectionModule,
  },
});
