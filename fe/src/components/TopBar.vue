<template>
  <div id="top-bar-wrapper">
    <div id="top-bar">
      <div id="title">NERD<sub>by CESNET</sub></div>
      <div v-if="authenticated" id="right-bar" class="top-bar-control">
        <button class="darker">Log in</button>
        <button>Register</button>
      </div>
      <div v-if="!authenticated" id="right-bar-auth" class="top-bar-control">
        <p class="flex-item"><i class="fa fa-solid fa-gear"></i></p>
        <span class="flex-item" id="username">New User</span>
        <button class="flex-item">Log out</button>
      </div>
      <div id="top-bar-hamburger">
        <p class="flex-item"><i class="fa fa-solid fa-bars"></i></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
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
}

#top-bar {
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-left: 15px;
  padding-right: 15px;
}

#right-bar {
  justify-content: space-between;
  width: 200px;
  align-items: baseline;
}

#right-bar-auth {
  align-items: baseline;
  width: 50%;
  justify-content: flex-end;
  color: white;
}

.flex-item {
  margin-left: 25px;
}

p.flex-item,
span.flex-item {
  color: #bbbbbb;
  cursor: pointer;
}

span.flex-item {
  border-bottom: 1px solid;
  transition: opacity 0.3s;
}

span.flex-item:hover,
p.flex-item:hover {
  opacity: 60%;
}

button {
  width: 80px;
  height: 33px;
  background-color: transparent;
  border-radius: 19px;
  cursor: pointer;
  border: 1px solid white;
  color: white;
  background-color: #00031c;
}

button:hover {
  width: 80px;
  height: 33px;
  border-radius: 20px;
  cursor: pointer;
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
  cursor: pointer;
}

#title sub {
  font-size: 10px;
  opacity: 60%;
}
</style>
