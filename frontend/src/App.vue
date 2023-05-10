<template>
  <div id="app">
    <TopBar />
    <router-view />
    <FooterComp class="footer"/>
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
@media (max-width: 800px) {
  .footer {
    display: none;
  }
}

.footer {
  background-color: #00031c;
  width: 100% !important;
  margin-left: 100px;
}
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
  height: 100vh;
}

.vue-modality-dialog {
  background-color: #2c3e50;
  background: #2c3e50 !important;
  color: white;
}

.vm-btn {
  border-radius: 7px;
}

.vm-close-btn::before, .vm-close-btn::after {
  background: white;
}

.vm-ok-btn {
  background-color: #42B983;
  color: #00031c;
}
</style>
