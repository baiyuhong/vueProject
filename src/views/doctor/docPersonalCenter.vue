<style lang="scss" scoped>
  .container{
    min-height:100vh;
    background-color:#f3f5f8;
    .headInfo{
      display:-webkit-flex;
      display:flex;
      justify-content: space-between;
      padding:0.5rem 0;
      background-color:#fff;
      .imgBox{
        padding:0 0.3rem;

        img{
          display:block;
          width:1.82rem;
          height:1.82rem;
          border-radius:50%;

        }
      }
      .midBox{
        width:4.6rem;
        color:#666;
        padding-top:0.2rem;
        line-height:0.48rem;
        p{
          span{
            color:#3e3e3e;
          }
          .certifiIcon{
            display: inline-block;
            width:1.16rem;
            vertical-align: middle;
            margin-top:-2px;
          }
        }
        div{
          span{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
      }
      .rBoc{
        width:0.3rem;
        color:#7d7d7d;
        padding-right:0.28rem;
        i{
          display:block;
          margin-top:0.8rem;
        }
      }
    }
    .conMenuList{
      margin-top:0.2rem;
      li{
        background-color:#fff;
        padding:0.38rem 0.3rem;
        display:-webkit-flex;
        display:flex;
        justify-content: space-between;
        .lItem{
          color:#3e3e3e;
        }
        .rItem{
          color:#999;
        }
      }
    }
  }
</style>

<template>
  <div class="container">
    <div class="headInfo">
      <div class="imgBox">
        <img  v-show="docInfo.head_img" :src="docInfo.head_img" alt="">
        <img v-show="haveHeadImg" src="../../assets/img/loginhead.png" alt="">
      </div>
      <div class="midBox fs30">
        <p>
          <span class="fb">{{ docInfo.doctor_name }}</span>
          {{ docInfo.gradeName }}
          <i><img class="certifiIcon" src="../../assets/img/certification.png" alt=""></i>
        </p>
        <div >
          <span>{{ docInfo.hospitalName }}</span>
          {{ docInfo.departmentName }}
        </div>
      </div>
      <div class="rBoc" @click="goMyInfo">
        <i class="iconfont icon-arrowR"></i>
      </div>
    </div>
    <div class="conMenuList">
      <ul>
        <li @click="goAccountBalance">
          <div class="lItem fs30">余额账户</div>
          <div class="rItem fs28">
            {{ docInfo.balance }}<i class="iconfont icon-arrowR"></i>
          </div>
        </li>
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
        docInfo:'',
        haveHeadImg:false,  //是否有头像
      }
    },
    created(){
      document.getElementsByTagName('title')[0].innerHTML = '个人中心';
      this.getPatientList()
    },
    methods:{
      getPatientList(){
        var params = {
          authentication: auth,
          user_id:localStorage.getItem(appUserId)
        };
        var that = this;
        netWrokUtils.post('/wechat/' + gzhId + '/getMyInfo', params, (result) => {
          that.docInfo = result.data.data;
          that.haveHeadImg = result.data.data.head_img ? false : true;
        }, (error_result) => {
          Toast(error_result.data.msg);
        })
      },
      goMyInfo(){
        this.$router.push('docMyInfo');
      },
      goAccountBalance(){
        this.$router.push('docAccountBalance');
      }
    }
  }
</script>


