<template>
    <div v-if="!loading">
      <h2>Raw IP details for IP: {{ ip }}</h2>   
    {{ details.events }}
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
  async mounted() {
      this.details = await api.getIpDetails(this.ip);
      console.log(this.details);
      this.rev_details = this.details.events.reverse();
      this.loading = false;
    }
}
</script>