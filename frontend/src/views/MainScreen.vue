<template>
    <div>
      
      <div id="wrapper">
        <div id="wrapper-search">
          <SearchForm />
        </div>
        <div id="wrapper-results">
          <ResultsComp />
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  import SearchForm from '../components/SearchForm.vue';
  import ResultsComp from '../components/ResultsComp.vue';

  
  export default {
    name: 'App',
    components: {
      SearchForm,
      ResultsComp,
    },
  };
  </script>
  
  <style scoped>
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
  
  body {
    background-color: #00031c;
    margin: 0;
    overflow: hidden;
  }
  
  #wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  </style>
  