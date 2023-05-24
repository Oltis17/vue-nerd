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
import warden from '../assets/warden_categories.json';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  props: ['data'],
  components: { Bar },
  data() {
    return {
      chartData: {
        datasets: 
          Object.keys(warden).map((w) => {
            return { data: this.data?.reduce((res, d) => { if (d.categories[w]) {res.push({ x: d.date, y: d.categories[w].n_sum })} return res; }, []), backgroundColor: `rgb(${warden[w]})`, label: w};
          }).filter(item => item.data.length > 0)
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
  },
  mounted() {
    
  }
}
</script>