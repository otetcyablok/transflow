<template>
  <div>
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="button"
      :disabled="value === tab.value"
      @click="$emit('input', tab.value)"
    >{{ tab.label }}</button>
  </div>
</template>

<script>
export default {
  name: 'CustomTabs',
  props: {
    value: {
      type: String,
      required: true,
    },
    tabs: {
      type: Array,
      default() { return []; },
    },
  },
};
</script>
