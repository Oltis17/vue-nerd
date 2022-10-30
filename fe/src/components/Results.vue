<template>
  <div id="wrapper-res">
    <div id="results-sorting">
      <div>Order</div>
      <div>Sort by</div>
      <div>Results per page</div>
    </div>
    <div id="results-control">
      <div>1 - 20 of 406</div>
      <div>
        <i class="fa fa-solid fa-angle-left fa-lg"></i>
        <i class="fa fa-solid fa-angle-left fa-lg"></i>
      </div>
      <div>
        <i class="fa fa-solid fa-angle-left fa-lg"></i>
      </div>
      <div>
        <i class="fa fa-solid fa-angle-right fa-lg"></i>
      </div>
      <div>
        <i class="fa fa-solid fa-angle-right fa-lg"></i>
        <i class="fa fa-solid fa-angle-right fa-lg"></i>
      </div>
    </div>
  </div>
  <div id="res-table-wrapper">
    <table id="results-table">
      <tr class="result-table-head">
        <th>IP</th>
        <th>Hostname</th>
        <th>ASN</th>
        <th>Country</th>
        <th>Reputation score</th>
      </tr>
      <tr v-for="ip in results">
        <td class="result-ip-row">
          <span class="result-ip-white">{{ ip.ip }}</span>
        </td>
        <td>{{ ip.hostname }}</td>
        <td>
          AS{{ ip.asn[0]
          }}<span v-if="ip.asn.length > 1"> + {{ ip.asn.length }}</span>
        </td>
        <td>{{ ip.geo.ctry }}</td>
        <td>{{ ip.rep.toFixed(2) }}</td>
        <td><i class="fa fa-ellipsis-h"></i></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {},
};

  export default {
  name: "get-request",
  data() {
    return {
      results: null
    };
  },
  created() {
    //const token = "46UWHdl2Kx";
    // Simple GET request using fetch
    //fetch('https://nerd.cesnet.cz/nerd/api/v1/search/ip/\?', {
      // headers: {
      //        Authorization: token
       //     }
        //  })
      fetch('https://api.npoint.io/06e15faa171f09ae6517')
      .then(response => response.json())
      .then(data => (this.results = data));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 800px) {
  #wrapper-res {
    flex-direction: column;
    align-items: center;
  }

  #results-sorting {
    width: 90%;
  }

  #results-control {
    width: 90%;
  }
}

@media (min-width: 801px) {
  #results-sorting {
    width: 50%;
  }

  #results-control {
    width: 35%;
    max-width: 350px;
  }
}
#wrapper-res {
  display: flex;
  justify-content: space-evenly;
  max-width: 900px;
  margin: auto;
}

#results-sorting {
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  border: 2px solid #42b983;
  color: #42b983;
  border-radius: 19px;
  margin-top: 20px;
  max-width: 500px;
}

#results-control {
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  color: #00031c;
  background-color: #42b983;
  border-radius: 19px;
  margin-top: 20px;
}

#results-table {
  color: white;
  width: calc(100% - 40px);
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  border-collapse: separate;
  border-spacing: 0 7px;
}

#results-table tr {
  height: 40px;
  background-color: rgb(250, 250, 250, 0.08);
}

#results-table td {
  margin-bottom: 50px;
  padding-left: 10px;
  padding-right: 10px;
}

#res-table-wrapper {
  overflow-x: auto;
}

.result-ip {
  background-color: #42b983;
  border-radius: 19px;
  padding: 6px 10px 6px 10px;
  color: #00031c;
  letter-spacing: 2px;
  text-align: left;
}

.result-ip-white {
  border: 1px solid white;
  border-radius: 19px;
  padding: 6px;
  transition: 0.3s ease-out;
  cursor: pointer;
}

.result-ip-white:hover {
  color: #42b983;
  border: 1px solid #42b983;
  -webkit-box-shadow: 0px 0px 7px 0px rgba(66, 185, 131, 1);
  -moz-box-shadow: 0px 0px 7px 0px rgba(66, 185, 131, 1);
  box-shadow: 0px 0px 7px 0px rgba(66, 185, 131, 1);
}

.result-ip-row {
  text-align: left;
}

.result-table-head th {
  background-color: rgb(250, 250, 250, 0.7);
  color: #00031c;
}
.result-table-head:first-child {
  border-radius: 10px 10px 0 0;
  background-color: red;
}

.result-table-head:last-child {
  border-radius: 10px 10px 0 0;
}
</style>
