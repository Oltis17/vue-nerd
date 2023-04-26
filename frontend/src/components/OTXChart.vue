<template>
    <div>
      <Line
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
      :plugins="chartPlugins"
    />
    </div>
    {{ this.chartData.datasets[0].data[0] }}
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
} from 'chart.js';

import ChartJSPluginDatalabels from 'chartjs-plugin-datalabels';
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)
  
  export default {
    name: 'LineChart',
    props: ['data'],
    components: { Line },
    data() {
      return {
        chartPlugins: [ChartJSPluginDatalabels],
        chartData: {
          datasets: [ 
            { data: this.data?.map((d) => { return { x: d.pulse_created.split(" ")[0], y:  d.author_name}}), backgroundColor: 'rgba(100, 190, 133, 0.732)', fill: false, label: 'Pulse'},
           ]
        },
        chartOptions: {
          responsive: true,
          scales: {
                y: {
                    max: this.data.length,
                    stepSize: 1,
                    autoSkip: false,
                    title: {
                        display: true,
                        text: "OTX pulses by author",
                    },
                    ticks: [this.data?.map((d) => { return d.author_name;})] ,
                    },
            },
            plugins: {
                datalabels:
                {
                    align: -45,
                    rotation: -45,
                    formatter: function () {
                        return this.data;
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    callbacks: {
                        label: function () {
                            return this.data;

                        }
                    }
                },
            }
        }
      }
    }
  }
  </script>