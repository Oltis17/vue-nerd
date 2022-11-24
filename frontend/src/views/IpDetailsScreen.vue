<template>
    <div v-if="!loading">
        <h2>Details for IP address: {{ ip }}</h2>

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

        <h2>ASN: 
            <span v-for="asn in details.asn" :key="asn">ASN{{ asn._id }}</span>
        </h2>

        <h2>Blacklists: 
            <span v-for="bl in details.bl" :key="bl">{{ bl.name }}, </span>
        </h2>
    </div>
</template>

<script>
import * as api from '../api';
import CountryFlag from 'vue-country-flag-next';

export default {
  data() {
    return {
        loading: true,
        ip: this.$route.params.addr,
        details: null,
    };
  },
  components: {
    CountryFlag,
  },
  methods: {
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
    this.loading = false;
  },
}
</script>

<style scoped>
div {
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

</style>