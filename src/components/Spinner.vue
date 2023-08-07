<template>
  <div class="spinner" />
</template>

<script>
export default {
  name: 'CustomSpinner',
};
</script>

<style>
.spinner {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 3px;
  background:
    radial-gradient(farthest-side, lightgray 95%,#0000) 50% 0/12px 12px no-repeat,
    radial-gradient(farthest-side, #0000 calc(100% - 5px), lightgray calc(100% - 4px)) content-box;
  animation: spinner-animation 2s infinite;
}

@keyframes spinner-animation {to{transform: rotate(1turn)}}
</style>
