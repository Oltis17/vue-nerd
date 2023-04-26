<template>
    <div v-if="!loading">   
    {{  loading }}
    </div>
</template>

<script>
import * as api from '../api';

export default {
  data() {
    return {
        loading: true,
        ip: this.$route.params.addr,
        details: null,
    };
  },
  methods: {
    async created() {
        console.log("HERE");
        this.details = await api.getIpDetails(this.ip);
        console.log(this.details);
        this.rev_details = this.details.events.reverse();
        this.loading = false;
    },
    }
}
</script>