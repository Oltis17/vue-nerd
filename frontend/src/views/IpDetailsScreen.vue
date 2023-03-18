<template>
    <div v-if="!loading" class="wrapper">
        <div class="top-part">
            <div class="badges">
                <div class="ip-badge">
                    <span class="ctr-ip">
                        <span class="flag">
                            <country-flag :country="toLower(details.geo.ctry)"/>
                        </span>
                        {{ ip }}
                    </span>
                    <span>{{ details.hostname }}</span>
                </div>
                <div class="rep-badge" :style="'border: 2px solid ' + rep2Color(details.rep)">
                    <span :style="'color: ' + rep2Color(details.rep)">{{ details.rep.toFixed(3) }}</span>
                </div>
            </div>

            <div class="times">
                <span>
                    <span>Last active:</span>
                    <span>
                        <TimeStampVue :date="details.last_activity"></TimeStampVue>
                    </span>
                </span>

                <span>
                    <span>Last updated:</span>
                    <span>
                        <TimeStampVue :date="details.ts_last_update"></TimeStampVue>
                    </span>
                </span>

                <span>
                    <span>Added:</span>
                    <span>
                        <TimeStampVue :date="details.ts_added"></TimeStampVue>
                    </span>
                </span>
            </div>
        </div>



        <h2>ASN: 
            <span v-for="asn in details.asn" :key="asn">ASN{{ asn._id }}</span>
        </h2>

        <h2>Blacklists: 
            <span v-for="bl in details.bl" :key="bl" class="blacklist-badge">{{ bl.name }}</span>
        </h2>

        <div class="sources">
            <div class="source" :class="{active: wardenfull}" v-if="!dshieldfull && !otxfull">
                <div class="top">
                    <span @click="warden = !warden" class="title">
                        Warden ({{ details.events_meta.total }}): 
                        <span v-if="!warden"> 
                            <i class="fa fa-solid fa-caret-down"></i>
                        </span>

                        <span v-if="warden"> 
                            <i class="fa fa-solid fa-caret-up"></i>
                        </span>
                    </span>
                    <div v-if="warden">
                        <span> 
                            <i class="fa fa-solid fa-download"></i>
                        </span>
                        <span @click="wardenfull = !wardenfull"> 
                            <span v-if="!wardenfull">
                                <i class="fa fa-solid fa-expand"></i>
                            </span>
                            <span v-else>
                                <i class="fa fa-solid fa-close"></i>
                            </span>
                        </span>
                        <span> 
                            <i class="fa fa-solid fa-arrow-up-right-from-square"></i>
                        </span>
                    </div>
                </div>
                <div v-if="details.events_meta.total == 0">
                    No data in the last 30 days
                </div>
                <div  v-if="warden" class="warden">
                    <perfect-scrollbar>
                        <div class="warden-inside">
                            <table>
                                <tr v-for="e in rev_details" :key="e">
                                    <td>
                                        {{ dateOnly(e.date) }}
                                    </td>
                                    <td>
                                        {{ e.cat }}
                                    </td>
                                    <td class="numbers">
                                        {{ e.n }}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </perfect-scrollbar>
                </div>
            </div>
            <div class="source" :class="{active: dshieldfull}" v-if="!wardenfull && !otxfull">
                <div class="top">
                    <span @click="dshield = !dshield" class="title">
                    Dshield: 
                    <span v-if="!dshield"> 
                        <i class="fa fa-solid fa-caret-down"></i>
                    </span>

                    <span v-if="dshield"> 
                        <i class="fa fa-solid fa-caret-up"></i>
                    </span>
                    </span>
                    <div v-if="dshield">
                        <span> 
                            <i class="fa fa-solid fa-download"></i>
                        </span>
                        <span @click="dshieldfull = !dshieldfull"> 
                            <span v-if="!dshieldfull">
                                <i class="fa fa-solid fa-expand"></i>
                            </span>
                            <span v-else>
                                <i class="fa fa-solid fa-close"></i>
                            </span>
                        </span>
                        <span> 
                            <i class="fa fa-solid fa-arrow-up-right-from-square"></i>
                        </span>
                    </div>
                </div>
        
                <div v-if="dshield" class="warden">
                    <perfect-scrollbar>
                        <div class="warden-inside">
                            <table>
                                <dt>2023-01-17</dt>
                                <dd>Number of reports: 2004</dd>
                                <dd>Distinct targets: 365</dd>
                                <dt>2023-01-18</dt>
                                <dd>Number of reports: 1812</dd>
                                <dd>Distinct targets: 379</dd>
                                <dt>2023-01-19</dt>
                                <dd>Number of reports: 1890</dd>
                                <dd>Distinct targets: 392</dd>
                                <dt>2023-01-20</dt>
                                <dd>Number of reports: 1869</dd>
                                <dd>Distinct targets: 391</dd>
                                <dt>2023-01-21</dt>
                                <dd>Number of reports: 2142</dd>
                                <dd>Distinct targets: 413</dd>
                                <dt>2023-01-22</dt>
                                <dd>Number of reports: 2049</dd>
                                <dd>Distinct targets: 415</dd>
                                <dt>2023-01-23</dt>
                                <dd>Number of reports: 2179</dd>
                                <dd>Distinct targets: 427</dd>
                            </table>
                        </div>
                    </perfect-scrollbar>
                </div>
            </div>
            <div class="source" :class="{active: otxfull}" v-if="!wardenfull && !dshieldfull">
                <div class="top">
                    <span @click="otx = !otx" class="title">
                    OTX: 
                    <span v-if="!otx"> 
                        <i class="fa fa-solid fa-caret-down"></i>
                    </span>

                    <span v-if="otx"> 
                        <i class="fa fa-solid fa-caret-up"></i>
                    </span>
                    </span>
                    <div v-if="otx">
                        <span> 
                            <i class="fa fa-solid fa-download"></i>
                        </span>
                        <span @click="otxfull = !otxfull"> 
                            <span v-if="!otxfull">
                                <i class="fa fa-solid fa-expand"></i>
                            </span>
                            <span v-else>
                                <i class="fa fa-solid fa-close"></i>
                            </span>
                        </span>
                        <span> 
                            <i class="fa fa-solid fa-arrow-up-right-from-square"></i>
                        </span>
                    </div>
                </div>
        
                <div v-if="otx" class="warden">
                    <perfect-scrollbar>
                        <div class="warden-inside">
                            <table>
                                <div><b>[<a href="https://otx.alienvault.com/pulse/602bc528f447d628d41494f2">602bc528f447d628d41494f2</a>] 2021-02-16 13:14:16.945000 | Ka&#39;s Honeypot visitors</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>Kapppppa</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1674547056.898>2023-01-24 07:57:36.898000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1674546498.0>2023-01-24 07:48:18</td></tr>
          <tr><td>Indicator role:</td><td>bruteforce</td></tr>
          <tr><td>Indicator title:</td><td>ssh bruteforce attack (Lu)</td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1677135600.0>2023-02-23 07:00:00</td></tr>
         </table>
    </div>
    <div><b>[<a href="https://otx.alienvault.com/pulse/63b6eb269f0a8a60d385b9db">63b6eb269f0a8a60d385b9db</a>] 2023-01-05 15:22:14.634000 | SSH honeypot logs for 2023-01-05</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>jnazario</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1672932134.634>2023-01-05 15:22:14.634000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1672932135.0>2023-01-05 15:22:15</td></tr>
          <tr><td>Indicator role:</td><td>None</td></tr>
          <tr><td>Indicator title:</td><td></td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1675522800.0>2023-02-04 15:00:00</td></tr>
         </table>
    </div>
    <div><b>[<a href="https://otx.alienvault.com/pulse/63b98ddcad524ae41017e35d">63b98ddcad524ae41017e35d</a>] 2023-01-07 15:21:00.493000 | SSH honeypot logs for 2023-01-07</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>jnazario</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1673104860.493>2023-01-07 15:21:00.493000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1673104861.0>2023-01-07 15:21:01</td></tr>
          <tr><td>Indicator role:</td><td>None</td></tr>
          <tr><td>Indicator title:</td><td></td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1675695600.0>2023-02-06 15:00:00</td></tr>
         </table>
    </div>
    <div><b>[<a href="https://otx.alienvault.com/pulse/63bed43ab29a28763317a879">63bed43ab29a28763317a879</a>] 2023-01-11 15:22:33.996000 | SSH honeypot logs for 2023-01-11</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>jnazario</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1673450553.996>2023-01-11 15:22:33.996000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1673450554.0>2023-01-11 15:22:34</td></tr>
          <tr><td>Indicator role:</td><td>None</td></tr>
          <tr><td>Indicator title:</td><td></td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1676041200.0>2023-02-10 15:00:00</td></tr>
         </table>
    </div>
    <div><b>[<a href="https://otx.alienvault.com/pulse/63c0262fdabd87b7ffde78ec">63c0262fdabd87b7ffde78ec</a>] 2023-01-12 15:24:31.353000 | SSH honeypot logs for 2023-01-12</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>jnazario</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1673537071.353>2023-01-12 15:24:31.353000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1673537072.0>2023-01-12 15:24:32</td></tr>
          <tr><td>Indicator role:</td><td>None</td></tr>
          <tr><td>Indicator title:</td><td></td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1676127600.0>2023-02-11 15:00:00</td></tr>
         </table>
    </div>
    <div><b>[<a href="https://otx.alienvault.com/pulse/63c1770caf551046850ccef6">63c1770caf551046850ccef6</a>] 2023-01-13 15:21:48.974000 | SSH honeypot logs for 2023-01-13</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>jnazario</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1673623308.974>2023-01-13 15:21:48.974000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1673623309.0>2023-01-13 15:21:49</td></tr>
          <tr><td>Indicator role:</td><td>None</td></tr>
          <tr><td>Indicator title:</td><td></td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1676214000.0>2023-02-12 15:00:00</td></tr>
         </table>
    </div>
    <div><b>[<a href="https://otx.alienvault.com/pulse/63c2c86a4731b5e10f72e622">63c2c86a4731b5e10f72e622</a>] 2023-01-14 15:21:14.750000 | SSH honeypot logs for 2023-01-14</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>jnazario</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1673709674.75>2023-01-14 15:21:14.750000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1673709675.0>2023-01-14 15:21:15</td></tr>
          <tr><td>Indicator role:</td><td>None</td></tr>
          <tr><td>Indicator title:</td><td></td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1676300400.0>2023-02-13 15:00:00</td></tr>
         </table>
    </div>
    <div><b>[<a href="https://otx.alienvault.com/pulse/63c419f7b7085728330b73d1">63c419f7b7085728330b73d1</a>] 2023-01-15 15:21:27.409000 | SSH honeypot logs for 2023-01-15</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>jnazario</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1673796087.409>2023-01-15 15:21:27.409000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1673796088.0>2023-01-15 15:21:28</td></tr>
          <tr><td>Indicator role:</td><td>None</td></tr>
          <tr><td>Indicator title:</td><td></td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1676386800.0>2023-02-14 15:00:00</td></tr>
         </table>
    </div>
    <div><b>[<a href="https://otx.alienvault.com/pulse/63c56b6e0efdc9e841d070b4">63c56b6e0efdc9e841d070b4</a>] 2023-01-16 15:21:18.245000 | SSH honeypot logs for 2023-01-16</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>jnazario</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1673882478.245>2023-01-16 15:21:18.245000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1673882479.0>2023-01-16 15:21:19</td></tr>
          <tr><td>Indicator role:</td><td>None</td></tr>
          <tr><td>Indicator title:</td><td></td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1676473200.0>2023-02-15 15:00:00</td></tr>
         </table>
    </div>
    <div><b>[<a href="https://otx.alienvault.com/pulse/63c80e4949274e96318e97de">63c80e4949274e96318e97de</a>] 2023-01-18 15:20:41.248000 | SSH honeypot logs for 2023-01-18</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>jnazario</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1674055241.248>2023-01-18 15:20:41.248000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1674055242.0>2023-01-18 15:20:42</td></tr>
          <tr><td>Indicator role:</td><td>None</td></tr>
          <tr><td>Indicator title:</td><td></td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1676646000.0>2023-02-17 15:00:00</td></tr>
         </table>
    </div>
    <div><b>[<a href="https://otx.alienvault.com/pulse/63c95fb7f09e304b5da30491">63c95fb7f09e304b5da30491</a>] 2023-01-19 15:20:23.662000 | SSH honeypot logs for 2023-01-19</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>jnazario</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1674141623.662>2023-01-19 15:20:23.662000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1674141624.0>2023-01-19 15:20:24</td></tr>
          <tr><td>Indicator role:</td><td>None</td></tr>
          <tr><td>Indicator title:</td><td></td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1676732400.0>2023-02-18 15:00:00</td></tr>
         </table>
    </div>
    <div><b>[<a href="https://otx.alienvault.com/pulse/606d75c11c08ff94089a9430">606d75c11c08ff94089a9430</a>] 2021-04-07 09:05:05.353000 | Georgs Honeypot</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>georgengelmann</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1674491102.079>2023-01-23 16:25:02.079000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1674443583.0>2023-01-23 03:13:03</td></tr>
          <tr><td>Indicator role:</td><td>bruteforce</td></tr>
          <tr><td>Indicator title:</td><td>SSH intrusion attempt from elate.woinsta.com port 51206</td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1677034800.0>2023-02-22 03:00:00</td></tr>
         </table>
    </div>
    <div><b>[<a href="https://otx.alienvault.com/pulse/63cab1393d853acd31e0c77d">63cab1393d853acd31e0c77d</a>] 2023-01-20 15:20:25.932000 | SSH honeypot logs for 2023-01-20</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>jnazario</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1674228025.932>2023-01-20 15:20:25.932000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1674228027.0>2023-01-20 15:20:27</td></tr>
          <tr><td>Indicator role:</td><td>None</td></tr>
          <tr><td>Indicator title:</td><td></td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1676818800.0>2023-02-19 15:00:00</td></tr>
         </table>
    </div>
    <div><b>[<a href="https://otx.alienvault.com/pulse/63cd543920260eaa29b9ff3e">63cd543920260eaa29b9ff3e</a>] 2023-01-22 15:20:25.698000 | SSH honeypot logs for 2023-01-22</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>jnazario</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1674400825.698>2023-01-22 15:20:25.698000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1674400826.0>2023-01-22 15:20:26</td></tr>
          <tr><td>Indicator role:</td><td>None</td></tr>
          <tr><td>Indicator title:</td><td></td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1676991600.0>2023-02-21 15:00:00</td></tr>
         </table>
    </div>
    <div><b>[<a href="https://otx.alienvault.com/pulse/63cea5b2e37aceeccc3cef2f">63cea5b2e37aceeccc3cef2f</a>] 2023-01-23 15:20:18.985000 | SSH honeypot logs for 2023-01-23</b>
         <table style="padding-left: 30px; padding-bottom: 10px">
          <tr><td>Author name:</td><td>jnazario</td></tr>
          <tr><td>Pulse modified:</td><td class="time" data-time=1674487218.985>2023-01-23 15:20:18.985000</td></tr>
          <tr><td>Indicator created:</td><td class="time" data-time=1674487220.0>2023-01-23 15:20:20</td></tr>
          <tr><td>Indicator role:</td><td>None</td></tr>
          <tr><td>Indicator title:</td><td></td></tr>
           <tr><td>Indicator expiration:</td><td class="time" data-time=1677078000.0>2023-02-22 15:00:00</td></tr>
         </table>
    </div>
                            </table>
                        </div>
                    </perfect-scrollbar>
                </div>
            </div>
        </div>

        <div class="source">
            <WardenChart ></WardenChart>
        </div>
        
    </div>
