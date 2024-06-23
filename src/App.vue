<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script setup>
// TODO: refactor everything:
// - split to components
// - move big functions outside of components
// - maybe move functions to API folder
// - do PWA
// - sort books in alphabetical order?
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