<template>
  <div id="top-bar-wrapper">
    <div id="top-bar">
      <div class="left-bar">
        <div id="title"><a href="/">NERD</a><sub>by <a href="https://cesnet.cz">CESNET</a></sub></div>

        <div class="middle">
          <span><a>Data</a></span>
          <span><a>IP map</a></span>
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
        
        <span v-if="authenticated" class="flex-item" id="username">New User</span>
        <span>
          <button v-if="authenticated" class="flex-item">Log out</button>
        </span>

        <span>
          <button v-if="!authenticated" class="create" @click="this.$router.push('create-account')">Create an account</button>
        </span>
        
        <span>
          <button v-if="!authenticated" class="login" @click="this.$router.push('login')">Log in</button>
        </span>
        
      </div>
      <div id="top-bar-hamburger">
        <p class="flex-item"><i class="fa fa-solid fa-bars"></i></p>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsComp from './SettingsComp.vue';

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
  },
  methods: {
    open() {
        this.visible = true;
    },
    close() {
        this.visible = false;
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
  width: 400px;
  align-items: baseline;
}

#right-bar > span {
  margin-left: 10px;
}

.flex-item {
  margin-left: 25px;
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
  width: 150px;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.43);
  border-left: solid 1px #42b983;
}

.middle span {
  border-bottom: 1px solid white;
}

.left-bar {
  display: flex;
  justify-content: left;
  align-items: baseline;
}
</style>
