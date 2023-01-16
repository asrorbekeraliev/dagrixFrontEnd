<template>
<div>
  <div class="bodyColor"></div>
  <div class="bodyFon"></div>
  <div class="accountPage">
    <InternalHeader/>   
      <div class="tashqi">
        <div class="sidebar">
          <div class="card" style="background-color: transparent; backdrop-filter: blur(px); border-radius: 1%">
            <div class="card-body">
              <div class="row">
                <a href="#" class="card-link"><span class="cardScripts">Home</span></a>
              </div>
              <div class="row">
                <a href="#" class="card-link"><span class="cardScripts">Profile</span></a>
              </div>
              <div class="row">
                <a href="/users" class="card-link"><span class="cardScripts">Users</span></a>
              </div>
              <div class="row">
                <a href="/users" class="card-link"><span class="cardScripts">Fields</span></a>
              </div>
              <div class="row">
                <a href="/wirelessdevices" class="card-link"><span class="cardScripts">Devices</span></a>
              </div>
              <div class="row">
                <a href="#" class="card-link"><span class="cardScripts">Configurations</span></a>
              </div>
              
            </div>
          </div>
        </div>
        <div class="mainview">
          <h1 style="letter-spacing: 0.15em; word-spacing: 1em; text-align: center"> ACCOUNT PAGE OF {{this.name}} </h1>
          <div class="map">
            <GmapMap
                :center="center"
                :zoom="6"
                map-style-id="satellite_labels"
                map-type="satellite" 
                :options="mapOptions"
                style="overflow: hidden; height: 100%; margin:auto; z-index: 0;"
                ref="mapRef"
                >
                <gmap-custom-marker 
                :marker="marker"
                :clickable="true"
                :key="index"
                  v-for="(marker, index) in markers"
                  :position="marker"
                  @click.native="makeChart(index)"                                 
                 
                >
                  <div>
                    <router-link :to="{name: 'Charts', params: {nodeId: device_numbers[index]}}">
                      <!-- <p style="color: red; border-radius: 50%; background-color: white; height: 20px; width: 20px; "><b>{{device_numbers[index]}}</b></p> -->
                      <img  src="../assets/reddeviceGIF.gif" style="width: 50px;"/>
                    </router-link>
                  </div>
                  
                  
                
                </gmap-custom-marker>            
          </GmapMap>
          </div>
          <div class="charts">

          </div>
        </div>


      </div>
  </div>
</div>  
</template>

<script>

import InternalHeader from "@/components/layout/InternalHeader";
import GmapCustomMarker from 'vue2-gmap-custom-marker';
import axios from 'axios'
import {gmapApi} from 'vue2-google-maps'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Account",
  components: {
    InternalHeader,
    'gmap-custom-marker': GmapCustomMarker
    },
  data() {
    return { 
      name: localStorage.getItem('name').toUpperCase(), 
      markers: [ 
        // { lat: 41.53655717030205, lng: 64.53266240438494 }
        ],
      center: { lat: 41.53655717030205, lng: 64.53266240438494 },
      mapOptions: {
        disableDefaultUI: false,
        scrollwheel: true,
        places: true
      },
      device_numbers: [],
      status: false
    };
  },

  methods:{  

    getInfo() {
      axios.get('/node/get')
      .then(response => {
        for (let index = 0; index < response.data.content.length; index++) {                
          const position = {lat: response.data.content[index].latitude, lng: response.data.content[index].longitude}
          this.markers.push(position);
          this.device_numbers.push(response.data.content[index].id)
          
        }
          console.log(response.data)
          
      })
    },
    makeChart(index){
      console.log(this.device_numbers[index])
      this.$router.push('charts/' + this.device_numbers[index], )
    }

  },

  created(){
    this.getInfo();
  },

  computed: {
       google: gmapApi
   },




}
</script>

<style scoped>
.tashqi{
  display: flex;
  justify-content: center;
}
.row{
  width: 220%;
}
.sidebar{
  width: 20%;
  height: 70vh;
  margin-top: 6%;
  margin-left: 1%;
  display: flex;
}
.mainview{
  width: 80%;
  margin: 1%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.card-body{
  font-size: x-large;
}
.cardScripts{
  float: left;
  margin-top: 5%;
  margin-bottom: 5%;

}
.card-link{
  text-decoration: none !important;
  font-size: 1em;
  color: white;
  padding-left: 10%;
  transition: 0.5s;
}
.card-link:hover{
  box-shadow: 0px 1px 2px rgba(229, 179, 179, 0.1), 
            0px 2px 4px rgba(230, 185, 185, 0.1), 
            0px 4px 8px rgba(255, 255, 255, 0.1), 
            0px 8px 16px rgba(212, 208, 208, 0.1);
  transform: scale(1.1);
  align-items: center;
  color: aqua;
  transition: 0.5s;
}

.map{
  transition: 0.5s;
  border: solid 2px white;
  height: 75%;
  width: 45%;
  z-index: 100;
  margin-right: 2%;
}

.map:hover{
  transform: scale(1.15);
  width: 50%;
  transition: 0.5s;
  box-shadow: 0 19px 38px rgba(255, 255, 255, 0.3), 0 15px 12px rgba(255, 255, 255, 0.22);
  z-index: 110;
}

.charts{
  background-color: aquamarine;
  height: 75%;
  width: 45%;
  margin-left: 2%;
}

.charts:hover{
  transform: scale(1.1);
  transition: 0.5s;
  box-shadow: 0 19px 38px rgba(255, 255, 255, 0.3), 0 15px 12px rgba(255, 255, 255, 0.22);
  z-index: 110;
}
.bodyColor{
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(6, 0, 128);
  opacity: 0.2;
  z-index: -10;
}

.bodyFon{
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/earthBackground.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: -50;
}

.accountPage{  
  min-height: 100%;
  float: top;
  vertical-align: top;  
  z-index: 100;
}

h1{
  z-index: 100;
  color: aliceblue;
  margin-bottom: 1%;
  width: 100%;
}
</style>