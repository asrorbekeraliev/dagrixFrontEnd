<template>
  <div class="external" v-if="this.loggedIn">
    <div class="bodyColor"></div>
    <div class="bodyFon"></div>
    <div class="container1">
      Profile Page
      <div class="container">
        <div>
          <input type="file" @change="uploadFile()" ref="file">
          <button @click="submitFile()">Upload!</button>
        </div>
        <div>
          <button @click="getFile()">GET FILE</button>
        </div>
        <img :src="image" width="100px"/>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Profile",
  data(){
    return {
      loggedIn: localStorage.getItem('loggedIn') == 'true',
      image: null,
      imageHashId: ''
    }
  },
  methods:{
    submitFile() {
      const formData = new FormData();
      formData.append('file', this.image);
      const headers = { 'Content-Type': 'multipart/form-data' };
      axios.post('/upload', formData, { headers }).then((res) => {
        res.data.files; // binary representation of the file
        res.status; // HTTP status
      });
    },

    uploadFile(){
      this.image = this.$refs.file.files[0];
      console.log(this.loggedIn)
    },
    async getFile(){
      axios.get('/get-hashId')
          .then(resp=>{
            this.imageHashId = resp.data;
            axios.get(`/file-preview/${resp.data}`, {responseType: "blob"})
                .then(async response => {
                  const base64data = await this.blobToData(response.data);
                  this.image = base64data;
                })
          })


    },
    blobToData(blob) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
      })
    }

  },
  beforeCreated(){
    this.getFile();
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
  background-image: url("../assets/profile.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: -50;
}
</style>