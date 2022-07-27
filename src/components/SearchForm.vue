<template>
  <div id="search-wrapper">
    <div id="search-form">
      <div id="search-top-buttons">
        <div class="search-btn-selected">Specified IP Search</div>
        <div class="search-btn-no-selected">Multiple IP Search</div>
      </div>
      <div class="search-item">
        <label>IP prefix</label>
        <input />
      </div>

      <div class="search-item">
        <label>Hostname suffix</label>
        <input />
      </div>

      <div class="search-item">
        <label>ASN</label>
        <input />
      </div>

      <div class="search-item">
        <label>Country</label>
        <input />
      </div>

      <div class="search-item">
        <label>Source</label>
        <input />
      </div>

      <div class="search-item">
        <label>Event category</label>
        <input />
      </div>

      <div class="search-item">
        <label>Blacklist</label>
        <input />
      </div>

      <div class="search-item">
        <label>Tag</label>
        <input />
      </div>

      <div class="search-btns">
        <button class="search-btn-green">Apply</button>
        <button>Clear all</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 800px) {
}

h2 {
  color: #42b983;
}

#search-wrapper {
  min-height: calc(100vh - 100px);
  border-right: 1px solid #42b983;
  -webkit-box-shadow: 7px -2px 14px -2px rgba(66, 185, 131, 0.6);
  -moz-box-shadow: 7px -2px 14px -2px rgba(66, 185, 131, 0.6);
  box-shadow: 7px -2px 14px -2px rgba(66, 185, 131, 0.6);
}

#search-form {
  display: flex;
  flex-direction: column;
}

#search-form label {
  padding-bottom: 10px;
}

.search-item {
  display: flex;
  flex-direction: column;
  text-align: left;
  color: #aaaaaa;
  letter-spacing: 1px;
  margin: auto;
  margin-bottom: 25px;
}

.search-item input {
  background-color: transparent;
  color: white;
  border-radius: 7px;
  border: 1px solid #cccccc;
  height: 20px;
  width: 200px;
  padding-left: 7px;
}

#search-top-buttons {
  background-color: #42b983;
}

#search-top-buttons div {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 5px;
  padding-right: 5px;
  width: 50%;
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 1px;
}

.search-btn-no-selected {
  background-color: #42b983;
  border-radius: 0px 0px 0px 10px;
  color: #00031c;
}

.search-btn-selected {
  background-color: #00031c;
  border-radius: 0px 19px 0px 0px;
  color: #eeeeee;
}

#search-top-buttons {
  display: flex;
  width: 100%;
  justify-content: center;
}

.search-btn-green {
  color: #42b983;
  border: 2px solid #42b983;
}

.search-btn-green:hover {
  background-color: #42b983;
  color: #00031c;
  -webkit-box-shadow: 0px 0px 24px -6px rgba(66, 185, 131, 0.76);
  -moz-box-shadow: 0px 0px 24px -6px rgba(66, 185, 131, 0.76);
  box-shadow: 0px 0px 24px -6px rgba(66, 185, 131, 0.76);
}

.search-btns {
  padding-top: 30px;
  display: flex;
  justify-content: space-evenly;
}
</style>
