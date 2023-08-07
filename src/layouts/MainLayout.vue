<template>
  <div class="layout" :class="{ centered: loading }">
    <spinner v-if="loading" />
    <template v-else>
      <div class="layout-sidebar">
        <slot name="sidebar"></slot>
      </div>
      <div class="layout-content">
        <slot name="content"></slot>
      </div>
    </template>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'MainLayout',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Spinner,
  },
};
</script>

<style>
.layout {
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
}
.layout.centered {
  justify-content: center;
  align-items: center;
}
.layout-sidebar {
  flex: 0 0 25%;
}
.layout-content {
  flex: 0 0 75%;
  overflow: hidden;
}
</style>
