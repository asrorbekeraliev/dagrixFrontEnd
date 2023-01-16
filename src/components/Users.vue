<template>
    <div class="users">
        <InternalHeader/>
        <div class="container">          
            <div class="row">
              <div class="col"></div>
              <div class="col-12">
                <table class="table table-dark" style="margin-top: 3%; min-height: 500px">
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
                      <td><button type="button" class="btn btn-danger" @click="deleteUser(user.id)">Delete User</button></td>
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
.users{
    height: 1200px;
    float: top;
    vertical-align: top;
    background-image: url("../assets/earth.jpg");
    background-size: 100%;
    background-repeat: no-repeat;
  }
</style>