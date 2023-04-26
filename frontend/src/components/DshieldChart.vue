<template>
    <div>
      <Line
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
    </div>
  
  </template>
  
  <script>
  import { Line } from 'vue-chartjs';
  import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
  
  export default {
    name: 'LineChart',
    props: ['data'],
    components: { Line },
    data() {
      return {
        chartData: {
          datasets: [ 
            { data: this.data?.map((d) => { return { x: d.date, y: d.reports }}), borderColor: 'rgba(21, 190, 133, 0.732)', fill: false, label: 'Reports'},
            { data: this.data?.map((d) => { return { x: d.date, y: d.targets }}), borderColor: 'rgba(100, 100, 133, 0.732)', fill: false, label: 'Targets'},
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