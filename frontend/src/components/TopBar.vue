<template>
  <div id="top-bar-wrapper">
    <div id="top-bar" class="is-desktop">
      <div class="left-bar">
        <div id="title"><a @click="this.$router.push('/')">NERD</a><sub>by <a href="https://cesnet.cz">CESNET</a></sub></div>

        <div class="middle">
          <span><a href="data">Data</a></span>
          <span><a>IP map</a></span>
          <span v-if="$store.state.userInfo.groups && $store.state.userInfo.groups?.includes('admin')"><a @click="this.$router.push('admin')">Admin controls</a></span>
        </div>
      </div>
      
        
      <div id="right-bar" class="top-bar-control">
        <span v-click-outside-element="close">
          <p class="flex-item" @click="open()">
            <i class="fa fa-solid fa-gear"></i>
          </p>
          <span style="position: relative">
            <SettingsComp v-if="visible" >
            </SettingsComp>
          </span>
        </span>
        <span v-if="$store.state.userInfo.loggedIn" class="flex-item" id="username" @click="this.$router.push('/profile')">{{ $store.state.userInfo.email }}</span>
        <span>
          <button v-if="$store.state.userInfo.loggedIn" class="flex-item" @click="logout()">Log out</button>
        </span>

        <span>
          <button v-if="!$store.state.userInfo.loggedIn" class="create" @click="this.$router.push('/create-account')">Create an account</button>
        </span>
        
        <span>
          <button v-if="!$store.state.userInfo.loggedIn" class="login" @click="this.$router.push('/login')">Log in</button>
        </span>
        
      </div>
    </div>
    <div id="top-bar" class="is-mobile">
      <div class="left-bar">
        <div id="title"><a @click="this.$router.push('/')">NERD</a><sub>by <a href="https://cesnet.cz">CESNET</a></sub></div>
      </div>
      <div id="top-bar-hamburger">
        <span v-if="!mobileMenu && !$store.state.mobileSearch && this.$route.name == 'home'" @click="$store.state.mobileSearch = !$store.state.mobileSearch" style="margin-right: 20px;"><i class="fa fa-solid fa-search"></i></span>
        <span @click="$store.state.mobileSearch = !$store.state.mobileSearch" v-if="!mobileMenu && $store.state.mobileSearch"><i class="fa fa-solid fa-close"></i></span>

        <span @click="mobileMenu = !mobileMenu" v-if="mobileMenu && !$store.state.mobileSearch"><i class="fa fa-solid fa-close"></i></span>
        <span @click="mobileMenu = !mobileMenu" v-if="!mobileMenu && !$store.state.mobileSearch"><i class="fa fa-solid fa-bars"></i></span>
      </div>
    </div>
  </div>

  <!-- MOBILE MENU -->
  <div v-if="mobileMenu" class="mobile-menu is-mobile">  
    <div style="display: flex; flex-direction: column;">
        <span><a @click="goTo('/')">Home</a></span>
        <span><a>Data</a></span>
        <span><a>IP map</a></span>
        <span v-if="$store.state.userInfo.groups && $store.state.userInfo.groups?.includes('admin')"><a @click="goTo('/admin')">Admin controls</a></span>
      </div>

      <div style="display: flex; flex-direction: column;">
        <span v-if="$store.state.userInfo.loggedIn" class="flex-item" id="username" @click="goTo('/profile')">{{ $store.state.userInfo.email }}</span>
        <span>
          <button v-if="$store.state.userInfo.loggedIn" class="flex-item" @click="this.$refs.myRef.open()">Log out</button>
        </span>
        <span>
          <button v-if="!$store.state.userInfo.loggedIn" class="create" @click="goTo('/create-account')">Create an account</button>
        </span>
        <span>
          <button v-if="!$store.state.userInfo.loggedIn" class="login" @click="goTo('/login')">Log in</button>
        </span>
      </div> 

      <div class="footer-cols">
        <div class="footer-wrapper">
          <span><a href="/">NERD by CESNET 2023</a></span>
          <span><a href="/about">About</a></span>
          <span><a href="/">Privacy Policy</a></span>
        </div>   
          <div>
            <SettingsComp >
            </SettingsComp>
           </div>
        </div>
  </div>

  <!-- MODALS -->
  <vue-modality ref="myRef" title="Logged out" centered hide-cancel @ok="this.$refs.myRef.hide()">
        You have been logged out.
    </vue-modality>
