<template>

  <div class="loginPage">
    <div class="container">
        <div>
          <form @submit.prevent="handleSubmit" style="padding: 30px; border-radius: 10px; backdrop-filter:blur(10px) brightness(150%) contrast(90%);">
            <h1 style="color: white;">SIGN IN</h1>
            <div class="form-group">
              <label style="color: white; float: left">Login</label>
              <input type="text" class="form-control" v-model="loginParams.login" placeholder="Login"/>
            </div>

            <div class="form-group" style="margin-top: 15px">
              <label style="color: white; float: left">Password</label>
              <input type="password" class="form-control" v-model="loginParams.password" placeholder="Password"/>
            </div>
            <button class="btn btn-primary btn-block" style="margin-top: 35px">Sign in</button>
          </form>
        </div>
      </div>
    </div>
    
</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return{
      loginParams: {
        password: null,
        login: null,
      },
      userDetails: {
        name: '',
        lastname: '',
        login: '',
        email: ''
      }

    }
  },
  methods: {
    async handleSubmit(){
      
      axios.post('/authenticate', this.loginParams, {
        headers:{
          'Authorization': null,
        }
      })
      .then(response => {
          if (response.data.success == 'true'){
            console.log(response)
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('lastname', response.data.lastname);
            localStorage.setItem('login', response.data.login);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('numberOfUsers', response.data.users);
            localStorage.setItem('numberOfDevices', response.data.devices);
            this.$router.push('account')
          } else {
            alert("User not found")
            this.$router.push('/login')
            this.loginParams.login=''
            this.loginParams.password=''
          }
      });
      
    }
  }
}
</script>

<style scoped>
  .container{
    display: flex;
  }

</style>