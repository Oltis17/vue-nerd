<template>
  <!-- <div id="wrapper-res"> -->
    <!-- <div id="results-sorting">
      <div>Order</div>
      <div>Sort by</div>
      <div>Results per page</div>
    </div>
    <div id="results-control">
      <div>1 - 20 of 406</div>
      <div>
        <i class="fa fa-solid fa-angle-left fa-lg"></i>
        <i class="fa fa-solid fa-angle-left fa-lg"></i>
      </div>
      <div>
        <i class="fa fa-solid fa-angle-left fa-lg"></i>
      </div>
      <div>
        <i class="fa fa-solid fa-angle-right fa-lg"></i>
      </div>
      <div>
        <i class="fa fa-solid fa-angle-right fa-lg"></i>
        <i class="fa fa-solid fa-angle-right fa-lg"></i>
      </div>
    </div>
  </div> -->
  <div id="res-table-wrapper" class="is-desktop">
    <perfect-scrollbar>
      <div style="display: flex; justify-content: space-between; color: white; margin-bottom: 15px; padding-left: 20px; padding-right: 20px; align-items: center;">
        <div class="results">
            <label>Results:</label>
            <SelectButton 
            v-model="this.$store.state.filter.limit" 
            :options="resOptions" 
            optionLabel="name" 
            optionValue="code" 
            @change="$parent.filter()"></SelectButton>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <div class="pages">
            <span>Page: {{ $store.state.filter.page }}</span>
            <div>
              <a v-if="$store.state.filter.page != 1" @click="nextPage($store.state.filter.page - 1)" style="color: #212529c6 !important"><i class="fa fa-backward"></i></a>
              <a v-else style="color: #21252982 !important"><i class="fa fa-backward disabled"></i></a>
              <a @click="nextPage($store.state.filter.page + 1)" style="color: #212529c6 !important"><i class="fa fa-forward"></i></a>
            </div>
          </div>
          <div class="down" @click="this.$refs.myRefDown.open()">
            <i class="fa fa-solid fa-download"></i>
          </div>
        </div>

      </div>
      
      <table id="results-table">
        <thead class="result-table-head">
          <!-- <th>IP <span><i class="fa fa-solid fa-arrow-down-wide-short"  v-class="{active: sort === 'ip'}" @click="toggleSort('ip')"></i></span></th>
          <th>Hostname <span><i class="fa fa-solid fa-arrow-down-wide-short" v-class="{active: sort === 'host'}" @click="toggleSort('host')"></i></span></th>
          <th>ASN <span><i class="fa fa-solid fa-arrow-down-wide-short" v-class="{active: sort === 'asn'}" @click="toggleSort('asn')"></i></span></th>
          <th>Blacklists <span><i class="fa fa-solid fa-arrow-down-wide-short" v-class="{active: sort === 'bl'}" @click="toggleSort('bl')"></i></span></th>
          <th>Tags <span><i class="fa fa-solid fa-arrow-down-wide-short" v-class="{active: sort === 'tag'}" @click="toggleSort('tag')"></i></span></th>
          <th>Rep. score <span><i class="fa fa-solid fa-arrow-down-wide-short" v-class="{active: sort === 'rep'}" @click="toggleSort('rep')"></i></span></th>
          <th></th> -->
          <th>IP <span @click="toggleSort('ip')"><i class="fa fa-solid fa-arrow-down-wide-short" :class="{active: isActive('ip'), desc: isDesc('ip')}"></i></span></th>
          <th>Hostname</th>
          <th>ASN</th>
          <th>Blacklists</th>
          <th>Tags </th>
          <th>Time added <span  @click="toggleSort('ts_added')"><i class="fa fa-solid fa-arrow-down-wide-short" :class="{active: isActive('ts_added'), desc: isDesc('ts_added')}"></i></span></th>
          <th>Last active <span  @click="toggleSort('last_activity')"><i class="fa fa-solid fa-arrow-down-wide-short" :class="{active: isActive('last_activity'), desc: isDesc('last_activity')}"></i></span></th>
          <th>Rep. score <span @click="toggleSort('rep')"><i class="fa fa-solid fa-arrow-down-wide-short" :class="{active: isActive('rep'), desc: isDesc('rep')}"></i></span></th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="ip in results" :key="ip" style="min-width: 180px">
            <td class="result-ip-row">
              <div class="wide">
                <div class="flag" :title="getCountInfo(ip.geo.ctry)" style="border: none">
                  <span>
                    <country-flag :country="toLower(ip.geo.ctry)" size='normal' rounded/>
                  </span>
                </div>
                <a class="result-ip-white" :href="`ip/${ip.ip}`">{{ ip.ip }}</a>
              </div>
              
            </td>
            <td class="result-ip-row">{{ ip.hostname }}</td>
            <td v-if="ip.asn[0]">
              AS{{ ip.asn[0] }}
              <Popper v-if="ip.asn.length > 1"
              class="tooltip"
              :content="otherASN(ip.asn)"
              hover
              placement="right"
              >
                <span> + <span class="link">{{ ip.asn.length - 1 }}</span></span>
              </Popper>
            </td>
            <td v-else>
              -
            </td>
            <!-- <td class="country">
              <Popper
              class="tooltip"
              :content="getCountInfo(ip.geo.ctry)"
              hover
              placement="top"
              >
                <div>
                  <span><country-flag :country="toLower(ip.geo.ctry)" size='normal'/></span>
                  <span class="text">{{ ip.geo.ctry }}</span>
                </div>
              </Popper>
            </td> -->
            <td>
              <Popper
                class="tooltip"
                hover
                placement="right"
              >
                <span class="link">{{ ip.bl.length }}</span>
                <template #content>
                  <span v-if="ip.bl?.length > 0">This IP address is present on {{ ip.bl.length }} blacklists:</span>
                  <span v-else>This IP address is not present on any blacklists.</span>
                  <ul style="text-align: left">
                    <li v-for="b in ip.bl" :key="b">{{ b }}</li>
                  </ul>
                </template>
              </Popper>
            </td>
            <td >
              <div style="display: flex; align-items: flex-start; flex-wrap: wrap;">
                <span v-for="t in ip.tags" :key="t" :class="`tag ${getTag(t.n)?.color}`" :style="`background-color: ${getTag(t.n)?.color}`">
                  {{ getTag(t.n)?.name }}
                </span>
              </div>
              
            </td>
            <td :title="ip.ts_added" style="cursor: help;">{{ formatDateTime(ip.ts_added) }}</td>
            <td :title="ip.ts_last_update" style="cursor: help;">{{  formatDateTime(ip.ts_last_update) }}</td>
            <td>
              <span style="float: left;"><MiniChart :data="[0.1, 0.2, 0.8, 0.5, 0.9]"></MiniChart></span>
              <div :style="'padding-top: 10px; color: ' + rep2Color(ip.rep)">{{ ip.rep.toFixed(3) }}</div>
            </td>
            <td class="row-more">
              <div class="dropdown">
                <Popper
                class="tooltip"
                click
                placement="bottom"
                >
                <span><i class="fa fa-ellipsis-h"></i></span>
                <template #content >
                  <div class="dropdown-content">
                    <a :href="'https://www.shodan.io/host/' + ip.ip" target="_blank">
                      <div>
                        <img src="../assets/shodan_icon.png">
                        <span>Shodan</span>
                      </div>
                    </a>
                    <a :href="'https://search.censys.io/hosts/' + ip.ip" target="_blank">
                      <div>
                        <img src="../assets/censys_icon.png">
                        <span>Censys</span>
                      </div>
                    </a>
                    <a :href="'http://multirbl.valli.org/lookup/' + ip.ip" target="_blank">
                      <div>
                        <img src="../assets/valli_icon.png">
                        <span>valli.org</span>
                      </div>
                    </a>
                    <a :href="'https://www.abuseipdb.com/check/' + ip.ip" target="_blank">
                      <div>
                        <img src="../assets/abuse_ip_db_icon.png">
                        <span>AbuseIPDB</span>
                      </div>
                    </a>
                    <a :href="'https://www.threatcrowd.org/ip.php?ip=' + ip.ip" target="_blank">
                      <div>
                        <img src="../assets/threat_crowd_icon.png">
                        <span>Threat Crowd</span>
                      </div>
                    </a>
                    <a :href="'https://www.talosintelligence.com/reputation_center/lookup?search=' + ip.ip" target="_blank">
                      <div>
                        <img src="../assets/talos_icon.png">
                        <span>Talos Intelligence Center</span>
                      </div>
                    </a>
                    <a :href="'https://viz.greynoise.io/ip/' + ip.ip" target="_blank">
                      <div>
                        <img src="../assets/greynoise-logo.png">
                        <span>Greynoise Visualizer</span>
                      </div>
                    </a>
                    <a :href="'https://isc.sans.edu/ipinfo.html?ip=' + ip.ip" target="_blank">
                      <div>
                        <img src="../assets/dshield_icon.png">
                        <span>DShield</span>
                      </div> 
                    </a>
                  </div>
                </template>
              </Popper>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </perfect-scrollbar>
    
    <div v-if="results?.length == 0" style="position: absolute;  top: 200px;left: 200px; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  width: 200px; /* Need a specific value to work */; color: white;">No results found.</div>
  </div>

  <div class="is-mobile">
    <div class="mobile-sort">
      <div>
        <label>Sort by: </label>
        <Dropdown 
        v-model="this.$store.state.filter.sort" 
        :options="sortOptions" 
        optionLabel="name" 
        optionValue="code" 
        class="w-full md:w-14rem" 
        @change="mobileSort()"
        style="width: 150px; text-align: left;"/>
      </div>
      <div>
        <label>Order: </label>
        <Dropdown 
        v-model="this.$store.state.filter.order" 
        :options="orderOptions" 
        optionLabel="name" 
        optionValue="code" 
        class="w-full md:w-14rem" 
        @change="mobileSort()"
        style="width: 150px; text-align: left;"/>
      </div>
    </div>

      <div class="tab" v-for="ip in results" :key="ip">
        <span class="result-ip-row mobile-ip-row">
          <div>
            <div class="flag" :title="getCountInfo(ip.geo.ctry)" style="border: none">
              <span>
                <country-flag :country="toLower(ip.geo.ctry)" size='normal' rounded/>
              </span>
            </div>
            <a class="result-ip-white" @click="this.$router.push(`ip/${ip.ip}`)">{{ ip.ip }}</a>
          </div>
          <div style="display: flex; align-items: flex-end; flex-direction: column; justify-content: space-between; min-width: 200px;">
            <label>REP. SCORE</label>
            <div style="display: flex; align-items: center;"> 
              <span><MiniChart :data="[0.1, 0.2, 0.8, 0.5, 0.9]"></MiniChart></span>
              <div :style="'color: ' + rep2Color(ip.rep)">{{ ip.rep.toFixed(3) }}</div>
            </div>
            
          </div>   
          </span>
          <div>
            <label>HOSTNAME</label>
            <span>{{ ip.hostname || "-" }}</span>
          </div>
          <div>
            <label>ASN ({{ ip.asn.length }})</label>
            <span>{{ ip.asn.join(", ") }}</span>
          </div>
          <div>
            <label>BLACKLISTS ({{ ip.bl.length }})</label>
            <span style="text-align: left;">{{ ip.bl.join(", ") }}</span>
          </div>
          <div>
            <label>TAGS ({{ ip.tags.length }})</label>
            <span style="margin-top: 5px; display: flex; flex-wrap: wrap;">
              <span v-for="t in ip.tags" :key="t" :class="`tag ${getTag(t.n)?.color}`">
                  {{ getTag(t.n)?.name }}
              </span>
            </span>
          </div>
          <div>
            <label>TIME ADDED</label>
            <span>{{ formatDateTime(ip.ts_added) }}</span>
          </div>
          <div>
            <label>LAST ACTIVITY</label>
            <span>{{ formatDateTime(ip.ts_last_update) }}</span>
          </div>
          <button @click="this.$router.push(`ip/${ip.ip}`)">More details</button>
      </div>
      <div style="width: 90%; margin: auto; display: flex; justify-content: center; align-items: center; color: white; flex-direction: column;">
        <div class="results">
            <label>Results:</label>
            <SelectButton 
            v-model="this.$store.state.filter.limit" 
            :options="resOptions" 
            optionLabel="name" 
            optionValue="code" 
            @change="$parent.filter()"></SelectButton>
        </div>
        <div class="pages">
          <span>Page: {{ $store.state.filter.page }}</span>
          <div>
            <a v-if="$store.state.filter.page != 1" @click="nextPage($store.state.filter.page - 1)"><i class="fa fa-backward"></i></a>
            <a v-else><i class="fa fa-backward disabled"></i></a>
            <a @click="nextPage($store.state.filter.page + 1)"><i class="fa fa-forward"></i></a>
          </div>
        </div>

        <div class="down" @click="this.$refs.myRefDown.open()">
            Download <i class="fa fa-solid fa-download"></i>
          </div>
        
      </div>
  </div>
  <vue-modality :ok-loading="loading" ref="myRefDown" title="Download data" centered @cancel="this.$refs.myRefDown.hide()" hide-ok>
      <p>Download data from this page:</p>
      <button @click="downloadCSV(results, `nerd_data_page_${$store.state.filter.page}.csv`)" class="download">
          <i class="fa fa-solid fa-download"></i>
          <span>Download CSV</span>
      </button>
      <button @click="downloadJSON(results, `nerd_data_page_${$store.state.filter.page}.json`)" class="download">
          <i class="fa fa-solid fa-download"></i>
          <span>Download JSON</span>
      </button>
