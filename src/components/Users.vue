<template>
    <div class="users">
      <div class="bodyColor"></div>
      <div class="bodyFon"></div>
        <InternalHeader/>
        <div class="container">          
            <div class="row">
              <div class="col"></div>
              <div class="col-12">
                <table class="table table-dark" style="margin-top: 3%;">
                  <thead style="color: #5EE2EC">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">USER ID</th>
                      <th scope="col">LOGIN</th>
                      <th scope="col">NAME</th>
                      <th scope="col">SURNAME</th>
                      <th scope="col">CONTROL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user, index in users" :key="index">
                      <th>{{index + 1}}</th>
                      <td>{{user.id}}</td>
                      <td>{{user.login}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.lastName}}</td>
                      <td><button type="button" class="btn btn-danger" @click="deleteUser(user.id)">Delete</button></td>
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
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Users',
    components: {
        InternalHeader
    },
    data() {
        return {
            users: [],
        };
    },
    methods: {
        getUsers(){
            axios.get('/user')
            .then(response=>{                
                this.users = response.data
                console.log(this.users)
            })
        },
        deleteUser(id){
            axios.delete('/delete/' + id)
            .then(response=>{
                console.log(response)
                localStorage.setItem('numberOfUsers', parseInt(localStorage.getItem('numberOfUsers'))-1)
                this.$router.go(this.$router.currentRoute)
            })
        }
    },
    created(){
        this.getUsers()
    }
}
</script>
<style scoped>

.bodyColor{
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgb(6, 0, 128);
  opacity: 0.3;
  z-index: -10;
}

.bodyFon{
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/earth.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: -50;
}

@media screen and (max-width: 800px){
  .container{
    width: 100%;
    margin: 2px;
  }
  .users{
    width: 100vw;
    background-size: cover;
  }
  th, td{
    font-size: x-small;
  }
  button{
    font-size: x-small;
    padding: 1px 2px !important;
    border-radius: 2px;
  }
}

</style>