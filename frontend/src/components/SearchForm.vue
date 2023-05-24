<template>
  <div id="search-wrapper">
    <div id="search-form">
      <div class="search-item">
        <div class="title">
          <label title="IPv4 prefix/subnet in CIDR format.">IP prefix</label>
          <div @click="this.$parent.multiIpOpen"><i class="fa fa-solid fa-circle-plus"></i> MULTI</div>
        </div>

        <InputText type="text" v-if="$store.state.filter.subnet == null || $store.state.filter.subnet?.length < 2 || !Array.isArray(this.$store.state.filter.subnet)" v-model="$store.state.filter.subnet" class="multi2" placeholder="Single IP"/>
        <InputText type="text" v-else disabled :value="`MULTI: ${$store.state.filter.subnet?.length} selected`" class="multi2" @click="this.$parent.multiIpOpen"/>
        
      </div>

      <div class="search-item">
        <div class="title">
          <label title="Suffix of the hostname associated with the IP address. Can be used to search all hosts under given (sub)domain.">Hostname suffix</label>
          <div @click="this.$parent.multiHostOpen"><i class="fa fa-solid fa-circle-plus"></i> MULTI</div>
        </div>

        <InputText type="text" v-if="$store.state.filter.hostname == null || $store.state.filter.hostname?.length < 2 || !Array.isArray(this.$store.state.filter.hostname)" v-model="$store.state.filter.hostname" class="multi2" placeholder="Single Hostname"/>
        <InputText type="text" v-else disabled :value="`MULTI: ${$store.state.filter.hostname?.length} selected`" class="multi2" @click="this.$parent.multiHostOpen"/>
      </div>

      <div class="search-item">
        <div class="title">
          <label title="Code of the country the IP address is probably located in (according to MaxMind database).">Country</label>
        </div>

        <MultiSelect 
        v-model="$store.state.filter.country" 
        :options="cities" 
        optionLabel="label" 
        optionValue="value"
        filter 
        optionGroupLabel="label" 
        optionGroupChildren="items" 
        placeholder="Select Countries"
        :maxSelectedLabels="1"
        class="multi2"
        >
        </MultiSelect>
      </div>
      

      <div class="search-item">
        <div class="title">
          <label  title="Autonomous system number. Enter as '1234' or 'AS1234'.">ASN</label>
          <div @click="this.$parent.multiASNOpen"><i class="fa fa-solid fa-circle-plus"></i> MULTI</div>
          <AndOrSwitch v-model="$store.state.filter.asn_op"></AndOrSwitch>
        </div>

        <InputText type="text" v-if="$store.state.filter.asn == null || $store.state.filter.asn?.length < 2 || !Array.isArray(this.$store.state.filter.asn)" v-model="$store.state.filter.asn" class="multi2" placeholder="Single ASN"/>
        <InputText type="text" v-else disabled :value="`MULTI: ${$store.state.filter.asn?.length} selected`" class="multi2" @click="this.$parent.multiASNOpen"/>
      </div>

      <div class="search-item">
        <div class="title">
          <label  title="Select IP addresses for which there are data (alerts, events, ...) from given primary data source(s).">Source</label>
          <AndOrSwitch v-model="$store.state.filter.source_op"></AndOrSwitch>
        </div>
        <MultiSelect 
        v-model="$store.state.filter.source" 
        :options="sources" 
        optionLabel="name" 
        optionValue="short" 
        placeholder="Select Sources"
        :maxSelectedLabels="1"
        class="multi2"
        >
        </MultiSelect>
      </div>

      <div class="search-item">
        <div class="title">
          <label title="Select IP addresses with Warden alerts of given category.">Event category</label>
          <AndOrSwitch v-model="$store.state.filter.cat_op"></AndOrSwitch>
        </div>
        <MultiSelect 
        v-model="$store.state.filter.cat" 
        :options="categories" 
        placeholder="Select Categories"
        :maxSelectedLabels="1"
        class="multi2"
        >
        </MultiSelect>
      </div>

      <div class="search-item">
        <div class="title">
          <label title="Select IP addresses listed on given blacklist(s).">Blacklist</label>
          <AndOrSwitch v-model="$store.state.filter.bl_op"></AndOrSwitch>
        </div>
        <MultiSelect 
        v-model="$store.state.filter.blacklist" 
        filter
        :options="blacklists" 
        optionLabel="name" 
        optionValue="short" 
        placeholder="Select Blacklists"
        :maxSelectedLabels="1"
        class="multi2"
        >
        </MultiSelect>
      </div>

      <div class="search-item">
        <div class="title">
          <label title="Select IP addresses with given tag(s).">Tag</label>
          <AndOrSwitch v-model="$store.state.filter.tag_op"></AndOrSwitch>
        </div>
        <MultiSelect 
        v-model="$store.state.filter.tag" 
        :options="tags" 
        optionLabel="name" 
        optionValue="short" 
        placeholder="Select Tags"
        :maxSelectedLabels="1"
        class="multi2"
        >
        </MultiSelect>
      </div>
      <div style="color: white; padding: 10px;">
        <input type="checkbox" v-model="$store.state.filter.whitelisted" style="accent-color: #42b983;"> Hide whitelisted
      </div>
      <div class="search-btns">
        <button class="search-btn-green" @click="this.$parent.filter()">Apply</button>
        <button class="clear-btn-white" @click="this.$parent.clear()">Clear all</button>
      </div>
    </div>

  </div>
</template>

