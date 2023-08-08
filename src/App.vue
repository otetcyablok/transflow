<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import "~ag-grid-community/styles/ag-grid.css";
@import "~ag-grid-community/styles/ag-theme-alpine.css";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.pa-sm {
  padding: 16px;
}

.my-sm {
  margin-top: 16px;
  margin-bottom: 16px;
}

.color-forward {
  color: blue;
}
.color-backward {
  color: red;
}

.button {
  padding: 5px 15px;
  font-size: 14px;
  background: transparent;
  border: 1px solid;
  cursor: pointer;
}

.full-width {
  width: 100%;
}

.full-height {
  height: 100%;
}
</style>
