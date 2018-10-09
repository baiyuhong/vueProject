<style lang="scss" scoped>
  .containerIntro{
    width:92%;
    margin:0 auto;
    padding-top:0.3rem;
    color:#333;
    text-align: justify;
    line-height: 0.4rem;
    text-indent:2em;

    img{
      display:block;
      width: 100%;
      margin:0.2rem auto;
    }
  }
</style>

<template>
  <div class="containerIntro fs30">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
    <img src="../assets/img/unionintro.jpg" alt="">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
  </div>
</template>

<script>
  import axios from 'axios';
  import {Toast,MessageBox,Picker} from 'mint-ui';
  import netWrokUtils from '../components/NetWrokUtils'
  export  default {
    data(){
      return {

      }
    },
    created(){
      document.getElementsByTagName('title')[0].innerHTML = '联盟简介';
    },
    methods:{

    }
  };
</script>


