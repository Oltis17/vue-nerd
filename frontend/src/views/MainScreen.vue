<template>
    <div>
      
      <div id="wrapper">
        <div id="wrapper-search">
          <SearchForm />
        </div>
        <div id="wrapper-results">
          <ResultsComp v-if="!loading" :results="res"/>
          <SkeletonLoader v-if="loading"></SkeletonLoader>
          <div v-if="!loading" width="100%">
            <div class="darkui2">
              <div class="darkui2-shimmer">
                <div width="100%" height="20px" style="margin-top: 20px"></div>
                <div width="100%" height="20px" style="margin-top: 40px"></div>
                <div width="100%" height="20px" style="margin-top: 60px"></div>
                <div width="100%" height="20px" style="margin-top: 80px"></div>
              </div>
            </div>
        </div>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  import SearchForm from '../components/SearchForm.vue';
  import ResultsComp from '../components/ResultsComp.vue';
  import SkeletonLoader from '../components/SkeletonLoader.vue';
  import * as api from '../api';
  
  export default {
    name: 'App',
    data() {
      return {
      res: null,
      loading: true,
      }
    },
    components: {
      SearchForm,
      ResultsComp,
      SkeletonLoader,
    },
    methods: {
      async filter() {
        this.loading = true;
        // add search params to query
        history.pushState(
          {},
          null,
          this.$route.path +
            '?' +
            Object.keys(this.$store.state.filter)
              .map(key => {
                return (
                  key + '=' + encodeURIComponent(this.$store.state.filter[key] === null ? '' : this.$store.state.filter[key])
                )
              })
              .join('&')
        )
        this.res = await api.filterResults();
        this.loading = false;
      },
      async clear() {
        this.loading = true;
        // add search params to query
        history.pushState(
          {},
          null,
          this.$route.path
        )
        this.$store.dispatch('clearFilterAction');
        this.res = await api.filterResults();
        this.loading = false;
      }
    },
    async mounted() {
      if (this.$route.query.subnet) {
        console.log(this.$route.query.subnet);
        this.$store.state.filter.subnet = this.$route.query.subnet.split(',');
        console.log(this.$store.state.filter.subnet);
      }
      if (this.$route.query.hostname) {
        this.$store.state.filter.hostname = this.$route.query.hostname.split(',');
      }
      if (this.$route.query.asn) {
        this.$store.state.filter.asn = this.$route.query.asn.split(',');
      }
      if (this.$route.query.country) {
        this.$store.state.filter.country = this.$route.query.country.split(',');
      }
      if (this.$route.query.cat) {
        this.$store.state.filter.cat = this.$route.query.cat.split(',');
      }
      if (this.$route.query.blacklist) {
        this.$store.state.filter.blacklist = this.$route.query.blacklist.split(',');
      }
      if (this.$route.query.tag) {
        this.$store.state.filter.tag = this.$route.query.tag.split(',');
      }
      if (this.$route.query.desc) {
        this.$store.state.filter.desc = this.$route.query.desc;
      }
      if (this.$route.query.asn_value) {
        this.$store.state.filter.asn_value = this.$route.query.asn_value;
      }
      if (this.$route.query.country_value) {
        this.$store.state.filter.country_value = this.$route.query.country_value;
      }
      if (this.$route.query.cat_value) {
        this.$store.state.filter.cat_value = this.$route.query.cat_value;
      }
      if (this.$route.query.bl_value) {
        this.$store.state.filter.bl_value = this.$route.query.bl_value;
      }
      if (this.$route.query.tag_value) {
        this.$store.state.filter.tag_value = this.$route.query.tag_value;
      }
      this.res = await api.filterResults();
      this.loading = false;
    }
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

  #loader {
    margin-top: 200px;
  }



  </style>
  