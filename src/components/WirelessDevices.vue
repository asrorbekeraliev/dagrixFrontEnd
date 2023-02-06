<template>
    <div class="devicesPage">
      <div class="bodyColor"></div>
      <div class="bodyFon"></div>
        <InternalHeader/>
        <div class="container">
  <div class="row">
    <div class="col">
      <div class="ustuncha">
        <a href="/deviceregister"><img src="../assets/registerdev.png" style="width: 70%; padding-top: 12%;"></a>
        <h3 style="color: black; background-color: #328905;">Register a device</h3>
      </div>
    </div>
    <div class="col">
      <div class="ustuncha">
        <a href=""><img src="../assets/removedev.png" style="width: 70%; padding-top: 12%;"></a>
        <h3 style="color: black; background-color: #b42005;">Delete all devices</h3>
      </div>
    </div>
  </div>
</div>



          
        <div class="container">          
            <div class="row">
              <div class="col"></div>
              <div class="col-12">
                <table class="table table-dark" style="margin-top: 3%">
                  <thead style="color: #5EE2EC">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">DEVICE ID</th>
                      <th scope="col">DEVICE TYPE</th>
                      <th scope="col">DEVICE BATTERY (%)</th>
                      <th scope="col">GET PARAMETERS</th>
                      <th scope="col">REMOVE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="node, index in nodes" :key="index">
                      <th>{{index + 1}}</th>
                      <td>{{node.id}}</td>
                      <td>{{node.deviceType}}</td>
                      <td>{{node.batteryCharge}}unknown</td>
                      <td><router-link :to="{name: 'Charts', params: {nodeId: node.id}}"><img src="../assets/graph.png" style="width: 50px;"></router-link></td>
                      <td><button type="button" class="btn btn-danger" @click="deleteNode(node.id)">Delete</button></td>
                    </tr>
                  </tbody>
              </table>
              </div>
              <div class="col"></div>
            </div>
        </div>        
    </div>
</template>
<script>
import axios from 'axios';
import InternalHeader from '../components/layout/InternalHeader.vue'
export default {
    name: 'WirelessDevices',
    components: {
        InternalHeader
    },
    data() {
        return{
            nodes: []
        }
    },
    methods: {
        getInfo() {
            axios.get('/node/get')
            .then(response => {
                console.log(response)
                this.nodes = response.data.content;
            })
        },
        deleteNode(id){
            axios.delete('/node/' + id)
            .then(response=>{
                console.log(response)
                localStorage.setItem('numberOfDevices', parseInt(localStorage.getItem('numberOfDevices'))-1)
                this.$router.go(this.$router.currentRoute)
            })
        }
    },
    created(){
        this.getInfo();
    }
}
</script>
<style scoped>

.bodyColor{
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgb(6, 0, 128);
  opacity: 0.5;
  z-index: -10;
}

.bodyFon{
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/devices.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: -50;
}

.ustuncha{
  width: 30%; border-radius: 20px; backdrop-filter:blur(10px) brightness(150%) contrast(90%); margin: auto
}

@media screen and (max-width: 800px){
  h3{
    font-size: x-small;
  }
  .ustuncha{
    border-radius: 5px;
    margin-top: 5px;
  }
  th, td{
    font-size: xx-small;
  }

  .btn-danger{
    font-size: x-small;
    padding: 2px 4px;
    border-radius: 4px;
  }
}

</style>