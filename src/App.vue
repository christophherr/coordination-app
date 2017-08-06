<template>
  <div id="app">
    <navbar></navbar>
    <search></search>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Search from './components/Search.vue';

export default {
  name: 'app',
  components: {
    Navbar,
    Search
  }

}
</script>

<style>
#app {}
</style>
