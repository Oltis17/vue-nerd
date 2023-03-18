<template>
  <div id="search-wrapper">
    <div id="search-form">
      <!-- <div id="search-top-buttons">
        <div class="search-btn-selected">Specified IP Search</div>
        <div class="search-btn-no-selected">Multiple IP Search</div>
      </div> -->
      <div class="search-item">
        <label>IP prefix</label>
        <VueMultiselect
        :multiple="true"
        :taggable="true"
        @tag="addTag"
        tag-placeholder="Add"
        placeholder="IPs"
        v-model="$store.state.filter.subnet"
        :options="ipOptions"
        :hide-selected="true" 
        class="multi"
        :optionHeight="20">
        <template #noResult>
          Duplicate IP
        </template>
        <template #noOptions>
          Type an IP address
        </template>

        </VueMultiselect>
      </div>

      <div class="search-item">
        <label>Hostname suffix</label>
        <VueMultiselect
        :multiple="true"
        :taggable="true"
        @tag="addTagHost"
        tag-placeholder="Add"
        placeholder="Hosts"
        v-model="$store.state.filter.hostname"
        :options="hostOptions"
        :hide-selected="true" 
        class="multi">
        <template #noResult>
          Duplicate host
        </template>
        <template #noOptions>
          Type a host address
        </template>

        </VueMultiselect>
      </div>

      <div class="search-item">
        <div class="title">
          <label>Country</label>
        </div>

        <VueMultiselect
        :multiple="true"
        placeholder="Countries"
        v-model="$store.state.filter.country"
        :options="countries"
        :hide-selected="true" 
        selectLabel="Select"
        class="multi">
        <template #noResult>
          Duplicate country
        </template>
        <template #noOptions>
          Type a country
        </template>

        </VueMultiselect>
      </div>

      <div class="search-item">
        <div class="title">
          <label>ASN</label>
          <AndOrSwitch v-model="$store.state.filter.asn_value"></AndOrSwitch>
        </div>
        
        <VueMultiselect
        :multiple="true"
        :taggable="true"
        @tag="addTagAsn"
        tag-placeholder="Add"
        placeholder="ASNs"
        v-model="$store.state.filter.asn"
        :options="asnOptions"
        :hide-selected="true" 
        class="multi">
        <template #noResult>
          Duplicate ASN
        </template>
        <template #noOptions>
          Type an ASN
        </template>

        </VueMultiselect>
      </div>

      <div class="search-item">
        <div class="title">
          <label>Source</label>
          <AndOrSwitch v-model="$store.state.filter.source_value"></AndOrSwitch>
        </div>
        <VueMultiselect
        :multiple="true"
        placeholder="Sources"
        v-model="$store.state.filter.cat"
        :options="sources"
        :hide-selected="true" 
        selectLabel="Select"
        class="multi">
        <template #noResult>
          Duplicate source
        </template>
        <template #noOptions>
          Type a source
        </template>

        </VueMultiselect>
      </div>

      <div class="search-item">
        <div class="title">
          <label>Event category</label>
          <AndOrSwitch v-model="$store.state.filter.cat_value"></AndOrSwitch>
        </div>
        <VueMultiselect
        :multiple="true"
        placeholder="Categories"
        v-model="$store.state.filter.cat"
        :options="sources"
        :hide-selected="true" 
        selectLabel="Select"
        class="multi">
        <template #noResult>
          Duplicate source
        </template>
        <template #noOptions>
          Type a source
        </template>

        </VueMultiselect>
      </div>

      <div class="search-item">
        <div class="title">
          <label>Blacklist</label>
          <AndOrSwitch v-model="$store.state.filter.bl_value"></AndOrSwitch>
        </div>
        <VueMultiselect
        :multiple="true"
        placeholder="Blacklists"
        v-model="$store.state.filter.blacklist"
        :options="sources"
        :hide-selected="true" 
        selectLabel="Select"
        class="multi">
        <template #noResult>
          Duplicate source
        </template>
        <template #noOptions>
          Type a source
        </template>

        </VueMultiselect>
      </div>

      <div class="search-item">
        <div class="title">
          <label>Tag</label>
          <AndOrSwitch v-model="$store.state.filter.tag_value"></AndOrSwitch>
        </div>
        <VueMultiselect
        :multiple="true"
        placeholder="Tags"
        v-model="$store.state.filter.tag"
        :options="tags"
        :hide-selected="true" 
        selectLabel="Select"
        track-by="tag"
        label="name"
        class="multi">
        <template #noResult>
          Duplicate source
        </template>
        <template #noOptions>
          Type a source
        </template>

        </VueMultiselect>
      </div>
      <div style="color: white; padding: 10px;">
        <input type="checkbox"> Hide whitelisted
      </div>
      <div class="search-btns">
        <button class="search-btn-green" @click="this.$parent.filter()">Apply</button>
        <button class="clear-btn-white" @click="this.$parent.clear()">Clear all</button>
      </div>
    </div>
  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect';
import AndOrSwitch from './AndOrSwitch.vue';
import ctry_list from '../assets/ctry_list.json';
import tags from '../assets/tags.json';

export default {
  data() {
    return {
      asn_value: 'OR',
      source_value: 'OR',
      cat_value: 'OR',
      bl_value: 'OR',
      tag_value: 'OR',
      selectedIps: [],
      ipOptions: [],
      selectedHosts: [],
      hostOptions: [],
      selectedAsns: [],
      asnOptions: [],
      selectedCount: [],
      countries: ctry_list,
      selectedSource: [],
      sources: ["Warden", "Blacklists", "DShield", "OTX", "MISP"],
      selectedTag: [],
      tags: tags, // TODO if logged in add option  { "name": "MISP (tlp:green)", "tag": "misp_tlp_green"},
    };
  },
  components: {
    VueMultiselect,
    AndOrSwitch,
  },
  methods: {
    addTag(newTag) {
      if (newTag.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/g))
      {
        this.ipOptions.push(newTag);
        this.selectedIps.push(newTag);
      }
      
    },
    addTagHost(newTag) {
      if (newTag.match(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi))
      {
        this.hostOptions.push(newTag);
        this.selectedHosts.push(newTag);
      }
      
    },
    addTagAsn(newTag) {
      if (newTag.match(/^AS[0-9]*?/g))
      {
        this.asnOptions.push(newTag);
        this.selectedAsns.push(newTag);
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
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 800px) {
}

@media (max-height: 700px) {
  #search-form {
    overflow: auto;
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
  min-height: calc(100vh - 70px);
}

#search-form label {
  padding-bottom: 10px;
  font-size: 12px;
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

.search-item input {
  background-color: transparent;
  color: white;
  border-radius: 7px;
  border: 1px solid #cccccc;
  height: 20px;
  width: 200px;
  padding-left: 7px;
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

.multiselect__tags {
  background: #42b983 !important;
  font-size: 12px;
}
</style>

