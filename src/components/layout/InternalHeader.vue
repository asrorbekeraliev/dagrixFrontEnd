<template>
  
    <div class="tashqi">
      <div>
        <img src="../../assets/dagrix.png" @click="goHome()">
      </div>
      <div>
        <nav class="navbar navbar-expand-lg bg-light" id="info">
          <a class="navbar-brand" style="margin: auto;"> USERS: {{this.numberOfUsers}}</a><img src="../../assets/users.png" style="width: 2rem; margin: auto">
        </nav>
      </div>
      <div>
        <nav class="navbar navbar-expand-lg bg-light" id="info">
          <a class="navbar-brand" style="margin: auto;">DEVICES: {{this.numberOfDevices}}</a><img src="../../assets/deviceico.png" style="width: 2rem; margin: auto">
        </nav>
      </div>
        <div class="dropdown">
          <button type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent !important; border-color: transparent; margin: auto">
            <img src="../../assets/icons8-user-64.png" width="42">
          </button>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2" style="background-color: rgb(59, 56, 69) !important; border-color: white;">
            <li><a class="dropdown-item disabled" style="color: white !important;">Hi, {{this.name}}</a></li>
            <div class="dropdown-divider" style="color: white !important"></div>
            <li><a class="dropdown-item" href="/profile">Profile Settings</a></li>
            <li><a class="dropdown-item" @click="logOut" href="">Log Out</a></li>
          </ul>
        </div>
    </div>




</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "InternalHeader",
  data(){
    return{
      numberOfUsers: null,
      numberOfDevices: null,
      name: null
    }
  },

  methods: {
    logOut(){
      localStorage.clear();
      this.$router.push('/')

    },
    goHome(){
      this.$router.push('/account')
    }

  },
  created() {
    this.numberOfUsers = localStorage.getItem('numberOfUsers')
    this.numberOfDevices = localStorage.getItem('numberOfDevices')
    this.name = localStorage.getItem('name')
  },
  watch:{

  }
}
</script>

<style scoped>
.dropdown-divider{
  color: aliceblue !important;
}
.dropdown-item{
  color: white;
  letter-spacing: 0.1em;  
}

.dropdown > button > img:hover{
   transform: scale(1.3);
  transition-duration: 0.5s;
}

.dropdown > button > img{
  transition-duration: 0.5s;
}

.tashqi{  
  background-color: transparent !important;
  backdrop-filter: blur(10px);
  position: -webkit-sticky;
   top: 0px;
   position: sticky;
z-index: 99999999;
  display: flex; 
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 150px;
}
.tashqi > div{
 width: 25%;
 text-align: center;
 z-index: 99999999;
}
.tashqi > div > img{
  width: 250px; 
  float: left;
  transition-duration: 0.5s;
  z-index: 99999999;
  padding-left: 2%;
}
.tashqi > div > img:hover{
  transform: scale(1.1);
  transition-duration: 0.5s;
  z-index: 99999999;
  
}

#info{
  border-radius: 20px; background-color: #cbd5de !important; text-align: center; width: 80%; min-width: max-content;
  height: 50% !important;
  transition: 0.6s;
  box-shadow: 0px 5px 10px 0px rgba(164, 176, 239, 0.5);
}

#info:hover{ 
  box-shadow: 0px 1px 2px rgba(229, 179, 179, 0.1), 
            0px 2px 4px rgba(230, 185, 185, 0.1), 
            0px 4px 8px rgba(255, 255, 255, 0.1), 
            0px 8px 16px rgba(212, 208, 208, 0.1);
  transform: scale(1.1);
}



</style>