<template>
  <ag-grid-vue
    class="ag-theme-alpine full-width full-height"
    rowSelection="single"
    :columnDefs="columnDefs"
    :rowData="stops"
    @grid-ready="onGridReady"
    @selection-changed="onSelectionChanged"
  />
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { AgGridVue } from 'ag-grid-vue';

export default {
  name: 'StopsTable',
  components: {
    AgGridVue,
  },
  data() {
    return {
      gridApi: null,
      columnDefs: [{
        field: 'name',
        headerName: 'Название',
        flex: 2,
      }, {
        field: 'includeInRoutesCount',
        headerName: 'Маршрутов',
        flex: 1,
      }],
    };
  },
  computed: {
    ...mapState({
      selectedStopId: (state) => state.selection.selectedStopId,
    }),
    ...mapGetters(['stops']),
  },
  watch: {
    selectedStopId(value) {
      if (value) return;

      if (this.gridApi.getSelectedRows().length) {
        this.gridApi.deselectAll();
      }
    },
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
    },
    onSelectionChanged() {
      const selectedRows = this.gridApi.getSelectedRows();
      const stopId = selectedRows[0]?.id || null;

      this.$store.commit('setSelectedStopId', stopId);
    },
  },
};
</script>
