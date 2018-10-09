<template>
  <div id="app">
    <router-link class="btn-index" to='/wuhan_p/patientLogin'> 患者 </router-link>
    <router-link class="btn-index" to='/wuhan_d/doctorMenu'> 医生 </router-link>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .btn-index{
    display:inline-block;
    width:80%;
    padding:20px 40px;
    margin-top:50px;
    background:#42b983;
    text-align:center;
    color:#fff;
    font-size:18px;
  }
</style>
