<template>
<div class="dev-reg"> 
  <InternalHeader/>   
    <div class="form">   
    <div class="container">      
      <div class="row">
        <div class="col"></div>
        <div class="col-8">
            <form @submit.prevent="submit" style="width: 100vmin; margin-top: 10%; padding: 30px; border-radius: 10px; backdrop-filter:blur(10px) brightness(150%) contrast(90%); ">
              <h1 style="color: white;">DEVICE REGISTRATION</h1>
              <div class="form-group" style="width: 50vmin; margin:0 auto;">
                <label style="color: white; float: left">Choose the Field</label>
                <select required class="form-select" v-model="choosenIndex">
                  <option selected hidden value=null>Choose the field</option>
                  <option v-for="(field_name, index) in field_names"
                          v-bind:value="index"
                          :key="index">{{ field_name }}</option>
                </select>
              </div>
              <div class="form-group" style="width: 50vmin; margin:0 auto;">
                <label style="color: white; float: left">Device Type</label>
                <select class="form-select" v-model="device_type">
                  <option selected hidden value=null>Choose the device type</option>
                  <option value="Coordinator">Coordinator</option>
                  <option value="End Device">End Device</option>
                </select>
              </div>
              <br>
              <div style="margin-left: -30px">
                <GmapMap
                :center="center"
                :zoom="5"
                map-style-id="roadmap"
                :options="mapOptions"
                style="width: 80vmin; height: 50vmin; margin:0 auto;"
                ref="mapRef"
                @click="handleMapClick"
                >
                <GmapMarker
                  :position="marker.position"
                  :clickable="true"
                  :draggable="true"
                  @drag="handleMarkerDrag"
                  @click="panToMarker"
                />
                </GmapMap>
                <div style="margin-top: 25px">  
                  
                  <span style="padding-left: 10%"><button class="btn btn-dark btn-block">Register Device</button></span>
                  <span class="geolocatebutton" @click="geolocate"><img src="../assets/mylocation.png" class="image" style="max-width: 80px" ></span>
                </div> 
                <div style="margin-top: 25px">
                
              </div>         
                <!-- <p style="color: white">Selected Position: {{ marker.position }}</p> -->
              </div>              
            </form>
  
        </div>
        <div class="col"></div>
      </div>
    </div>
    </div>   

</div>
</template>
<script>
import {gmapApi} from 'vue2-google-maps'
import axios from 'axios'
import InternalHeader from './layout/InternalHeader.vue'
export default {
    name: 'GoogleMap',
    components: {
      InternalHeader, 
      
      },
    data() {
    return {  
      marker: { position: { lat: null, lng: null } },
      center: { lat: 41.53655717030205, lng: 64.53266240438494 },
      mapOptions: {
        disableDefaultUI: false,
        scrollwheel: true,
      },
      device_type: null,
      choosenIndex: null,
      field_names:[],
      field_ids:[],

    };
  },
	methods: {
    //detects location from browser
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.panToMarker();
      });
    },
    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },
    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      //this.$refs.mapRef.setZoom(18);
    },
    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      console.log(e);
    },

    // get fields
    getFields(){
      axios.get('/field')
          .then(response=>{
            console.log(response)
            for (var i=0; i<response.data.length; i++){
              this.field_names.push(response.data[i].name)
              this.field_ids.push(response.data[i].id)
            }
            console.log(this.field_names)
          })
    },


    // Registration submission
    submit(){
      if(this.device_type != null && this.choosenIndex != null){
        console.log(this.choosenIndex)
        const data = {
        deviceType: this.device_type,
        latitude: this.marker.position.lat,
        longitude: this.marker.position.lng,
        field: {
          id: this.field_ids[this.choosenIndex]
        }
        };
        console.log(data)
        axios.post('node/register', data)
        .then(response =>{
            console.log(response)
            localStorage.setItem('numberOfDevices', (parseInt(localStorage.getItem('numberOfDevices'))+1));
            alert('Device is registered with the ID: ' + response.data.id);            
            this.$router.push('wirelessdevices');          
        })
      } else {
        alert("Please, select the Field and Device Type")
      }     
      
    },
  },

   computed: {
       google: gmapApi
   },
   mounted() {
  //  this.geolocate();
     this.getFields();
   },

}
</script>
<style>
  .dev-reg{
    height: 1200px;
    float: top;
    vertical-align: top;
    background-image: url("../assets/dev-reg.jpg");
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .geolocatebutton {
    background-color: transparent;
    color: transparent;
    border-color: transparent;
    padding-left: -10%;
  }

</style>
