<template>
  <div class="external" v-if="this.loggedIn">
    <div class="bodyColor"></div>
    <div class="bodyFon"></div>
    <InternalHeader/>
    <h1 style="color: white">Profile Settings</h1>
    <div class="container1">
      <div class="container2">
        <div class="rasm">
          <img v-if="loadedImage===null" src="@/assets/person.png" width="180px" height="180px" >
          <img v-else :src="loadedImage" width="150px" height="180px" style="border-radius: 50%"/>
        </div>
        <br>
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" v-if="loadedImage==null">
          Upload your profile photo
        </button><br>
        <div class="collapse" id="collapseExample" style="text-align: center">
          <div class="card card-body" style="background-color: transparent !important;">
            <div>
              <input type="file" @change="uploadFile()" ref="file">
              <button @click="submitFile()">Upload!</button>
            </div>
          </div>
        </div>
        <br>
        <button v-if="loadedImage!=null" type="button" class="btn btn-danger" @click="deleteFile()">Delete your profile photo</button>

      </div>
      <div class="container3">
        <div class="input-group input-group-lg">
          <span class="input-group-text" id="inputGroup-sizing-lg" style="width: 20%">Name</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" v-model=userdata.name><br>
        </div>
        <br>
        <div class="input-group input-group-lg">
          <span class="input-group-text" id="inputGroup-sizing-lg" style="width: 20%">Surname</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" v-model=userdata.lastName><br>
        </div>
        <br>
        <div class="input-group input-group-lg">
          <span class="input-group-text" id="inputGroup-sizing-lg" style="width: 20%">Email</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" v-model=userdata.email><br>
        </div>
      </div>
      <div class="container3">
        <div class="input-group input-group-lg">
          <span class="input-group-text" id="inputGroup-sizing-lg" style="width: 20%">Login</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" v-model=userdata.login><br>
        </div>
        <br>
        <div class="input-group input-group-lg">
          <span class="input-group-text" id="inputGroup-sizing-lg" style="width: 20%">Password</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" v-model=userdata.password placeholder="*****"><br>
        </div>
        <br>
        <div class="input-group input-group-lg" style="justify-content: center">
          <button type="button" class="btn btn-success" @click="submitForm()">Submit Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import InternalHeader from "@/components/layout/InternalHeader";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Profile",
  components: {InternalHeader},
  data(){
    return {
      loggedIn: localStorage.getItem('loggedIn') == 'true',
      image: null,
      imageHashId: '',
      loadedImage: null,
      userdata: {
        name: localStorage.getItem('name'),
        lastName: localStorage.getItem('lastname'),
        login: localStorage.getItem('login'),
        password: '',
        email: localStorage.getItem('email'),
      }
    }
  },
  methods:{
    submitFile() {
      const formData = new FormData();
      formData.append('file', this.image);
      const headers = { 'Content-Type': 'multipart/form-data' };
      axios.post('/file/upload', formData, { headers }).then((res) => {
        res.data.files; // binary representation of the file
        res.status; // HTTP status
        console.log(res)
        if (res.data==''){
          alert('You have uploaded your photo')
        }
      });
      this.$router.go();
    },

    uploadFile(){
      this.image = this.$refs.file.files[0];
      console.log(1)
    },
    async getFile(){
      axios.get('/file/get-hashId')
          .then(resp=>{
            if (resp.data!=''){
              this.imageHashId = resp.data;
              axios.get(`/file/file-preview/${resp.data}`, {responseType: "blob"})
                  .then(async response => {
                    const base64data = await this.blobToData(response.data);
                    console.log(response);
                    this.loadedImage = base64data;
                  })
            }
          })


    },
    blobToData(blob) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
      })
    },
    deleteFile(){
      axios.get('/file/get-hashId')
          .then(resp=>{
            axios.delete(`/file/delete/${resp.data}`)
                .then(response=>{
                  console.log(response)
                  alert(response.data)
                })
          })
      // this.$router.go();
    },
    submitForm(){
      axios.put('/update', this.userdata)
          .then(resp=>{
            console.log(resp)
          })
    }

  },
  created(){
    this.getFile();
  }

}
</script>

<style scoped>
.input-group-lg{
  margin-bottom: 50px;
}
.rasm{
  display: flex;
  justify-content: center;
}
.container1{
  padding-top: 55px;
  display: flex;
  justify-content: space-around;
}
.container3{
  padding-top: 55px;
  width: 33%;
}

.container2{
  width: 25%;
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
  background-image: url("../assets/profile.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: -50;
}
</style>