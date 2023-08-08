<template>
  <MainLayout :loading="loadingRoutes">
    <template v-slot:sidebar>
      <div class="sidebar-content">
        <tabs
          v-model="tabActive"
          :tabs="preparedTabs"
          class="sidebar-tabs"
        />
        <RoutesTable v-show="tabActive === tabs.ROUTES" />
        <StopsTable v-show="tabActive === tabs.STOPS" />
      </div>
    </template>
    <template v-slot:content>
      <leaflet-map />
    </template>
  </MainLayout>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import LeafletMap from '@/components/Map.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import RoutesTable from '@/components/RoutesTable.vue';
import StopsTable from '@/components/StopsTable.vue';
import Tabs from '@/components/Tabs.vue';

export default {
  name: 'IndexPage',
  components: {
    LeafletMap,
    MainLayout,
    RoutesTable,
    StopsTable,
    Tabs,
  },
  created() {
    this.fetchRoutes();
  },
  computed: {
    ...mapState(['loadingRoutes', 'tabs']),
    ...mapGetters(['routes']),
    preparedTabs() {
      return [{
        value: this.tabs.ROUTES,
        label: 'Маршруты',
      }, {
        value: this.tabs.STOPS,
        label: 'Остановки',
      }];
    },
    tabActive: {
      get() {
        return this.$store.state.tabActive;
      },
      set(value) {
        this.$store.commit('setActiveTab', value);
      },
    },
  },
  methods: {
    ...mapActions(['fetchRoutes']),
  },
};
</script>

<style scoped>
.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-tabs {
  display: flex;
  padding: 6px;
  justify-content: space-around;
}
</style>