</vue-modality>
  
</template>

<script>
import ctry_info from '../assets/ctry_strings.json';
import tags from '../assets/tags.json';
import CountryFlag from 'vue-country-flag-next';
import Popper from "vue3-popper";
import moment from 'moment';
import MiniChart from './MiniChart.vue';
import VueModalityV3 from 'vue-modality-v3';

export default {
  props: ['results', 'number'],
  data() {
    return {
      sort: null,
      desc: false,
      chartOptions: {
        type: 'arealine',
        data: "2,4,0,3",
      },
      clicked: null,
      sortOptions: [
        { name: 'Rep. socre', code: 'rep' },
        { name: 'IP', code: 'ip' },
        { name: 'Time added', code: 'ts_added' },
        { name: 'Last activity', code: 'last_activity' },
      ],
      orderOptions: [
        { name: 'Descending ↓', code: 'desc' },
        { name: 'Ascending ↑', code: 'asc' },
      ],
      resOptions: [
        { name: '5', code: 5 },
        { name: '10', code: 10 },
        { name: '20', code: 20 },
        { name: '50', code: 50 },
      ],
    };
  },
  components: {
    CountryFlag,
    Popper,
    MiniChart,
    VueModality: VueModalityV3,
  },
  methods: {
    mobileSort() {
      this.$parent.filter();
    },
    open(ip) {
      this.clicked = ip;
    },
    close() {
      this.clicked = null;
    },
    nextPage(page) {
      this.$store.state.filter.page = page;
      this.$parent.filter();
    },
    formatDateTime(ts) {
      if (this.$store.state.time) {
        return moment.utc(ts).format('DD MMM YYYY HH:mm');
      }
      return moment.utc(ts).local().format('DD MMM YYYY HH:mm');
    },
    toggleSort(what) {
      // double condition to differentiate between first click on filter
      if (this.$store.state.filter.sort === what && this.$store.state.filter.order === "desc") {
        this.$store.state.filter.order = "asc";
      }
      else {
        this.$store.state.filter.order = "desc";
      }
      this.$store.state.filter.sort = what;
      this.$parent.filter();
    },
    isActive(what) {
      return this.$store.state.filter.sort === what;
    },
    isDesc(what) {
      return this.$store.state.filter.sort === what && this.$store.state.filter.order == "asc";
    },
    toLower(str) {
      if (str !== undefined)
      {
        return str.toLowerCase();
      }
     
    },
    rep2Color(value) {
    var hue = ((1-value)*130).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
    },
    getCountInfo(code) {
      return ctry_info[code];
    },
    otherASN(asn) {
      var rest = asn.slice(1); // get rid of first
      var text = "";
      for (var a of rest) {
        text =  text + "AS" + a + " ";
      }
      return text;
    },
    getTag(tag) {
      return tags[tag];
    },
    downloadJSON(data, name) {
        let text = JSON.stringify(data);
        let element = document.createElement('a');
        element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', name);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();
        document.body.removeChild(element);     
    },
     downloadCSV(data, name) {
  let csvContent = '';
  const separator = ',';

  // Get the headers and replace commas if needed
  const headers = Object.keys(data[0]).map(header => {
    if (typeof data[0][header] === 'object') {
      return JSON.stringify(header).replace(/,/g, separator);
    }
    return header.replace(/,/g, separator);
  });
  csvContent += headers.join(separator) + '\n';

  // Get the rows and replace commas if needed
  data.forEach(row => {
    const rowData = Object.values(row).map(value => {
      if (typeof value === 'object') {
        return JSON.stringify(value).replace(/,/g, '|');
      }
      return value.toString().replace(/,/g, '|');
    });
    csvContent += rowData.join(separator) + '\n';
  });

  // Create a blob and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', name + '.csv');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

}
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 800px) {
  #wrapper-res {
    flex-direction: column;
    align-items: center;
  }

  #results-sorting {
    width: 90%;
  }

  #results-control {
    width: 90%;
  }

  .is-desktop {
    display: none;
  }

  .results {
    margin-bottom: 10px;
  }

  .down {
    width: 120px;
    margin: auto !important;
  }

  .pages {
    margin-bottom: 10px;
  }
}

