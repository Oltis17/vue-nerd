<template>
  <div>
    <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
  </div>

</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import 'chartjs-adapter-moment';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  props: ['data'],
  components: { Bar },
  data() {
    return {
      chartData: {
        datasets: [ 
          { data: this.data?.reduce((res, d) => { if (d.cat === "ReconScanning") {res.push({ x: d.date, y: d.n })} return res; }, []), backgroundColor: 'rgba(21, 190, 133, 0.732)', label: 'ReconScanning'},
          { data: this.data?.reduce((res, d) => { if (d.cat === "AnomalyTraffic") {res.push({ x: d.date, y: d.n })} return res;}, []), backgroundColor: 'rgba(100, 100, 200, 0.732)', label: 'AnomalyTraffic'},
         ]
      },
      chartOptions: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    }
  }
}
</script>