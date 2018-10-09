<style lang="scss" scoped>
  .containerPersonal{
    height:100vh;
    background-color:#f3f5f8;
    header{
      padding:0.47rem 0 0.27rem;
      background-color:#fff;
      div{
        img{
          display: inline-block;
          width:2rem;
          border-radius: 50%;
        }
      }
      .tomyinfo{
        color:#3e3e3e;
        text-decoration: none;
        margin-top:0.2rem;
      }
    }
    .conPersonal{
      ul{
        li{
          padding:0.36rem 15px;
          background-color:#fff;
          margin-top:0.2rem;
          display:-webkit-flex;
          display: flex;
          justify-content:space-between;
          color:#3e3e3e;
          .rItem{
            color:#999;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="containerPersonal">
    <header class="text-center">
      <div><img v-show="patHeadImg" :src="patHeadImg" alt=""><img v-show="haveHeadImg" src="../../assets/img/loginhead.png"></div>
      <router-link class="tomyinfo fs30" to='/wuhan_p/patMyInfo'> 完善信息<i class="iconfont icon-arrowR"></i> </router-link>
    </header>
    <div class="conPersonal">
      <ul class="fs30">
        <li @click="toAccountBalance">
          <span>余额账户</span>
          <span class="rItem fs28">{{ patInfo.balance }}<i class="iconfont icon-arrowR"></i></span>
        </li>
        <!--<li @click="toServiceTimes">-->
          <!--<span>服务次数</span>-->
          <!--<span class="rItem fs28">10<i class="iconfont icon-arrowR"></i></span>-->
        <!--</li>-->

      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {Toast,MessageBox} from 'mint-ui';
  import netWrokUtils from '../../components/NetWrokUtils'
  export  default {
    beforeRouteEnter(to, from, next){
      var params = {
        authentication: auth,
        user_id:localStorage.getItem(appUserId)
      };

      if(!params.user_id){
        next({name: 'patientLogin', query: {'from': to.path}}) //跳转登陆页面
      }

      netWrokUtils.post('/wechat/' + gzhId + '/patientStatus', params, (result) => {
        //status  1、未完善信息；2、已完善信息；3、账号在其他设备登录，请重新登录； 4、未登录
        var status = result.data.data.status;
        if(status == 3 || status == 4){
          next({name: 'patientLogin', query: {'from': to.path}}) //去登陆页面
        }else if(status == 1){
          next({name: 'patInfoPerfect', query: {'from': to.path}}) //去完善信息页
        }else{
          next(true); //已完善
        }
      }, (error_result) => {
        Toast(error_result.data.msg);
      })
    },
    data(){
      return {
        patHeadImg:'',
        haveHeadImg:false,
        patInfo:''
      }
    },
    created(){
      this.getPatientInfo();
      document.getElementsByTagName('title')[0].innerHTML = '个人中心';
    },
    methods:{
      getPatientInfo(){
        var params = {
          authentication: auth,
          user_id:localStorage.getItem(appUserId)
        };
        let that = this;
        netWrokUtils.post('/wechat/' + gzhId + '/getMyInfo', params, (result) => {
          console.log(result);
          that.patInfo = result.data.data;
          that.patHeadImg = result.data.data.head_img;
          that.haveHeadImg = result.data.data.head_img ? false : true;
        }, (error_result) => {
          Toast(error_result.data.msg);
        })
      },
      toAccountBalance(){
          this.$router.push('patAccountBalance');
      },
      toServiceTimes(){
        this.$router.push({path:'patServiceTimes'});
      }
    }
  };
</script>