@media (min-width: 801px) {
  .is-mobile {
    display: none;
  }
  #results-sorting {
    width: 50%;
  }

  #results-control {
    width: 35%;
    max-width: 350px;
  }
}
.is-mobile {
    overflow-y: scroll;
    padding-bottom: 80px;
  }

#wrapper-res {
  display: flex;
  justify-content: space-evenly;
  max-width: 900px;
  margin: auto;
  margin-bottom: 20px;
}

#results-sorting {
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  border: 2px solid #42b983;
  color: #42b983;
  border-radius: 19px;
  margin-top: 20px;
  max-width: 500px;
}

#results-control {
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  color: #00031c;
  background-color: #42b983;
  border-radius: 19px;
  margin-top: 20px;
}

#results-table {
  color: white;
  width: calc(100% - 40px);
  margin-left: 20px;
  margin-right: 20px;
  border-collapse: collapse;
  font-size: 14px;
}

#results-table > tbody > tr {
  height: 40px;
  background-color: rgb(250, 250, 250, 0.08);
}

#results-table > tbody > tr > td {
  padding-left: 10px;
  padding-right: 10px;
  border: 5px solid #00031c;
  padding: 5px;
  border-right: 0;
  border-left: 0;
}

.ps {
  height: calc(100vh - 130px);
}

