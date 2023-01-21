<template>
  <div class="homePage">
    <div class="container">
      <div class="bir">
        <div class="leftside">          
          <img src="../assets/dagrix.png" width="80%">
          <p id="dagrix">DIGITAL AGRICULTURE EXPLORATIONS</p>          
        </div>
      </div>
      <div class="frame">
        <img src="../assets/sep.png" height="100%">
      </div>
      <div class="ikki">
        <div>
          <Login/>
          <p style="margin-top: 10%; color: white; font-family: goodTimes; opacity: 1.2;">Not registered yet? <a href="/register">Register</a></p>
          
        </div>
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
    max-width: 100%;
    float: top;
    vertical-align: top;
    background-image: url("../assets/earthBackground.jpg");
    background-size: 100%;
    background-repeat: no-repeat;    
  }
  .container{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 100%;
    align-items: center;
  }
  .container > div{
    margin: auto;
    height: 100vmin;
    align-items: center;
    display: flex;
  }
  .bir{
    width: 50%;
  }
  .frame{
    width: 10%;
  }
  .ikki{
    width: 40%;
    z-index: 15;
    margin: auto;
    justify-content: center;
    justify-self: center;
  }
  #dagrix{
    color: rgb(255, 255, 255);
    font-size: 50px;
    font-family: goodTimes;
    letter-spacing: 3px;
  }
  .leftside > p{
    color: blue;
    font-size: xx-large;
    
  }
  .leftside > img{
    margin-bottom: 5%;
    transition: 1s;
  }
  .leftside > img:hover{
    transform-style: preserve-3d;
    transform: scale(1.1);
    transition: 1s;
    
  }

  @font-face {
                font-family: goodTimes;
                src: url("../fonts/good times rg.otf");
            }
</style>