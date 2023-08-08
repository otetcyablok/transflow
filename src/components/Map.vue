<template>
  <l-map
    ref="map"
    class="full-width full-height"
    :zoom.sync="zoom"
    :center.sync="center"
    :bounds.sync="bounds"
  >
    <l-tile-layer :url="url" />
    <template v-for="route in routes">
      <l-polyline
        :ref="`route-${route.id}`"
        :key="route.name"
        :lat-lngs="route.points"
        :color="'green'"
        :fill-opacity="0"
        :visible="selectedRouteId
              ? selectedRouteId === route.id
              : tabActive === tabs.ROUTES"
        @click="onRouteClick(route)"
      >
        <!-- TODO: tooltip on above pointer -->
        <l-tooltip :options="{ direction: 'top' }">{{ route.name }}</l-tooltip>
      </l-polyline>
      <l-marker
        v-for="stop in route.stops"
        :key="`${route.id} ${stop.id} ${stop.forward ? 'forward' : 'backward'}`"
        :ref="`stop-${stop.id}`"
        :lat-lng="stop.point"
        :icon="stop.forward ? iconForward : iconBackward"
        :visible="selectedRouteId
              ? selectedRouteId === stop.routeId
              : (!selectedStopId || selectedStopId === stop.id)"
      >
        <l-tooltip :options="{ direction: 'top' }">{{ stop.name }}</l-tooltip>
      </l-marker>
    </template>
  </l-map>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import L from 'leaflet';
import {
  LMap,
  LTileLayer,
  LMarker,
  LPolyline,
  LTooltip,
} from 'vue2-leaflet';

const iconCommons = {
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  // tooltipAnchor: [0, 0],
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
  name: 'LeafletMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LTooltip,
  },
  data() {
    return {
      iconForward,
      iconBackward,
    };
  },
  computed: {
    ...mapState({
      url: (state) => state.map.url,
      selectedRouteId: 'selectedRouteId',
      selectedStopId: 'selectedStopId',
      tabActive: 'tabActive',
      tabs: 'tabs',
    }),
    ...mapGetters(['routes']),
    zoom: {
      get() {
        return this.$store.state.map.zoom;
      },
      set(value) {
        this.$store.commit('map/setZoom', value);
      },
    },
    center: {
      get() {
        return this.$store.state.map.center;
      },
      set(value) {
        this.$store.commit('map/setCenter', value);
      },
    },
    bounds: {
      get() {
        return this.$store.state.map.bounds;
      },
      set(value) {
        this.$store.commit('map/setBounds', value);
      },
    },
  },
  watch: {
    selectedRouteId(id) {
      if (!id) return;

      this.bindMapToRoute(id);
    },
    selectedStopId(id) {
      if (!id) return;

      this.centerMapOnStop(id);
    },
    tabActive(tab) {
      if (tab === this.tabs.ROUTES) {
        this.$store.commit('setSelectedStopId', null);
      } else if (tab === this.tabs.STOPS) {
        this.$store.commit('setSelectedRouteId', null);
      }
    },
  },
  methods: {
    onRouteClick(route) {
      const routeId = this.selectedRouteId && this.selectedRouteId === route.id
        ? null
        : route.id;

      this.$store.commit('setSelectedRouteId', routeId);
    },
    bindMapToRoute(id) {
      const routeEl = this.$refs[`route-${id}`][0];

      this.$refs.map.mapObject.fitBounds(routeEl.mapObject.getBounds());
    },
    centerMapOnStop(id) {
      const stopEl = this.$refs[`stop-${id}`][0];

      this.$refs.map.mapObject.flyTo(stopEl.mapObject.getLatLng(), 12);
    },
  },
};
</script>
