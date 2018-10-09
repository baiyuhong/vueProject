<style lang="scss" scoped>
  .container{
    height:100vh;
    background-color:#f3f5f8;
    overflow:hidden;
  .textBox{
    margin:0 auto;
    margin-top:0.46rem;
    width:6.5rem;
    height:3.32rem;
    padding:0.3rem;
    background-color:#fff;
  textarea{
    border:none;
    resize: none;
    font-size: 0.28rem;
    width:6.2rem;
    line-height: 0.38rem;
    font-family: 'Microsoft YaHei';
    height: 2.56rem;
  }
  div{
    color:#999;
    line-height: 0.66rem;
    text-align: right;
  }
  }
  .toInfo {
    display: block;
    outline: none;
    margin: 0 auto;
    margin-top:0.9rem;
    width: 90%;
    height: 0.9rem;
    background-color:#b2e5e7;
    border:none;
    color: #ffffff;
    border-radius: 0.45rem;
  &.active{
     background-image:-webkit-linear-gradient(0deg, #62b8bd 25%, #69d9d2 75%);
     background-image:linear-gradient(90deg, #62b8bd 25%, #69d9d2 75%);
   }
  }
  }
</style>

<template>
  <div class="container">
    <div class="textBox">
      <textarea placeholder="请简单介绍一下自己，便于患者了解你，信任你" v-model="intro"></textarea>
      <div class="infotext fs28">{{ fontNum }}/400</div>
    </div>
    <button class="toInfo" :class="isActive ? 'active' : ''" @click="toInfo">
      <label class="mint-button-text fs32">提 交</label>
    </button>
  </div>
</template>

<script>
  import axios from 'axios';
  import {Toast,MessageBox,Indicator} from 'mint-ui';
  import netWrokUtils from '../../components/NetWrokUtils'
  export  default {
    beforeRouteEnter(to, from, next){
      var params = {
        authentication: auth,
        user_id:localStorage.getItem(appUserId)
      };

      if(!params.user_id){
        next({name: 'docLogin', query: {'from': to.path}}) //跳转登陆页面
      }

      netWrokUtils.post('/wechat/' + gzhId + '/doctorStatus', params, (result) => {
        //status  1、未完善信息；2、已完善信息；3、账号在其他设备登录，请重新登录； 4、未登录
        var status = result.data.data.status;
        if(status == 3 || status == 4){
          next({name: 'docLogin', query: {'from': to.path}}) //去登陆页面
        }else{
         next(true);
        }
      }, (error_result) => {
        Toast(error_result.data.msg);
      })
    },
    data(){
      return {
        intro: this.$route.params.intro,
        fontNum:this.$route.params.intro.length,
        isActive:this.$route.params.intro ? true : false,
      }
    },
    created(){
      document.getElementsByTagName('title')[0].innerHTML = '简介';
    },
    watch:{
      'intro' () {
        this.fontNum = this.intro.length;
        if(this.fontNum >400){
          this.intro = this.intro.substring(0, 400);
        }
        if(this.intro.length >= 2){
          this.isActive = true;
        }else{
          this.isActive = false;
        }
      }
    },
    methods:{
      toInfo(){
        var params = {
          authentication: auth,
          user_id:localStorage.getItem(appUserId),
          //user_id:127,
          intro: this.intro
        };
        //Indicator.open('登录中');
        if(this.fontNum==1 || !this.isActive){
          return;
        }
        netWrokUtils.post('/wechat/' + gzhId + '/editIntro', params, (result) => {
          Toast({
            message: '提交成功',
            duration: 1900
          });
          setTimeout(()=>{
            this.$router.push({name:'docMyInfo'});
          },2000)

        }, (error_result) => {
          Toast(error_result.data.msg);
        })
      }
    }
  };
</script>