.result-ip {
  background-color: #42b983;
  border-radius: 19px;
  padding: 6px 10px 6px 10px;
  color: #00031c;
  letter-spacing: 2px;
  text-align: left;
}

.result-ip-white {
  border: 1px solid white;
  border-radius: 19px;
  padding: 6px 10px 6px 10px;
  transition: 0.3s ease-out;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 40px;
}

.result-ip-white:hover {
  color: #42b983;
  border: 1px solid #42b983;
  -webkit-box-shadow: 0px 0px 7px 0px rgba(66, 185, 131, 1);
  -moz-box-shadow: 0px 0px 7px 0px rgba(66, 185, 131, 1);
  box-shadow: 0px 0px 7px 0px rgba(66, 185, 131, 1);
}

.result-ip-row {
  text-align: left;
  min-width: 150px;
}

.result-ip-row div {
  position: relative;
}


.result-table-head th span {
  color: rgba(0, 0, 0, 0.511) !important;
  margin-left: 5px;
}

.result-table-head th {
  background-color: rgb(235, 235, 235);
  color: #00031c;
}

.result-table-head:first-child {
  border-radius: 10px 10px 0 0;
  background-color: red;
}

.result-table-head:last-child {
  border-radius: 10px 10px 0 0;
}

.country div {
  display: flex;
  justify-content: space-around;
  width: 65px;
  margin: auto;
}

