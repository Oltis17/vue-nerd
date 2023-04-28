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
  <div id="res-table-wrapper">
    <perfect-scrollbar>
      <div style="display: flex; justify-content: space-between; color: white; margin-bottom: 15px; width: 40%; margin-left: auto; margin-right: auto; align-items: center;">
        <div style="width: 600px;">
          <div class="nOfRes" v-if="number">
            <span>Results: {{ number }}</span>
          </div>
        </div>
        
        <div class="pages">
          <span>Page: {{ $store.state.filter.page }}</span>
          <div>
            <a v-if="$store.state.filter.page != 1" @click="nextPage($store.state.filter.page - 1)"><i class="fa fa-backward"></i></a>
            <a @click="nextPage($store.state.filter.page + 1)"><i class="fa fa-forward"></i></a>
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
          <th>Hostname <span @click="toggleSort('host')"><i class="fa fa-solid fa-arrow-down-wide-short" :class="{active: isActive('host')}"></i></span></th>
          <th>ASN <span @click="toggleSort('asn')"><i class="fa fa-solid fa-arrow-down-wide-short" :class="{active: isActive('asn')}"></i></span></th>
          <th>Blacklists <span @click="toggleSort('bl')"><i class="fa fa-solid fa-arrow-down-wide-short" :class="{active: isActive('bl')}"></i></span></th>
          <th>Tags <span  @click="toggleSort('tag')"><i class="fa fa-solid fa-arrow-down-wide-short" :class="{active: isActive('tag')}"></i></span></th>
          <th>Time added <span  @click="toggleSort('tag')"><i class="fa fa-solid fa-arrow-down-wide-short" :class="{active: isActive('ta')}"></i></span></th>
          <th>Last active <span  @click="toggleSort('tag')"><i class="fa fa-solid fa-arrow-down-wide-short" :class="{active: isActive('la')}"></i></span></th>
          <th>Rep. score <span @click="toggleSort('rep')"><i class="fa fa-solid fa-arrow-down-wide-short" :class="{active: isActive('rep'), desc: isDesc('rep')}"></i></span></th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="ip in results" :key="ip">
            <td class="result-ip-row">
              <div class="wide">
                <div class="flag" :title="getCountInfo(ip.geo.ctry)" style="border: none">
                  <span>
                    <country-flag :country="toLower(ip.geo.ctry)" size='normal' rounded/>
                  </span>
                </div>
                <a class="result-ip-white" @click="this.$router.push(`ip/${ip.ip}`)">{{ ip.ip }}</a>
              </div>
              
            </td>
            <td class="result-ip-row">{{ ip.hostname }}</td>
            <td>
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
                  This IP address is present on {{ ip.bl.length }} blacklists:
                  <ul style="text-align: left">
                    <li v-for="b in ip.bl" :key="b">{{ b }}</li>
                  </ul>
                </template>
              </Popper>
            </td>
            <td style="text-align: left">
              <span v-for="t in getTags(ip.tags)" :key="t" :class="`tag ${t.color}`">
                {{ t.name }}
              </span>
            </td>
            <td :title="ip.ts_added" style="cursor: help;">{{ formatDateTime(ip.ts_added) }}</td>
            <td :title="ip.ts_last_update" style="cursor: help;">{{  formatDateTime(ip.ts_last_update) }}</td>
            <td>
              <span style="float: left;"><MiniChart :data="[0.1, 0.2, 0.8, 0.5, 0.9]"></MiniChart></span>
              <div :style="'padding-top: 10px; color: ' + rep2Color(ip.rep)">{{ ip.rep.toFixed(3) }}</div>
            </td>
            <td class="row-more">
              <div class="dropdown">
                <span><i class="fa fa-ellipsis-h"></i></span>
                <div class="dropdown-content">
                  <a :href="'https://www.shodan.io/host/' + ip.ip" target="_blank">
                    <div>
                      <img src="../../public/shodan_icon.png">
                      <span>Shodan</span>
                    </div>
                  </a>
                  <div>
                    <img src="../../public/censys_icon.png">
                    <a :href="'https://search.censys.io/hosts/' + ip.ip" target="_blank">Censys</a>
                  </div>
                  <div>
                    <img src="../../public/censys_icon.png">
                    <a :href="'http://multirbl.valli.org/lookup/' + ip.ip" target="_blank">valli.org</a>
                  </div>
                  <div>
                    <img src="../../public/abuse_ip_db_icon.png">
                    <a :href="'https://www.abuseipdb.com/check/' + ip.ip" target="_blank">AbuseIPDB</a>
                  </div>
                  <div>
                    <img src="../../public/threat_crowd_icon.png">
                    <a :href="'https://www.threatcrowd.org/ip.php?ip=' + ip.ip" target="_blank">Threat Crowd</a>
                  </div>
                  <div>
                    <img src="../../public/talos_icon.png">
                    <a :href="'https://www.talosintelligence.com/reputation_center/lookup?search=' + ip.ip" target="_blank">Talos Intelligence Center</a>
                  </div>
                  <div>
                    <img src="../../public/greynoise-logo.png">
                    <a :href="'https://viz.greynoise.io/ip/' + ip.ip" target="_blank">Greynoise Visualizer</a>
                  </div>
                  <div>
                    <img src="../../public/dshield_icon.png">
                    <a :href="'https://isc.sans.edu/ipinfo.html?ip=' + ip.ip" target="_blank">DShield</a>
                  </div> 
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </perfect-scrollbar>
    <div v-if="results.length == 0" style="position: absolute;  top: 200px;left: 200px; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  width: 200px; /* Need a specific value to work */; color: white;">No results found.</div>
  </div>
  
