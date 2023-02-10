<template>
  <div class="external">
    <div class="bodyColor"></div>
    <div class="bodyFon"></div>
    <div class="container1">
      Profile Page
      <div class="container">
        <div>
          <h2>Single File</h2>
          <hr/>
          <label>File
            <input type="file" @change="handleFileUpload( $event )"/>
          </label>
          <br>
          <button v-on:click="submitFile()">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Profile"
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