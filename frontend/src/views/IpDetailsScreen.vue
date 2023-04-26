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
                        <span @click="$router.push('/ip/' + ip + '/warden')"> 
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
                                <span v-for="ds in details.dshield" :key="ds">
                                    <dt>{{ ds.date }}</dt>
                                    <dd>Number of reports: {{ ds.reports }}</dd>
                                    <dd>Distinct targets:  {{ ds.targets }}</dd>
                                </span>
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
                            <div v-for="otx_pulse in details.otx_pulses" :key="otx_pulse">
                                <b>[<a :href="'https://otx.alienvault.com/pulse/' + otx_pulse.pulse_id" target="_blank">{{ otx_pulse.pulse_id }}</a>] {{ otx_pulse.pulse_created }} | {{ otx_pulse.pulse_name }}</b>
                                <table style="padding-left: 10px; padding-bottom: 10px">
                                <tr><td>Author name:</td><td>{{ otx_pulse.author_name }}</td></tr>
                                <tr><td>Pulse modified:</td><td class="time">{{ otx_pulse.pulse_modified }}</td></tr>
                                <tr><td>Indicator created:</td><td class="time">{{ otx_pulse.indicator_created }}</td></tr>
                                <tr><td>Indicator role:</td><td>{{ otx_pulse.indicator_role }}</td></tr>
                                <tr><td>Indicator title:</td><td>{{ otx_pulse.indicator_title }}</td></tr>
                                <tr v-if="otx_pulse.indicator_expiration"><td>Indicator expiration:</td><td class="time">{{ otx_pulse.indicator_expiration }}</td></tr>
                                </table>
                            </div>
                        </div>
                    </perfect-scrollbar>
                </div>
            </div>
        </div>
        <div class="sources">

            <div class="source">
                <WardenChart :data="rev_details"></WardenChart>
            </div>

            <div class="source">
                <DshieldChart :data="details.dshield"></DshieldChart>
            </div>

            <div class="source">
                <OTXChart :data="details.otx_pulses" v-if="false"></OTXChart>
                <table>
                    <tr>
                        <th>Author</th>
                        <th>Date</th>
                    </tr>
                    <tr v-for="pulse in details.otx_pulses" :key="pulse">
                        <td>{{ pulse.author_name }}</td>
                        <td>{{ pulse.indicator_created }}</td>
                    </tr>
                </table>
            </div>
        </div>
        
    </div>
</template>

<script>
import * as api from '../api';
import CountryFlag from 'vue-country-flag-next';
import TimeStampVue from '@/components/TimeStamp.vue';
import moment from 'moment';
import WardenChart from '@/components/WardenChart.vue';
import DshieldChart from '@/components/DshieldChart.vue';
import OTXChart from '@/components/OTXChart.vue';

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
    DshieldChart,
    OTXChart
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