</template>

<script>
import ctry_info from '../assets/ctry_strings.json';
import CountryFlag from 'vue-country-flag-next';
import Popper from "vue3-popper";
import moment from 'moment';
import MiniChart from './MiniChart.vue';
//import TimeStampVue from '@/components/TimeStamp.vue';

export default {
  props: ['results', 'number'],
  data() {
    return {
      tags: {},
      sort: null,
      desc: false,
      chartOptions: {
        type: 'arealine',
        data: "2,4,0,3",
      },
      clicked: null,
    };
  },
  components: {
    CountryFlag,
    Popper,
    MiniChart,
    //TimeStampVue,
  },
  methods: {
    open(ip) {
      this.clicked = ip;
      console.log('HERE');
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
      if (what === this.$store.state.filter.sort && !this.$store.state.filter.desc) {
        this.$store.state.filter.desc = true;
      }
      else {
        this.$store.state.filter.desc = false;
      }
      this.$store.state.filter.sort = what;
      this.$parent.filter();
    },
    isActive(what) {
      return this.$store.state.filter.sort === what;
    },
    isDesc(what) {
      return this.$store.state.filter.sort === what && this.$store.state.filter.desc;
    },
    toLower(str) {
      return str.toLowerCase();
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
    getTags(tags) {
      let out = [];
      for (const t of tags) {
        let t_out = {
          color: "white",
          name: "Unknown",
        }
        if (t.n == "whitelist") {
          t_out.name = "Whitelisted";
        } 
        else if (t.n == "researchscanners") {
          t_out.name = "Research s.";
          t_out.color = "blue";
        } 
        else if (t.n == "reconscanning") {
          t_out.name = "Scanner";
          t_out.color = "green";
        } 
        else if (t.n == "ip_in_hostname") {
          t_out.name = "IP in hostname";
          t_out.color = "orange";
        } 
        else if (t.n == "attemptlogin") {
          t_out.name = "Login attempts";
          t_out.color = "red";
        } 
        out.push(t_out);
      }
      return out;
    }
  },
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
}

@media (min-width: 801px) {
  #results-sorting {
    width: 50%;
  }

  #results-control {
    width: 35%;
    max-width: 350px;
  }
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
  min-width: 150%;
}

.tag {
  padding: 3px 5px;
  background-color: #42b983;
  border-radius: 4px;
  margin-left: 6px;
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
  width: 300px;
  font-size: 20px;
  justify-content: space-around;
  background-color: #42b983;
  padding: 10px 20px;
  border-radius: 20px;
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
  width: 20%;
  font-size: 20px;
  justify-content: space-around;
  border: 2px solid #42b983;
  padding: 10px 20px;
  border-radius: 20px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #2c2a2a;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
  right: -10px;
  text-align: left;
}

.dropdown-content img {
  width: 20px;
  padding-right: 20px;
}

.dropdown-content div {
  font-size: 14px;
  width: 200px;
  padding: 5px;
  margin: 5px;
  display: flex;
  align-items: center;
}

.dropdown:hover .dropdown-content {
  display: block;
}

</style>