</template>

<script>
import * as api from '../api';
import CountryFlag from 'vue-country-flag-next';
import TimeStampVue from '@/components/TimeStamp.vue';
import moment from 'moment';
import WardenChart from '@/components/WardenChart.vue';

export default {
  data() {
    return {
        loading: true,
        ip: this.$route.params.addr,
        details: null,
        warden: true,
        dshield: true,
        otx: true,
        rev_details: null,
        wardenfull: false,
        dshieldfull: false,
        otxfull: false,
    };
  },
  components: {
    CountryFlag,
    TimeStampVue,
    WardenChart,
  },
  methods: {
    dateOnly(value) {
        if (this.$store.state.time)
        {
            return moment(value).local().format(' DD MMMM YYYY');
        }
        return moment(value).format(' DD MMMM YYYY');
    },
    toLower(str) {
      return str.toLowerCase();
    },
    rep2Color(value) {
    var hue = ((1-value)*130).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
    },
  },
  async mounted() {
    this.details = await api.getIpDetails(this.ip);
    console.log(this.details);
    this.rev_details = this.details.events.reverse();
    this.loading = false;
  },
}
</script>

<style scoped>
.wrapper {
    padding: 20px;
    color: rgba(255, 255, 255, 0.836);
    text-align: left;
}

.badges {
    display: flex;
    align-items: center;
    font-size: 18px;
    letter-spacing: 1px;
}