</template>

<script>
import SettingsComp from './SettingsComp.vue';
import * as api from '../api';
import VueModalityV3 from 'vue-modality-v3';

export default {
  name: 'TopBar',
  data() {
    return {
      authenticated: false,
      visible: false,
      mobileMenu: false,
    };
  },
  components: {
    SettingsComp,
    VueModality: VueModalityV3,
},
  methods: {
    open() {
        this.visible = true;
    },
    close() {
        this.visible = false;
    },
    logout() {
      this.$store.commit('clearState');
      api.removeAccessToken();
      this.mobileMenu = false;
      this.$router.push('/');
      this.$refs.myRef.open();
    },
    goTo(path) {
      this.mobileMenu = false;
      this.$router.push(path);
    },
  },
  async mounted() {
    if (api.isLoggedIn() && this.$store.state.userInfo.loggedIn == false) {
      let userInfo = null;
        try {
            userInfo = await api.me();
        } catch (e) {
            this.message = e;
            this.$refs.myRefError.open();
            this.loading = false;
            return;
        }
        this.$store.commit('setUserInfo', userInfo);

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 800px) {
  .top-bar-control {
    display: none;
  }

  #top-bar-hamburger {
    display: flex;
    color: white;
    align-items: baseline;
    font-size: 22px;
    border: none;
    color: #ffffff9f;
    cursor: pointer;
  }

  #top-bar-hamburger span:hover {
    color: #ffffffe7;
  }

  #top-bar-hamburger span {
    display: block;
  }

  .is-desktop {
    display: none !important;
  }

  .vue-modality-dialog {
    width: 90% !important;
    height: 40% !important;
  }
}

@media (min-width: 801px) {
  .top-bar-control {
    display: flex;
  }

  .is-mobile {
    display: none  !important;
  }
}

#top-bar-wrapper {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  border-bottom: 1px solid #42b983;
  background-color: #00031c;
  z-index: 3;
}

#top-bar {
  height: 50px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
}

#right-bar {
  height: 50px;
  justify-content: right;
  min-width: 400px;
  align-items: baseline;
}

#right-bar > span {
  margin-left: 10px;
}

.flex-item {
  margin-left: 10px;
  color: #ffffff9f;
  cursor: pointer;
}

.flex-item:hover {
  color: rgb(255, 255, 255);
}
span.flex-item {
  border-bottom: 1px solid;
  transition: opacity 0.3s;
}


button {
  height: 33px;
  background-color: transparent;
  padding: 5px 15px;
  border-radius: 19px;
  cursor: pointer;
  border: 1px solid white;
  color: white;
  background-color: #00031c;
}

button:hover {
  -webkit-box-shadow: 0px 0px 24px -6px rgba(255, 255, 255, 0.76);
  -moz-box-shadow: 0px 0px 24px -6px rgba(255, 255, 255, 0.76);
  box-shadow: 0px 0px 24px -6px rgba(255, 255, 255, 0.76);
}

.darker {
  border: none;
}

#title {
  font-size: 25px;
  color: white;
  letter-spacing: 4px;
  width: 245px;
  text-align: left;
  cursor: pointer;
}

#title sub {
  font-size: 10px;
  opacity: 60%;
}

a {
  color: white;
  text-decoration: none;
}

.login {
  border: 1px solid #42b983;
  color: #42b983;
}

.middle {
  padding-left: 35px;
  display: flex;
  justify-content: left;
  width: 360px !important;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.43);
  border-left: solid 1px #42b983;
}

.middle span {
  border-bottom: 1px solid white;
  margin-right: 30px;
  cursor: pointer;
}

.left-bar {
  display: flex;
  justify-content: left;
  align-items: baseline;
}

.mobile-menu {
  height: 100vh;
  background-color: #00031C;
  z-index: 3;
}

.mobile-menu > div {
  align-items: flex-start;
  padding: 25px;
}

.mobile-menu span {
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 10px;
}

.footer-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
}

.footer-cols {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end !important;
}

.footer-wrapper span {
  font-size: 12px !important;
}
</style>
