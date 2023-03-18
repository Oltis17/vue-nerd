<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        datasets: [ { data: [ { x: "Jan 16", y: 136 },
        { x: "Jan 17", y: 172 },
        { x: "Jan 18", y: 129 },
        { x: "Jan 19", y: 90 },
        { x: "Jan 20", y: 152 },
        { x: "Jan 21", y: 171 },
        { x: "Jan 22", y: 128 },
        { x: "Jan 23", y: 127},
        { x: "Jan 24", y: 127 },
        { x: "Jan 25", y: 111 },
        { x: "Jan 26", y: 122 },
        { x: "Jan 27", y: 120 },
        { x: "Jan 28", y: 142 },
        { x: "Jan 29", y: 215 },
        { x: "Jan 30", y: 250 },
        { x: "Jan 31", y: 303 },
        { x: "Feb 1", y: 220 },
        { x: "Feb 2", y: 164 },
        { x: "Feb 3", y: 191 },
        { x: "Feb 4", y: 232 },
        { x: "Feb 5", y: 267 },
        { x: "Feb 6", y: 254 },
        { x: "Feb 7", y: 295 },
        { x: "Feb 8", y: 323 },
        { x: "Feb 9", y: 189 },
        { x: "Feb 10", y: 210 },
        { x: "Feb 11", y: 311},
        { x: "Feb 12", y: 330 },
        { x: "Feb 13", y: 305 },
        { x: "Feb 14", y: 316 },
        { x: "Feb 15", y: 168 },], backgroundColor: 'rgba(21, 190, 133, 0.732)', label: 'Events',} ]

       
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>