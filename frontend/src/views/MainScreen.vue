<template>
    <div>
      <!-- MOBILE SEARCH -->
      <div v-if="$store.state.mobileSearch" class="mobile-search is-mobile">
        <SearchForm></SearchForm>
      </div>
      <div id="wrapper" v-if="!$store.state.mobileSearch">
        <div id="wrapper-search">
          <SearchForm />
        </div>
        <div id="wrapper-results">
          <ResultsComp v-if="!loading" :results="res" :number="number"/>
          <div v-if="loading">
            <SkeletonLoader class="is-desktop"></SkeletonLoader>
            <clip-loader :loading="true" :color="color" :size="large" class="is-mobile spinner"></clip-loader>
          </div>
        </div>
      </div>
      </div>

      <vue-modality ref="myRefIpMulti" title="Multiple IPs" centered @cancel="clearMultiIp()" ok-title="Add multiple IPs" class="on-top" @ok="addMultiIp()" cancel-title="Clear">
        <p>You can provide multiple IP addresses (comma separated)</p>
        <textarea v-model="multiIp" class="multiField">
        </textarea>
      </vue-modality>
      <vue-modality ref="myRefHostMulti" title="Multiple Hostnames" centered @cancel="clearMultiHost()" ok-title="Add multiple Hostnames" class="on-top" @ok="addMultiHost()" cancel-title="Clear">
        <p>You can provide multiple Hostnames (comma separated)</p>
        <textarea v-model="multiHost" class="multiField">
        </textarea>
      </vue-modality>
      <vue-modality ref="myRefASNMulti" title="Multiple ASNs" centered @cancel="clearMultiASN()" ok-title="Add multiple ASNs" class="on-top" @ok="addMultiASN()" cancel-title="Clear">
        <p>You can provide multiple ASNs (comma separated)</p>
        <textarea v-model="multiASN" class="multiField">
        </textarea>
      </vue-modality>
      <vue-modality ref="myRefError" title="Warning" centered error hide-ok @cancel="this.$refs.myRefError.hide()">
          {{ message }}
      </vue-modality>
      <FooterComp class="footer"></FooterComp>
      
  </template>
  
  <script>
  import SearchForm from '../components/SearchForm.vue';
  import ResultsComp from '../components/ResultsComp.vue';
  import SkeletonLoader from '../components/SkeletonLoader.vue';
  import FooterComp from '../components/FooterComp.vue';
  import * as api from '../api';
  import VueModalityV3 from 'vue-modality-v3';
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
  
  export default {
    name: 'App',
    data() {
      return {
      res: null,
      loading: true,
      number: null,
      multiIp: null,
      multiHost: null,
      message: null,
      }
    },
    components: {
    SearchForm,
    ResultsComp,
    SkeletonLoader,
    VueModality: VueModalityV3,
    ClipLoader,
    FooterComp,
},
    computed: {
      getFilter() {
        return this.$store.state.filter;
      }
    },
    methods: {
      async filter() {
        this.$store.state.mobileSearch = false;
        this.loading = true;
        if (!Array.isArray(this.$store.state.filter.subnet) && this.$store.state.filter.subnet?.length > 5) {
          this.$store.state.filter.subnet = [this.$store.state.filter.subnet];
        }
        if (!Array.isArray(this.$store.state.filter.hostname) && this.$store.state.filter.hostname?.length > 2) {
          this.$store.state.filter.hostname = [this.$store.state.filter.hostname];
        }
        if (!Array.isArray(this.$store.state.filter.asn) && this.$store.state.filter.asn?.length > 2) {
          this.$store.state.filter.asn = [this.$store.state.filter.asn];
        }
        console.log(this.$route.path);
        // add search params to query
        history.pushState(
          {},
          null,
          this.$route.path +
            'nerd2/?' + JSON.stringify(this.$store.state.filter),
        )
        try {
          this.res = await api.filterResults();
        } catch (e) {
          this.message = e.message;
          this.$refs.myRefError.open();
          this.loading = false;
          return;
        }

        this.number = null;
        this.loading = false;
      },
      async clear() {
        this.$store.state.mobileSearch = false;
        this.loading = true;
        // add search params to query
        this.$router.push({ path: "/" });
        this.$store.dispatch('clearFilterAction');
        this.res = await api.filterResults();
        this.number = null;
        this.loading = false;
      },
      multiIpOpen() {
        this.$refs.myRefIpMulti.open();
      },
      addMultiIp() {
        this.$store.state.filter.subnet = this.multiIp.replaceAll(" ", "").replaceAll("\n", "").split(",");
        this.$refs.myRefIpMulti.hide();
      },
      clearMultiIp() {
        this.$store.state.filter.subnet = null;
        this.$refs.myRefIpMulti.hide();
      },
      multiHostOpen() {
        this.$refs.myRefHostMulti.open();
      },
      addMultiHost() {
        this.$store.state.filter.hostname = this.multiHost.replaceAll(" ", "").replaceAll("\n", "").split(",");
        this.$refs.myRefHostMulti.hide();
      },
      clearMultiHost() {
        this.$store.state.filter.hostname = null;
        this.$refs.myRefHostMulti.hide();
      },
      multiASNOpen() {
        this.$refs.myRefASNMulti.open();
      },
      addMultiASN() {
        this.$store.state.filter.asn = this.multiASN.replaceAll(" ", "").replaceAll("\n", "").split(",");
        this.$refs.myRefASNMulti.hide();
      },
      clearMultiASN() {
        this.$store.state.filter.asn = null;
        this.$refs.myRefASNMulti.hide();
      },
    },
    async mounted() {
      if (Object.keys(this.$route.query)[0] !== undefined) {
        this.$store.state.filter = JSON.parse(Object.keys(this.$route.query)[0]);
        this.multiIp = this.$store.state.filter.subnet?.join(', ');
        this.multiHost = this.$store.state.filter.hostname?.join(', ');
        this.multiASN = this.$store.state.filter.asn?.join(', ');
      }
      else {
        history.pushState(
          {},
          null,
          this.$route.path +
            'nerd2/?' + JSON.stringify(this.$store.state.filter),
        )
      }
      try {
        this.res = await api.filterResults();
      } catch (e) {
        this.message = "An error occured while fetching data. API response error."
        this.$refs.myRefError.open();
        this.loading = false;
        return;
      }
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
      height: 95vh;
      overflow: scroll;
    }

    .is-desktop {
      display: none !important;
    }

    .spinner {
      margin-top: 35vh;
    }
  }
  
  @media (min-width: 801px) {
    #wrapper-search {
      width: 290px;
    }
  
    #wrapper-results {
      width: calc(100% - 290px);
    }

    
  .is-mobile {
      display: none !important;
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

.multiField {
  width: 100%;
  height: 200px;
  padding: 15px;
  resize: none;
}

.mobile-search {
  z-index: 3;
}


.footer {
  background-color: #00031c;
  width: 100% !important;
  margin-left: 100px;
}

  </style>
  