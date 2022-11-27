<template>
  <div id="app">
    <TopBar />
    <router-view />
    <FooterComp />
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue';
import FooterComp from './components/FooterComp.vue';

export default {
  name: 'App',
  components: {
      TopBar,
      FooterComp,
  },
  watch: {
      '$route' (to, from) {
        document.title = to.meta.title || 'NERD';
        from;
      }
    },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
  background-color: #00031c;
}

body {
  background-color: #00031c;
  margin: 0;
  overflow: hidden;
}
</style>
