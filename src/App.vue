<template>
  <div id="app">
    <TopBar />
    <div id="wrapper">
      <div id="wrapper-search">
        <SearchForm />
      </div>
      <div id="wrapper-results">
        <Results />
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue';
import SearchForm from './components/SearchForm.vue';
import Results from './components/Results.vue';

export default {
  name: 'App',
  components: {
    TopBar,
    SearchForm,
    Results,
  },
};
</script>

<style>
@media (max-width: 800px) {
  #wrapper {
    display: inline-block;
  }

  #wrapper-search {
    width: 0px;
    display: none;
  }

  #wrapper-results {
    width: 100%;
  }
}

@media (min-width: 801px) {
  #wrapper-search {
    width: 320px;
  }

  #wrapper-results {
    width: calc(100% - 320px);
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}

body {
  background-color: #00031c;
  margin: 0;
}

#wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
}
</style>
