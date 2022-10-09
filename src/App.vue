<script setup lang="ts">
import CurrencySelector from "./components/CurrencySelector.vue";
</script>

<template>
  <CurrencySelector />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: white;
}

#app {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