.country .text {
  display: block;
  padding-top: 11px;
}

.tooltip {
  --popper-theme-background-color: black;
  --popper-theme-background-color-hover: rgb(46, 46, 46);
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 10px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}

table th {
  margin: 0;
  height: 40px;
  position: -webkit-sticky; 
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
}

.row-more {
  cursor: pointer;
}

a {
  color: white;
  text-decoration: none;
}

.link {
  border-bottom: 1px solid white;
  cursor: pointer;
}

#res-table-wrapper {
  margin-top: 20px;
}

.green {
  color: #42b983;
}

.flag {
  position: absolute;
  top: 0px;
  left: 2px;
  border: 0px;
  cursor: help;
}

.wide {
  min-width: 180px;
}

.tag {
  padding: 3px 5px;
  background-color: #42b983;
  border-radius: 4px;
  margin-right: 6px;
  margin-bottom: 2px;
}

.white {
  background-color: #fff;
  color: black;
}

.green {
  background-color: #42b983;
  color: black;
}

.blue {
  background-color: #4295b9;
}

.orange {
  background-color: #d0aa20;
}

.red {
  background-color: #b95042;
}

.active {
  color: #42b983;
}

.desc {
  transform: rotate(180deg);
  color: #42b983;
}

.pages {
  display: flex;
  min-width: 200px;
  font-size: 16px;
  justify-content: space-around;
  align-items: center;
  background-color: #81C784;
  color: #212529;
  padding: 10px 20px;
  border-radius: 20px;
}

