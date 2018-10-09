<style lang="scss" scoped>
  .containerPatList{
    ul{
      li{
        display:-webkit-flex;
        display:flex;
        justify-content:space-between;
        padding:0.28rem;
        border-bottom:1px solid #d0cece;
        .headimg{
          width:1.76rem;
          img{
            display: block;
            width:1.20rem;
            height:1.20rem;
            border-radius:50%;
          }

        }
        .midItem{
          width:3.78rem;
          p{
            margin-top:0.15rem;
            color:#666;
            span{
              color:#333;
            }
          }
          div{
            margin-top:0.25rem;
            span{
              color:#fff;
              display:inline-block;
              padding:0.05rem 0.2rem;
              border-radius:0.08rem;
              line-height:0.5rem;
              &.color1{
                background-color:#a4c8f9;
              }
              &.color2{
                margin-left:0.1rem;
                background-color:#47c1c8;
              }
            }
          }
        }
        .rItem{
          padding-top:0.3rem;
          color:#999;
          line-height: 0.3rem;
        }
      }
    }
    .noData{
      position:absolute;
      top:10vh;
      width:100%;
      p{
        color:#999;
        line-height: 0.88rem;
        font-size:0.38rem;
      }
      img{
        display:block;
        width:1.5rem;
        margin:0 auto;
        margin-top:45%;

      }
    }
    .hidden{
      display:none;
    }
  }
</style>
<template>
  <div class="containerPatList">
    <ul>
      <li v-for="item in patientList">
        <div class="headimg">
          <img :src="item.head_img ? item.head_img : '../../assets/img/loginhead.png'">
        </div>
        <div class="midItem">
          <p class="fs28">
            <span class="fs30">{{ item.patient_name }}</span>&nbsp;&nbsp;{{ item.sex }}&nbsp;&nbsp;{{ item.age }}岁
          </p>
          <div class="fs24">
            <span class="color1" v-if="item.disease_name">{{ item.disease_name }}</span>
            <span class="color2" v-if="item.topic_name">{{ item.topic_name }}</span>
          </div>
        </div>
        <div class="rItem fs22 text-center">
          入组时间<br>
          {{ item.addtime }}
        </div>
      </li>

    </ul>
    <div class="noData" :class="{'hidden': isNoData}">
      <img src="../../assets/img/noArticle.png" alt="">
      <p class="text-center">暂无患者</p>
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
        patientList:'',
        isNoData:true
      }
    },
    created(){
      document.getElementsByTagName('title')[0].innerHTML = '我的患者';

      this.getPatientList()
    },
    methods:{
      getPatientList(){
        var params = {
          authentication: auth,
          user_id:localStorage.getItem(appUserId)
        };
        let that = this;
        netWrokUtils.post('/wechat/' + gzhId + '/myPatientList', params, (result) => {
          that.patientList = result.data.data;
          that.isNoData = (result.data.data.length <= 0) ? false : true;
          document.getElementsByTagName('title')[0].innerHTML = '我的患者('+that.patientList.length+')';
        }, (error_result) => {
            Toast(error_result.data.msg);
        })
      }
    }
  }
</script>