<script>
// import VueMultiselect from 'vue-multiselect';
import AndOrSwitch from './AndOrSwitch.vue';
import ctry_list from '../assets/ctry_list.json';
import ctry_strings from '../assets/ctry_strings.json';
import tags_file from '../assets/tags_for_select.json';
import sources from '../assets/sources.json';
import blacklists from '../assets/blacklists.json';


export default {
  data() {
    return {
      asn_op: 'OR',
      source_op: 'OR',
      cat_op: 'OR',
      bl_op: 'OR',
      tag_op: 'OR',
      ipOptions: [],
      hostOptions: [],
      asnOptions: [],
      countries: ctry_list,
      sources: sources,
      categories: ["AnomalyBehaviour", "AnomalyTraffic", "AttemptExploit", "AttemptLogin", "AvailabilityDDoS", "AvailabilityDoS", "IntrusionBotnet", "IntrusionUserCompromise", "Malware", "Other", "ReconScanning", "ReconScanning+AttemtExploit", "VulnerableConfig", "VulnerableOpen"],
      tags: tags_file,
      selectedCities: null,
      cities: ctry_strings,
      blacklists: blacklists,
    };
  },
  components: {
    // VueMultiselect,
    AndOrSwitch,
  },
  methods: {
    addTag(newTag) {
      if (newTag.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/g))
      {
        this.ipOptions.push(newTag);
      }
      
    },
    addTagHost(newTag) {
      if (newTag.match(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi))
      {
        this.hostOptions.push(newTag);
      }
      
    },
    addTagAsn(newTag) {
      if (newTag.match(/^AS[0-9]*?/g))
      {
        this.asnOptions.push(newTag);
      }
      
    },
    getCountries(c) {
      var list = [];
      for (var count of c) {
        list.push(c[count]);
      }
      return list;
    },
    search() {

    },
  },
  mounted() {
    console.log([Object.keys(ctry_strings).map((k) => { return { name: ctry_strings[k], code: k } })]);
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 800px) {

  #search-wrapper {
  position: relative !important;
  border-right: none !important;
  overflow-y: scroll !important;
  height: 85vh;
  padding-bottom: 50px;
  }

  #search-form {
    overflow-y: scroll !important;
    height: 90vh;
  }

  .search-item .title label {
    font-size: 16px !important;
  }
}

@media (max-height: 650px) {
  #search-form {
    padding-bottom: 200px !important;
  }
  
}


h2 {
  color: #42b983;
}

#search-wrapper {
  position: fixed;
  border-right: 1px solid #42b983;
  -webkit-box-shadow: 7px -2px 14px -2px rgba(66, 185, 131, 0.6);
  -moz-box-shadow: 7px -2px 14px -2px rgba(66, 185, 131, 0.6);
  box-shadow: 7px -2px 14px -2px rgba(66, 185, 131, 0.6);
}

#search-form {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  height: calc(100vh - 50px);
  min-height: 600px;
  overflow-y: auto;
}

#search-form label {
  padding-bottom: 10px;
  font-size: 12px;
  cursor: help;
}

.search-item {
  display: flex;
  flex-direction: column;
  text-align: left;
  color: #aaaaaa;
  letter-spacing: 1px;
  margin: auto;
  margin-bottom: 15px;
}

.search-item .title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

#search-top-buttons {
  background-color: #42b983;
}

#search-top-buttons div {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 5px;
  padding-right: 5px;
  width: 50%;
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 1px;
}

.search-btn-no-selected {
  background-color: #42b983;
  border-radius: 0px 0px 0px 10px;
  color: #00031c;
}

.search-btn-selected {
  background-color: #00031c;
  border-radius: 0px 19px 0px 0px;
  color: #eeeeee;
}

#search-top-buttons {
  display: flex;
  width: 100%;
  justify-content: center;
}

.search-btn-green {
  color: #42b983;
  border: 2px solid #42b983;
  background-color: transparent;
  padding: 10px;
  border-radius: 7px;
  cursor: pointer;
}

.search-btn-green:hover {
  background-color: #42b983;
  color: #00031c;
  -webkit-box-shadow: 0px 0px 24px -6px rgba(66, 185, 131, 0.76);
  -moz-box-shadow: 0px 0px 24px -6px rgba(66, 185, 131, 0.76);
  box-shadow: 0px 0px 24px -6px rgba(66, 185, 131, 0.76);
}

.clear-btn-white {
  color: #ffffff;
  border: 2px solid #ffffff;
  background-color: transparent;
  padding: 10px;
  border-radius: 7px;
  cursor: pointer;
  transition: 10ms linear;
}

.clear-btn-white:hover {
  background-color: #ffffff;
  color: #00031c;
  -webkit-box-shadow: 0px 0px 24px -6px rgba(255, 255, 255, 0.76);
  -moz-box-shadow: 0px 0px 24px -6px rgba(255, 255, 255, 0.76);
  box-shadow: 0px 0px 24px -6px rgba(255, 255, 255, 0.76);
}

.search-btns {
  padding-top: 10px;
  display: flex;
  justify-content: space-evenly;
}

.multi {
  width: 220px;
  height: 20px !important;
  font-size: 12px;
  letter-spacing: normal;
}

.multi2 {
  width: 220px;
  height: 35px !important;
  font-size: 12px;
  letter-spacing: normal;
}

.multiselect__tags {
  background: #42b983 !important;
  font-size: 12px;
}

.smaller {
  font-size: 12px;
}

.p-multiselect-item {
  font-size: 12px !important;
}

:deep(.p-multiselect-item) {
  font-size: 12px !important;
  color: red;
}

.title > div {
  display: block;
  cursor: pointer !important;
  font-size: 14px;
  color: #42b983;
  font-weight: bold;
}
</style>


