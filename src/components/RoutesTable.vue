<template>
  <ag-grid-vue
    class="ag-theme-alpine full-width full-height"
    rowSelection="single"
    :get-row-id="(params) => params.data.id"
    :modules="modules"
    :columnDefs="columnDefs"
    :rowData="routes"
    :allowContextMenuWithControlKey="true"
    :getContextMenuItems="getContextMenuItems"
    @grid-ready="onGridReady"
    @selection-changed="onSelectionChanged"
  />
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { AgGridVue } from 'ag-grid-vue';
import { MenuModule } from '@ag-grid-enterprise/menu';

export default {
  name: 'RoutesTable',
  components: {
    AgGridVue,
  },
  data() {
    return {
      gridApi: null,
      popupParent: null,
      modules: [MenuModule],
      columnDefs: [{
        field: 'name',
        headerName: 'Название',
        flex: 1,
      }, {
        field: 'stopsLength',
        headerName: 'Остановок',
        flex: 1,
      }],
    };
  },
  computed: {
    ...mapState(['selectedRouteId']),
    ...mapGetters(['routes']),
  },
  watch: {
    selectedRouteId(value) {
      this.syncSelection(value);
    },
  },
  created() {
    this.popupParent = document.querySelector('body');
  },
  methods: {
    getContextMenuItems(params) {
      return [{
        name: 'Подробнее',
        action: () => {
          this.$router.push({
            name: 'route',
            params: { id: params.node.data.id },
          });
        },
      }];
    },
    onGridReady(params) {
      this.gridApi = params.api;

      this.syncSelection(this.selectedRouteId);
    },
    onSelectionChanged() {
      const selectedRows = this.gridApi.getSelectedRows();
      const routeId = selectedRows[0]?.id || null;

      this.$store.commit('setSelectedRouteId', routeId);
    },
    syncSelection(id) {
      const selectedRowsLength = this.gridApi.getSelectedRows().length;

      if (id && !selectedRowsLength) {
        this.gridApi.setNodesSelected({
          nodes: [this.gridApi.getRowNode(id)],
          newValue: true,
        });
      }

      if (!id && selectedRowsLength) {
        this.gridApi.deselectAll();
      }
    },
  },
};
</script>
