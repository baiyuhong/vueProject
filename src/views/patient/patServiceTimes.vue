<style lang="scss" scoped>
  .contentBanlance{
    .headBox{
      padding:1.16rem;
      background-image:-webkit-linear-gradient(135deg, #65babf 100px, #6ddbd4 240px);
      background-image:linear-gradient(135deg, #65babf 100px, #6ddbd4 240px);
      color:#fff;
      p{
        padding-bottom:0.3rem;
      }
      span{
        font-size: 0.6rem;
      }
    }
    .conBanlance{
      .titBanlance{
        color:#333;
        padding:0.38rem 0.3rem;
        border-bottom:1px solid #d2d2d2;
      }
      .listBanlance{
        .iconCir{
          display:block;
          width:0.16rem;
          height:0.16rem;
          border-radius:50%;
          overflow:hidden;
          margin-top:0.06rem;
          margin-right:0.15rem;

        }
        li{
          width:92%;
          margin:0 auto;
          padding:0.38rem 0;
          border-bottom:1px solid #d2d2d2;
          &:nth-child(2n) .iconCir{
            background-color: #70c165;
          }

          &:nth-child(2n+1) .iconCir{
            background-color: #7ab0fa;
          }
          h3{
            display:flex;
            display: -webkit-flex; /* Safari */
            color:#333;
          }
          .mid{
            color:#999;
            display:-webkit-flex;
            display: flex;
            justify-content: space-between;
            padding:0.16rem 0;
            span{
              color:#333;
            }
          }
          time{
            color:#999;
          }

        }
      }
    }
  }
</style>

<template>
  <div class="contentBanlance">
    <div class="headBox text-center">
      <p class="fs32">可用服务次数</p>
      <span>10</span>
    </div>
    <div class="conBanlance">
      <div class="titBanlance fs34">服务明细</div>
      <div class="listBanlance ">
        <ul>
          <li>
            <h3>
              <span class="iconCir"></span>
              <span class="fs30">解读化验单</span>
            </h3>
            <div class="mid fs28">
              <p>服务医生：高英    &nbsp;&nbsp;&nbsp;&nbsp;副主任医生</p>
              <span>-1</span>
            </div>
            <time class="fs28">2017-09-12  14:18</time>
          </li>
          <li>
            <h3>
              <span class="iconCir"></span>
              <span class="fs30">解读化验单</span>
            </h3>
            <div class="mid fs28">
              <p>服务医生：高英    &nbsp;&nbsp;&nbsp;&nbsp;副主任医生</p>
              <span>-1</span>
            </div>
            <time class="fs28">2017-09-12  14:18</time>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {Toast,MessageBox,Picker} from 'mint-ui';
  import netWrokUtils from '../../components/NetWrokUtils'
  export  default {
//    beforeRouteEnter(to, from, next){
//      var params = {
//        authentication: auth,
//        user_id:localStorage.getItem(appUserId)
//      };
//
//      if(!params.user_id){
//        next({name: 'patientLogin', query: {'from': to.path}}) //跳转登陆页面
//      }
//
//      netWrokUtils.post('/wechat/' + gzhId + '/patientStatus', params, (result) => {
//        //status  1、未完善信息；2、已完善信息；3、账号在其他设备登录，请重新登录； 4、未登录
//        var status = result.data.data.status;
//        if(status == 3 || status == 4){
//          next({name: 'patientLogin', query: {'from': to.path}}) //去登陆页面
//        }else if(status == 1){
//          next(true);
//
//        }else{
//          wx.closeWindow(); //已完善
//        }
//      }, (error_result) => {
//        Toast(error_result.data.msg);
//      })
//    },
    data(){
      return {

      }
    },
    created(){
      document.getElementsByTagName('title')[0].innerHTML = '服务次数';
    },
    methods:{

    }
  };
</script>


