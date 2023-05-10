<template>
    <div>
      Redirecting...
    </div>
</template>

<script>
import * as api from '../api';

export default {
  data() {
    return {
        localTime: false,
        created: true,
    };
  },
  async mounted() {
    this.created = this.$route.query.created;
    // set access token Locally and to API calls
    api.setAccessToken(this.$route.query.token);
    api.setAxiosAccessToken(this.$route.query.token);
    api.setRefreshToken(this.$route.query.refreshToken);

    // get user info and store them locally
    let userInfo = null;
    try {
        userInfo = await api.me();
    } catch (e) {
        this.message = e;
        this.$refs.myRefError.open();
        this.loading = false;
        return;
    }
    console.log(userInfo);
    this.$store.commit('setUserInfo', userInfo);

    this.loading = false;

    //redirect to main page
    if (this.created) {
      this.$router.push("/account-created");
    } else {
      this.$router.push("/");
    }
    
  }
  

}
</script>

<style scoped>
template {
  min-height: 90vh;
}
div {
  padding-top: 50px;
  color: white;
}

button {
    background-color: transparent;
    border:#42b983 2px solid;
    border-radius: 12px;
    color: #42b983;
    height: 35px;
    margin-top: 15px;
    padding: 7px 12px;

    cursor: pointer;
}

.btn {
    background: black; /* default color */

    /* "to left" / "to right" - affects initial color */
    background: linear-gradient(to left, transparent 50%, #42b9833b 50%) right;
    background-size: 200%;
    transition: .5s ease-out;
}

.btn:hover {
    background-position: left;
}

</style>