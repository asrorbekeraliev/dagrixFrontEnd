<template>
  <div>

    <nav class="navbar navbar-expand-lg bg-light" style="background-color: transparent !important;">
      <div class="container">
        <div class="col">
          <img src="../../assets/dagrix.png" style="width: 200px; float: left">
        </div>
        <div class="col"><a class="navbar-brand"><router-link class="titolo" to="/">Home</router-link></a></div>
        <div class="col"><a class="navbar-brand" href="/#">About</a></div>
        <div class="col"><a class="navbar-brand" href="/#">News</a></div>
        <div class="col"><a class="navbar-brand" href="/#">Contact us</a></div>
        <div class="col">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent !important;">
              <img src="../../assets/icons8-user-64.png" width="32">
            </button>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
              <li><a class="dropdown-item" href="/login">Log In</a></li>
              <li><a class="dropdown-item" href="/register">Register</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "ExternalHeader"
}
</script>

<style scoped>
.navbar-brand{
  color: rgb(255, 255, 255);
}


.titolo{
  text-decoration: none !important;
  font-family: monospace;
  font-size: 25px;
  color: rgb(255, 255, 255);
}

</style>