.ip-badge {
    background-color: rgba(240, 248, 255, 0.207);
    padding: 30px;
    display: flex;
    border-radius: 12px 0px 0px 12px;
    border: 2px solid rgba(240, 248, 255, 0.207);
    height: 20px;
}

.ip-badge > span {
    margin: 0 18px;
}

.rep-badge {
    padding: 30px;
    background-color: rgba(240, 248, 255, 0.207);
    border-radius: 0px 12px 12px 0px;
    height: 20px;
}

.ctr-ip {
    display: flex;
    align-items: center;
}

.times {
    display: flex;
    flex-direction: column;
    width: 40%;
}

.times span {
    display: flex;
    justify-content: space-between;
}


.top-part {
    display: flex;
    justify-content: space-between;
    width: 60%;
    align-items: center;
}


.warden {
    background-color: rgba(240, 248, 255, 0.186);
    border-radius: 12px;
    padding: 5px 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.warden-inside {
    height: 200px;
}

.warden table {
    width: 95%;
}

.numbers {
    text-align: right;
}

.blacklist-badge {
    padding: 3px 6px;
    border-radius: 7px;
    margin: 5px;
    background-color: rgba(21, 190, 133, 0.732);
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

.top div {
    width: 80px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}

.title {
    font-size: 20px;
}

.source {
    border: 2px solid gray;
    border-radius: 14px;
    padding: 10px 10px 0px 10px;
    width: 30%
}

.sources {
    display: flex;
    justify-content: space-between;
}

a {
    text-decoration: none;
    color: #42b983;
}

.active {
    position: absolute;
    z-index: 2;
    top: 50;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 95%;
    height: 65%;
    background-color: #00031c;
}

.active .warden-inside {
    height: 570px;
}

</style>