<template>
  <div>
    <div class="bodyColor"></div>
    <div class="bodyFon"></div>
    <InternalHeader/>

    <div class="container1">
      <div class="registerField">
          <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            Add a new field
          </button>
        <div class="collapse" id="collapseExample">
          <form>
            <div class="fieldReg">
              <div>
                <label style="color: white; margin-right: 5px">Field Name: </label>
                <input type="text" placeholder="Enter the field name ..." style="width: 350px" v-model="registerData.name"><br>
              </div>
              <div style="width: auto; ">

                <label class="tt" style="color: white; margin-right: 15px">Set the moisture Level: </label>
                <input type="range" v-model="registerData.settedMoistureLevel">
                <span style="color: white; margin-left: 15px">{{registerData.settedMoistureLevel}}%</span>
              </div>
              <div>
                <input type="submit" @click="createField()" value="Register">
              </div>

            </div>
          </form>
        </div>
      </div>
      <div class="table">
        <p class="pteg" style="float: right; color: white; font-weight: bold; margin-bottom: 0">* SML = Soil Moisture Level</p>
        <table class="table table-dark" style="margin-top: 3%; width: 100%;">
          <thead style="color: #5EE2EC">
          <tr>
            <th scope="col">#</th>
            <th scope="col">FIELD NAME</th>
            <th scope="col">SETTED SML (%)</th>
            <th scope="col">CURRENT SML (%)</th>
            <th scope="col">DAILY HISTORY</th>
            <th scope="col">REMOVE</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="field, index in fields" :key="index">
            <th>{{index + 1}}</th>
            <td>{{field.name}}</td>
            <td>{{field.settedMoistureLevel}}</td>
            <td>unknown</td>
            <td><router-link :to="{name: 'Charts', params: {nodeId: field.id}}"><img class="chart" src="../assets/graph.png" style="width: 50px;"></router-link></td>
            <td><button type="button" class="btn btn-danger" @click="deleteField(field.id)">Delete</button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import InternalHeader from "@/components/layout/InternalHeader.vue";
import axios from "axios";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Fields",
  components: {InternalHeader},
  data(){
    return{
      fields: [],
      registerData:{
        settedMoistureLevel: 0,
        name: ""
      }
    }
  },
  methods:{
    getFields(){
      axios.get('/field')
          .then(resp=>{
            console.log(resp)
            this.fields = resp.data
          })
    },
    createField(){
      axios.post('/field', this.registerData)
          .then(resp=>{
            console.log(resp)
          })
      this.registerData.name="";
      this.registerData.settedMoistureLevel=0;
    },
    deleteField(){

    },


  },
  mounted() {
    this.getFields();
  }
}
</script>

<style scoped>
.btn-primary{
  margin-bottom: 30px;
}
  .container1{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .registerField{
    height: auto;
    width: 80%;
  }
  .fieldReg{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-self: end;
    width: 100%;
    margin-bottom: 20px;
  }
  .fieldReg > div{
    justify-content: center;
    align-self: center;
  }
  .table{
    width: 80%;
    justify-content: right;
    text-align: center;
  }

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
    background-image: url("../assets/fields.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    z-index: -50;
  }
  @media screen and (max-width: 800px){
    .btn-primary{
      font-size: xx-small;
      padding: 2px 4px;
      border-radius: 4px;
    }
    .tt{
      margin-top: 15px;
    }
    table{
      width: 80%;
      margin: 0;
      padding: 0;
      justify-content: center;
    }
    th, td{
      font-size: x-small;
    }
    .chart{
      height: 20px;
      width: 30px !important;
    }
    .btn-danger{
      font-size: x-small;
      padding: 2px 4px;
      border-radius: 4px;
    }
    .pteg{
      font-size: x-small !important;
      margin-bottom: 0;
      float: right;
      padding: 0;
      margin-right: 0;
    }
  }
</style>