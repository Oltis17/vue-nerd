<template>
  <div id="app">
    <TopBar />
    <div id="wrapper">
      <div id="wrapper-search">
        <SearchForm />
      </div>
      <div id="wrapper-results">
        <ResultsComp />
      </div>
    </div>
    <FooterComp />
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue';
import SearchForm from './components/SearchForm.vue';
import ResultsComp from './components/ResultsComp.vue';
import FooterComp from './components/FooterComp.vue';

export default {
  name: 'App',
  components: {
    TopBar,
    SearchForm,
    ResultsComp,
    FooterComp,
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
    height: 90vh;
    overflow: scroll;
  }
}

@media (min-width: 801px) {
  #wrapper-search {
    width: 290px;
  }

  #wrapper-results {
    width: calc(100% - 290px);
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
