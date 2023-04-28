<template>
  <div id="top-bar-wrapper">
    <div id="top-bar">
      <div class="left-bar">
        <div id="title"><a @click="this.$router.push('/')">NERD</a><sub>by <a href="https://cesnet.cz">CESNET</a></sub></div>

        <div class="middle">
          <span><a>Data</a></span>
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
          <button v-if="$store.state.userInfo.loggedIn" class="flex-item" @click="this.$refs.myRef.open()">Log out</button>
        </span>

        <span>
          <button v-if="!$store.state.userInfo.loggedIn" class="create" @click="this.$router.push('/create-account')">Create an account</button>
        </span>
        
        <span>
          <button v-if="!$store.state.userInfo.loggedIn" class="login" @click="this.$router.push('/login')">Log in</button>
        </span>
        
      </div>
      <div id="top-bar-hamburger">
        <p class="flex-item"><i class="fa fa-solid fa-bars"></i></p>
      </div>
    </div>
  </div>
  <!-- MODALS -->
  <vue-modality ref="myRef" title="Logging out" centered @ok="logout()" @cancel="this.$refs.myRef.hide()">
        Are you sure you want to log out?
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
      this.$refs.myRef.hide();
      this.$router.push('/');
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
  }
}

@media (min-width: 801px) {
  #top-bar-hamburger {
    display: none;
  }

  .top-bar-control {
    display: flex;
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
  justify-content: space-between;
  width: 270px;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.43);
  border-left: solid 1px #42b983;
}

.middle span {
  border-bottom: 1px solid white;
  cursor: pointer;
}

.left-bar {
  display: flex;
  justify-content: left;
  align-items: baseline;
}
</style>
