<template>
  <MainLayout :loading="loadingRoutes">
    <template v-slot:sidebar>
      <div class="pa-sm">
        <h2>Информация о маршруте</h2>
        <hr class="my-sm" />
        <p v-if="!route">Данные о маршруте с id {{ $route.params.id }} не найдены</p>
        <p v-for="item in info" :key="item.label">
          <b>{{ item.label }}: </b>
          <span v-text="item.value" />
        </p>
        <hr class="my-sm" />
        <button
          class="button"
          @click="$router.push({ name: 'home' })"
        >Назад</button>
      </div>
    </template>
    <template v-slot:content>
      <ag-grid-vue
        v-if="route"
        class="ag-theme-alpine"
        style="height: 100%; width: 100%;"
        :columnDefs="columnDefs"
        :rowData="route.stops"
        :getRowClass="getRowClass"
      />
    </template>
  </MainLayout>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { AgGridVue } from 'ag-grid-vue';

import MainLayout from '@/layouts/MainLayout.vue';

export default {
  name: 'RouteView',
  components: {
    AgGridVue,
    MainLayout,
  },
  data() {
    return {
      columnDefs: [{
        field: 'name',
        headerName: 'Название остановки',
        flex: 1,
      }],
    };
  },
  computed: {
    ...mapState(['loadingRoutes']),
    ...mapGetters(['routesById']),
    route() {
      return this.routesById[this.$route.params.id];
    },
    info() {
      if (!this.route) return [];

      return [{
        label: 'Название',
        value: this.route.name,
      }, {
        label: 'Описание',
        value: this.route.description,
      }, {
        label: 'Остановок в прямом направлении',
        value: this.route.stops.filter((stop) => stop.forward).length,
      }, {
        label: 'Остановок в обратном направлении',
        value: this.route.stops.filter((stop) => !stop.forward).length,
      }];
    },
  },
  created() {
    this.fetchRoutes();
  },
  methods: {
    ...mapActions(['fetchRoutes']),
    getRowClass(params) {
      return params.node.data.forward ? 'color-forward' : 'color-backward';
    },
  },
};
</script>

<style scoped>
p:not(:first-child) {
  margin-top: 16px;
}
</style>
