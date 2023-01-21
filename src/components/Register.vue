<template>
  <div class="registerPage">
    <!-- <ExternalHeader/> -->
    <div class="container">
        <div class="col"></div>
        <div class="col-5">
            <form @submit.prevent="handleSubmit" style="margin-top: 20%; padding: 30px; border-radius: 10px; backdrop-filter:blur(10px) brightness(150%) contrast(90%); ">
              <h1 style="color: white; font-family: goodTimes">SIGN UP</h1>
              <div class="form-group">
                <label style="color: white; float: left">First Name</label>
                <input type="text" required class="form-control" v-model="first_name" placeholder="Enter First Name"/>
              </div>

              <div class="form-group">
                <label style="color: white; float: left">Last Name</label>
                <input type="text" required class="form-control" v-model="last_name" placeholder="Enter Last Name"/>
              </div>

              <div class="form-group">
                <label style="color: white; float: left">Email</label>
                <input type="email" required class="form-control" v-model="email" placeholder="Enter Email"/>
              </div>

              <div class="form-group">
                <label style="color: white; float: left">Login</label>
                <input type="text" required class="form-control" v-model="login" placeholder="Enter Login"/>
              </div>

              <div class="form-group">
                <label style="color: white; float: left">Password</label>
                <input type="password" required class="form-control" v-model="password" placeholder="Enter Password"/>
              </div>

              <div class="form-group">
                <label style="color: white; float: left">Date of birth</label>
                <input type="date" required class="form-control" v-model="dateOfBirth" placeholder="Enter Date of birth"/>
              </div>

              <div style="margin-top: 25px">
                <button class="btn btn-primary btn-block">Sign Up</button>
                <button class="btn btn-warning btn-block" style="margin-left: 100px" @click="reset">Reset Fields</button>
              </div>
            </form>
        </div>
        <div class="col"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import ExternalHeader from "@/components/layout/ExternalHeader";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  // components: {ExternalHeader},
  data() {
    return{
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      login: 'test11',
      dateOfBirth: null
    }
  },
  methods: {
    async handleSubmit(){
      const data = {
        name: this.first_name,
        lastName: this.last_name,
        password: this.password,
        login: this.login,
        dateOfBirth: this.dateOfBirth,
        email: this.email,
        roles: [
          {name: "ROLE_USER"}
        ]
      };
      const response = await axios.post('register', data);
      console.log(response)
      await this.$router.push("login")
    },
    reset(){
      this.first_name = '',
          this.last_name = '',
          this.email = '',
          this.password = '',
          this.login = '',
          this.dateOfBirth = null
    }
  }
}
</script>

<style scoped>
.registerPage{
  height: 1000px;
  float: top;
  vertical-align: top;
  background-image: url("../assets/loginbackground.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
}
.form-group{
  padding-bottom: 5%;
}
.container{
  display: flex
}
@font-face {
                font-family: goodTimes;
                src: url("../fonts/good times rg.otf");
            }
</style>