.down {
  display: flex;
  min-width: 20px;
  font-size: 16px;
  justify-content: space-around;
  align-items: center;
  background-color: #81C784;
  color: #212529;
  padding: 10px 20px;
  border-radius: 20px;
  margin-left: 10px;
  cursor: pointer;
}

.p-highlight {
  background: #42b983 !important;
}

.results {
  display: flex;
  align-items: center;
  min-width: 200px;
  font-size: 18px;
  justify-content: space-between;
}

.results label {
  padding-right: 15px;
}

.pages > div{
  display: flex;
  width: 70px;
  font-size: 20px;
  justify-content: space-between;
}

.pages a {
  cursor: pointer;
}

.nOfRes {
  display: flex;
  width: 200px;
  font-size: 20px;
  justify-content: space-around;
  border: 2px solid #42b983;
  padding: 10px 20px;
  border-radius: 20px;
}
.dropdown-content img {
  width: 20px;
  margin-right: 10px;
}

.dropdown-content div {
  font-size: 14px;
  width: 200px;
  padding: 5px;
  margin: 5px;
  display: flex;
  align-items: center;
}

.dropdown-content a:hover div {
  background-color: #00031c;
} 

.dropdown:hover .dropdown-content {
  display: block;
}

.tab {
  margin: 15px;
  padding: 15px;
  background-color: #2c2a2a74;
  border: 1px solid rgba(255, 255, 255, 0.501);
  color: #fff;
  width: calc(100% - 30px);
}

.tab > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 25px;
}

.tab label { 
  letter-spacing: 1px;
  color: #ffffffa0;
  margin-bottom: 3px;
}

.tab button {
  background-color: transparent;
  border: 1px solid#42b983;
  padding: 7px 12px;
  font-size: 20px;
  color: #42b983;
  border-radius: 7px;
  cursor: pointer;
}

.mobile-ip-row {
  display: flex;
  justify-content: space-between;
}

.disabled {
  color: #21252957;
  cursor: not-allowed;
}

.mobile-sort {
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
  display: flex;
  justify-content: space-around;
}

.download {
    padding: 5px 8px;
    background-color: transparent;
    color: #42b983;
    border-radius: 7px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #42b983;
    display: flex;
    justify-content: left;
    width: 150px;
}

.download .fa-download {
    margin-right: 15px;
    margin-left: 5px;
}


</style>
