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
            <span v-for="bl in details.bl" :key="bl">{{ bl.name }}, </span>
        </h2>

        <h2 @click="warden = !warden">
            Warden ({{ details.events_meta.total }}): 
            <span v-if="!warden"> 
                <i class="fa fa-solid fa-caret-down"></i>
            </span>

            <span v-if="warden"> 
                <i class="fa fa-solid fa-caret-up"></i>
            </span>
        </h2>
        <div v-if="warden" class="warden">
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
        <WardenChart></WardenChart>

        
    </div>
</template>

<script>
import * as api from '../api';
import CountryFlag from 'vue-country-flag-next';
import TimeStampVue from '@/components/TimeStamp.vue';
import moment from 'moment';
//import WardenChart from '@/components/WardenChart.vue';

export default {
  data() {
    return {
        loading: true,
        ip: this.$route.params.addr,
        details: null,
        warden: true,
        rev_details: null,
    };
  },
  components: {
    CountryFlag,
    TimeStampVue,
    //WardenChart,
  },
  methods: {
    dateOnly(value) {
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
    padding: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 500px;
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
</style>