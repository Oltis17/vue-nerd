<template>
    <div v-if="!loading" class="wrapper">
      <h2>Raw IP details for IP: {{ ip }}</h2> 
      <div class="code">
        {{ details.otx_pulses }}
      </div>  

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
        this.loading = false;
    },
}
</script>

<style scoped>

.wrapper {
  color: white;
  width: 90%;
  margin: auto;
  padding-top: 20px;
  text-align: left;
  padding-bottom: 20px;
}

.code {
  background-color: rgba(128, 128, 128, 0.781);
  border-radius: 12px;
  padding: 10px;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
}
</style>