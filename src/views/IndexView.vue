<template>
  <MainLayout :loading="loadingRoutes">
    <template v-slot:sidebar>
      <div class="sidebar-content">
        <div>
          <button
            :disabled="activeListId === 'routes'"
            @click="activeListId = 'routes'"
          >Маршруты</button>
          <button
            :disabled="activeListId === 'stops'"
            @click="activeListId = 'stops'"
          >Остановки</button>
        </div>
        <ag-grid-vue
          v-show="activeListId === 'routes'"
          style="width: 100%; height: 100%;"
          class="ag-theme-alpine"
          :columnDefs="routesColumnDefs"
          :rowData="routes"
        />
        <ag-grid-vue
          v-show="activeListId === 'stops'"
          style="width: 100%; height: 100%;"
          class="ag-theme-alpine"
          :columnDefs="stopsColumnDefs"
          :rowData="stops"
        />
      </div>
    </template>
    <template v-slot:content>
      <l-map
        style="height: 100%; width: 100%;"
        :zoom="zoom" :center="routes[0] ? routes[0].stops[0].point : center"
      >
        <l-tile-layer :url="url" />
        <template
          v-for="route in routes"
        >
          <l-polygon
            :key="route.name"
            :lat-lngs="route.points"
            :color="'green'"
            :fill-opacity="0"
          />
          <l-marker
            v-for="stop in route.stops"
            :key="`${route.id} ${stop.id} ${stop.forward ? 'forward' : 'backward'}`"
            :lat-lng="stop.point"
            :icon="stop.forward ? iconForward : iconBackward"
          />
        </template>
      </l-map>
    </template>
  </MainLayout>
</template>

<script>
import L from 'leaflet';
import { mapActions, mapGetters, mapState } from 'vuex';

import { AgGridVue } from 'ag-grid-vue';
import {
  LMap,
  LTileLayer,
  LMarker,
  LPolygon,
} from 'vue2-leaflet';
import MainLayout from '@/layouts/MainLayout.vue';

const iconCommons = {
  iconSize: [26, 26],
  iconAnchor: [13, 13],
};
const iconForward = L.icon({
  ...iconCommons,
  iconUrl: 'marker-forward.svg',
});
const iconBackward = L.icon({
  ...iconCommons,
  iconUrl: 'marker-backward.svg',
});

export default {
  name: 'IndexPage',
  components: {
    AgGridVue,
    LMap,
    LTileLayer,
    LMarker,
    LPolygon,
    MainLayout,
  },
  data() {
    return {
      activeListId: 'routes',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 11,
      center: [59.938951, 30.315635],

      routesColumnDefs: [{
        field: 'name',
        headerName: 'Имя',
      }, {
        field: 'stopsLength',
        headerName: 'Кол-во остановок',
      }],
      stopsColumnDefs: [{
        field: 'name',
        headerName: 'Имя',
      }, {
        field: 'includeInRoutesCount',
        headerName: 'Кол-во маршрутов',
      }, {
        field: 'forward',
        headerName: 'Направление',
      }],
      iconForward,
      iconBackward,
    };
  },
  created() {
    this.fetchRoutes();
  },
  computed: {
    ...mapState(['loadingRoutes']),
    ...mapGetters([
      'routes',
      'stops',
    ]),
  },
  methods: {
    ...mapActions(['fetchRoutes']),
  },
};
</script>

<style>
.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
