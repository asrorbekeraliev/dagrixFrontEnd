<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="body">
    <InternalHeader/>
    <H1>Parameters of Wireless Node: {{nodeId}}</H1>
    <br>
    
    <div id="chart" v-if="this.status" style="align: center">
      <apexchart
        type="area"
        height="650"
        ref="chart"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>    
  </div>
  
</template>

<script>
import axios from "axios";
import InternalHeader from "./layout/InternalHeader.vue"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Charts",
  props: ["nodeId"],
  components: {InternalHeader},
  data() {
    return {
      status: false,
      
      chartOptions: {
        chart: {
          id: "Parameters_of_device_number_" + this.nodeId,
          type: "area",
          foreColor: "#ccc",
          toolbar: {
            autoSelected: "zoom",
            show: true,
          },
        },
        colors: ["#00BAEC", "#FE0F47", "#0FFE3F", "#870FFE"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 3
        },
        title: {
          text: "value",
          align: "left",
        },
        grid: {
          borderColor: "#555",
          clipMarkers: false,
          yaxis: {
            lines: {
              show: false
            }
          },
        },        
        markers: {
          size: 1,
          colors: ["#7E6D90"],
          strokeColor: "white",
          strokeWidth: 2
        },
        tooltip: {
          theme: "dark"
        },
        
        xaxis: {
          type: 'text',
          categories: [],
        },
        yaxis: {
          min: -50,
          tickAmount: 4,
        },
        fill: {
          gradient: {
            enabled: true,
            opacityFrom: 0.35,
            opacityTo: 0
          }
        },
        // parametrlarning labellari
        legend: {
          position: "top",
          horizontalAlign: "center",
          floating: true,
          offsetY: -1,      
          offsetX: -15,
          
        },
      },
      
      series: [
        {
          name: "Air Temperature",
          data: [],
        },
        {
          name: "Humidity",
          data: [],
        },
        {
          name: "Soil Temperature",
          data: [],
        },
        {
          name: "Soil Moisture",
          data: [],
        },
      ],
    };
  },
  methods: {
    async updateChart() {
      axios.get(`parameter/data/${this.nodeId}`).then((response) => {
        console.log(response);
        this.series[0].data = response.data[0];
        this.series[1].data = response.data[1];
        this.series[2].data = response.data[2];
        this.series[3].data = response.data[3];
       
        for (var i = 0; i < response.data[4].length; i++) {
          // this.series[i].data = response.data[i];
          this.chartOptions.xaxis.categories.push(new Date(response.data[4][i]).toLocaleString().substring(0, 17));
        }
        console.log(this.chartOptions.xaxis.categories); 
        this.status = true;       

      });
    },
  },

  // watch: {
  //   $route() {
  //     location.reload();
  //   },
  // },
  mounted() {
    this.updateChart();
  },
};
</script>


<style scoped>
 
  #chart {
    border-radius: 20px;
    position: relative;
    background: #000524;
    border: 1px solid #000;
    box-shadow: 0 25px 35px -6px rgba(0, 0, 0, 0.71);
    max-width: 83%;
    margin: 0 auto;
    transition: 1s;
    /* transition-delay: 1s; */
  }
  #chart:hover{
    box-shadow: 0px 5px 10px 0px rgba(52, 211, 232, 0.5);
  transform: scale(1.1);
  }
  .body {
    background: #303e8b;
    height: 1800px;
  }
  h1 {    
    margin-top: 30px;
    color: azure;
  }


</style>

