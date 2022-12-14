<template>
  <div id="wrapper-res">
    <div id="results-sorting">
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
  </div>
  <div id="res-table-wrapper">
    <perfect-scrollbar>
      <table id="results-table">
        <thead class="result-table-head">
          <th>IP</th>
          <th>Hostname</th>
          <th>ASN</th>
          <th>Country</th>
          <th>Reputation score</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="ip in results" :key="ip">
            <td class="result-ip-row">
              <a class="result-ip-white" :href="`/ip/${ip.ip}`">{{ ip.ip }}</a>
            </td>
            <td>{{ ip.hostname }}</td>
            <td>
              AS{{ ip.asn[0] }}
              <Popper v-if="ip.asn.length > 1"
              class="tooltip"
              :content="otherASN(ip.asn)"
              hover
              placement="right"
              >
                <span> + {{ ip.asn.length - 1 }}</span>
              </Popper>
            </td>
            <td class="country">
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
            </td>
            <td :style="'color: ' + rep2Color(ip.rep)">{{ ip.rep.toFixed(3) }}</td>
            <td class="row-more"><i class="fa fa-ellipsis-h"></i></td>
          </tr>
        </tbody>
      </table>
    </perfect-scrollbar>
  </div>
</template>

<script>
import * as api from '../api';
import ctry_info from '../assets/ctry_strings.json';
import CountryFlag from 'vue-country-flag-next';
import Popper from "vue3-popper";

export default {
  data() {
    return {
      results: null
    };
  },
  components: {
    CountryFlag,
    Popper,
  },
  methods: {
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
  },
  async mounted() {
    this.results = await api.getResults();
    console.log(this.results);
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

tbody td {
  border: 5px solid #00031c;
  padding: 5px;
  border-right: 0;
  border-left: 0;
}

#results-table tr {
  height: 40px;
  background-color: rgb(250, 250, 250, 0.08);
}

#results-table td {
  padding-left: 10px;
  padding-right: 10px;
}

.ps {
  height: calc(100vh - 190px);
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
  padding: 6px;
  transition: 0.3s ease-out;
  cursor: pointer;
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
</style>
