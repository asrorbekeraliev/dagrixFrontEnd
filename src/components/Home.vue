<template>
  <div class="homePage">
    <div class="container">
      <div class="bir">
        <img src="../assets/dagrix.png" width="50%">
        <p>DIGITAL AGRICULTURE EXPLORATIONS</p>
        <p>VISION FOR THE FUTURE:</p>
        <p>TRANSITION TO DIGITAL AGRICULTURE</p>
      </div>
      <div class="ikki">
        <Login/>
      </div>
    </div>
  </div>  

    <!-- <ExternalHeader/>
    <h1 style="margin-top: 7%; color: white; font-size: 350%">VISION FOR THE FUTURE:</h1>
    <h1 style="padding-top: 2%; font-size: 350%; color: white">TRANSITION TO DIGITAL AGRICULTURE</h1>
  </div> -->
</template>

<script>



// import ExternalHeader from "@/components/layout/ExternalHeader";
import Login from "@/components/Login"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
   components: {Login},
  data(){
    return{
      gap: ''
    }
  },

}
</script>

<style scoped>
.homePage{
    height: 100vmin;
    float: top;
    vertical-align: top;
    background-image: url("../assets/earthBackground.jpg");
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .container{
    display: flex;
    justify-content: center;
    justify-items: center;
    flex-wrap: wrap;
    text-align: center;
  }
  .container > div{
    width: 50w
    margin: auto;
    border: solid 1px red;
    height: 100vmin;
    padding-top: 25%;
  }
  .ikki{
    margin: auto;
  }
  
</style>