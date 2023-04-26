<template>
    <table class="charts-css line" id="my-chart">
        <tbody>
            <tr v-for="o in out" :key="o">
                <td :style="'--start:' +  o[0] + '; --size:' +  o[1]"></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return {
            out: [],
        }
    },
    props: ['data'],
    mounted() {
        for (let i = 0; i < this.data.length - 1; i++) {
            this.out.push([this.data[i], this.data[i + 1]])
        }
    }
}
</script>

<style scoped>
#my-chart {
  --color: #42b983;
  margin: 0 auto;
  height: 40px;
  width: 60px;
  border-collapse: collapse;
}

#my-chart td {
  border: none !important;
  padding: 0px !important;
}
</style>