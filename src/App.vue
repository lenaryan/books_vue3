<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
h1 {
    font-size: 50px;
}
@media (max-width: 640px) {
  h1 {
    font-size: 40px;
  }
}
</style>