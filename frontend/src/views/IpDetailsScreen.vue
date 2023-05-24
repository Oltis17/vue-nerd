<template>
    <div v-if="!loading" class="wrapper">
        <div class="top-part">
            <div class="badges">
                <div class="ip-badge">
                    <span class="ctr-ip">
                        <span class="flag">
                            <country-flag v-if="details.geo" :country="toLower(details.geo.ctry)"/>
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
        </h2>
        <div style="width: 100%; display: flex; flex-wrap: wrap;">
            <span v-for="asn in details.asn" :key="asn">ASN{{ asn._id }}</span>
        </div>

        <h2>Blacklists: 
        </h2>

        <div style="width: 100%; display: flex; flex-wrap: wrap;">

            <div v-for="bl in details.bl" :key="bl" @click="showingBl = bl" style="display: flex; align-items: center;  margin: 5px; position: relative;">
                <Popper
                class="tooltip"
                click
                arrow
                placement="bottom"
                >
                    <span class="blacklist-badge">{{ bl.name }}</span>
                    <template #content >
                        <div class="hover">
                            <p>{{ ip }} is on  {{ bl.name }} blacklist</p>
                            <p>Last checked at: {{bl.last_check}}</p>
                            <p>Was present on blacklist at: {{ bl.history.join(', ') }}</p>
                        </div>
                    </template>
                </Popper>
            </div>



        </div>
        <h2>Tags: </h2>
        <div style="width: 100%; display: flex; flex-wrap: wrap;">
            <div v-for="tag in Object.keys(details.tags)" :key="tag" style="display: flex; align-items: center;  margin: 5px; position: relative;">
                <Popper
                    class="tooltip"
                    click
                    arrow
                    placement="bottom"
                    >
                    <span :class="`blacklist-badge ${getTag(tag).color}`" :style="`background-color: ${getTag(tag).color}`">{{ getTag(tag).name }}</span>
                    <template #content >
                        <div class="hoverTag">
                            <p>Confidence: {{ details.tags[tag].confidence }}</p>
                            <p>Time added: {{ details.tags[tag].time_added }}</p>
                            <p>Time modified: {{ details.tags[tag].time_modified }}</p>
                        </div>
                    </template>
                </Popper>
            </div>
        </div>

        <div class="sources">
            <div class="source" :class="{active: wardenfull}" v-if="!dshieldfull && !otxfull">
                <div class="info">
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
                            <span @click="download(rev_details,'warden')"> 
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
                            <a :href="`${ip}/warden`" target="_blank"> 
                                <i class="fa fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                        </div>
                    </div>
                    <div v-if="details.events_meta.total == 0" style="display: flex; justify-content: center; align-items: center;">
                        No data in the last 30 days
                    </div>
                    <div v-if="warden && details.events_meta.total > 0" class="warden">
                        <perfect-scrollbar>
                            <div class="warden-inside">
                                <table>
                                    <span v-for="e in rev_details" :key="e">
                                        <dt>
                                            {{ dateOnly(e.date) }}
                                        </dt>
                                        <dd v-for="(value, key) in e.categories" :key="key">
                                            {{ key }}: {{ value.n_sum }}
                                        </dd>
                                    </span>
                                </table>
                            </div>
                        </perfect-scrollbar>
                    </div>
                    <div class="chart" v-if="details.events_meta.total > 0">
                        <WardenChart :data="rev_details"></WardenChart>
                    </div>
                </div>
                
            </div>
            <div class="source" :class="{active: dshieldfull}" v-if="!wardenfull && !otxfull">
                <div class="info">
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
                            <span  @click="download(details.dshield,'dshield')"> 
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
                            <a :href="`${ip}/dshield`" target="_blank"> 
                                <i class="fa fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                        </div>
                    </div>
                    <div v-if="details.dshield.length == 0" style="display: flex; justify-content: center; align-items: center;">
                        No data in the last 30 days
                    </div>
            
                    <div v-if="dshield && details.dshield.length > 0" class="warden">
                        <perfect-scrollbar>
                            <div class="warden-inside">
                                <table>
                                    <span v-for="ds in details.dshield" :key="ds">
                                        <dt>{{ dateOnly(ds.date) }}</dt>
                                        <dd>Number of reports: {{ ds.reports }}</dd>
                                        <dd>Distinct targets:  {{ ds.targets }}</dd>
                                    </span>
                                </table>
                            </div>
                        </perfect-scrollbar>
                    </div>
                </div>
                <div class="chart" v-if="details.dshield.length > 0">
                    <DshieldChart :data="details.dshield"></DshieldChart>
                </div>
            </div>
            <div class="source" :class="{active: otxfull}" v-if="!wardenfull && !dshieldfull">
                <div class="info">
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
                            <span  @click="download(details.otx_pulses,'otx')"> 
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
                            <a :href="`${ip}/otx`" target="_blank"> 
                                <i class="fa fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                        </div>
                    </div>
            
                    <div v-if="otx && details.otx_pulses.length > 0" class="warden">
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
                <div class="chart">
                    <OTXChart :data="details.otx_pulses" v-if="false"></OTXChart>
                    <div v-if="details.otx_pulses.length == 0" style="display: flex; justify-content: center;">
                        No OTX data for this IP
                    </div>
                    <table v-else>
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
        <div>
                <h2>Presence on Blacklists</h2>
                <BlacklistPresence :bl="details.bl"></BlacklistPresence>
            </div>
        <vue-modality :ok-loading="loading" ref="myRefDown" title="Download data" centered @cancel="this.$refs.myRefDown.hide()" hide-ok>
            <p>Download <b>{{ name }}</b> data:</p>
            <download-excel :data="down" type="csv" :name="`${name}.csv`">
            <button class="download">
                <i class="fa fa-solid fa-download"></i>
                <span>Download CSV</span>
            </button>
            </download-excel>
            <download-excel :data="down" :name="`${name}.xls`">
                <button class="download">
                <i class="fa fa-solid fa-download"></i>
                <span>Download XLS</span>
            </button>
            </download-excel>
            <button @click="downloadJSON(down, `${name}.json`)" class="download">
                <i class="fa fa-solid fa-download"></i>
                <span>Download JSON</span>
            </button>
    </vue-modality>
        
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
import VueModalityV3 from 'vue-modality-v3';
import BlacklistPresence from '@/components/BlacklistPresence.vue';
import tags from '../assets/tags.json';
import Popper from "vue3-popper";

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
        down: null,
        name: null,
        showingBl: null,
        showingTag: null,
    };
  },
  components: {
    CountryFlag,
    TimeStampVue,
    WardenChart,
    DshieldChart,
    OTXChart,
    VueModality: VueModalityV3,
    BlacklistPresence,
    Popper,
},
  methods: {
    getTag(tag) {
      return tags[tag];
    },
    close() {
        this.showingBl = null;
    },
    closeTag() {
        this.showingTag = null;
    },
    download(data, source) {
        this.down = data;
        this.name = `${this.ip.replaceAll('.', '-')}_${source}`;
        this.$refs.myRefDown.open();
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
    }
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

@media (max-width: 800px) {

    .wrapper {
        overflow-y: scroll;
        height: 90vh;
    }
    .top-part {
        flex-direction: column;
        align-items: flex-start !important;
    }

    .sources {
        padding-top: 15px;
        flex-direction: column;
    }

    .source { 
        width: 100% !important;
    }

    .badges {
        margin-bottom: 20px;
        align-items: flex-start !important;
    }

    .ip-badge {
        flex-direction: column;
        align-items: flex-start !important;
        padding: 10px !important;
        height: auto !important;
        border-radius: 12px !important;
    }

    .rep-badge {
        height: inherit !important;
        padding: 10px !important;
        margin-left: 10px;
        border-radius: 10px !important;
    }

    .times span {
        flex-direction: column;
        padding-bottom: 7px;
    }
}

.wrapper {
    padding: 20px;
    color: rgba(255, 255, 255, 0.836);
    text-align: left;
    overflow-y: scroll;
    height: 95vh;
    padding-bottom: 100px;
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
    align-items: center;
}

.ip-badge > span {
    margin: 0 18px;
}

.rep-badge {
    padding: 30px;
    background-color: rgba(240, 248, 255, 0.207);
    border-radius: 0px 12px 12px 0px;
    height: 20px;
    display: flex;
    align-items: center;
}

.ctr-ip {
    display: flex;
    align-items: center;
}

.times {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    min-width: 360px;
}

.times span {
    display: flex;
    justify-content: space-between;
}


.top-part {
    display: flex;
    justify-content: space-between;
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
    background-color: rgba(21, 190, 133, 0.732);
    cursor: pointer;
}

.tag-badge {
    padding: 3px 6px;
    border-radius: 7px;
    background-color: rgba(21, 190, 133, 0.732);
    cursor: pointer;
}


.blacklist-badge:hover + .change {
    display: block;
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
    width: 33%
}

.sources {
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
}

a {
    text-decoration: none;
    color: #42b983;
}

.active {
    padding-top: 70px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 90vh;
    background-color: #00031c;
    border: none;
}

.active .chart { 
    display: none;
}

.active .warden-inside {
    height: 78vh;
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

.hover {
    background-color: rgb(84, 80, 80);
    padding: 10px;
    border-radius: 12px;
    font-size: 12px;
    width: 70vw;
}

.hoverTag {
    background-color: rgb(84, 80, 80);
    padding: 10px;
    border-radius: 12px;
    font-size: 12px;
    width: 300px;
}

.white {
  background-color: #fff;
  color: black;
}

h2 {
    font-size: 16px;
}

</style>