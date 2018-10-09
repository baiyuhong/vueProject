<style lang="scss" scoped>
  .contentBanlance{
    .headBox{
      padding:0.8rem 0;
      background-image:-webkit-linear-gradient(-45deg, #65babf 100px, #6ddbd4 240px);
      background-image:linear-gradient(135deg, #65babf 100px, #6ddbd4 240px);
      color:#fff;
      p{
        padding-bottom:0.3rem;
      }
      span{
        font-size: 0.6rem;
      }
      .btn-balance{
        width:1.3rem;
        padding:0.07rem 0;
        border:1px solid #fff;
        margin:0 auto;
        font-size: 0.3rem;
        border-radius:0.1rem;
        color:#fff;
        margin-top:0.2rem;
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
          margin-top:-0.16rem;
        }
        }
        time{
          color:#999;
        }
        &:nth-child(3n){
          .iconCir.color1{
            background-color: #59b5bb;
          }
        }
        &:nth-child(3n+1){
          .iconCir.color1{
            background-color: #70c165;
          }
        }
        &:nth-child(3n+2){
          .iconCir.color1{
            background-color: #7ab0fa;
          }
        }
        }

      }
    }
    .noBalance{
      padding-top:1.6rem;
      img{
        display:inline-block;
        width:1.46rem;
      }
      p{
        color:#999;
        margin-top:0.3rem;
      }
    }
  }
</style>

<template>
  <div class="contentBanlance">
    <div class="headBox text-center">
      <p class="fs32">余额 （元）</p>
      <span>{{ balanceInfo.balance }}</span>
      <div class="btn btn-balance" @click="withdrawCash">提现</div>
    </div>
    <div class="conBanlance">
      <div class="titBanlance fs34">明细</div>
      <div class="listBanlance ">
        <ul>
          <li v-for="item in balanceInfo.list">
            <h3>
              <span class="iconCir color1"></span>
              <span class="fs30">{{ item.topicDesc }}</span>
            </h3>
            <div class="mid fs28">
              <p><time class="fs28">{{ item.ctime }}</time></p>
              <span>{{  (item.amount_type==1 ? '+' : '-') + item.amount}}</span>
            </div>
          </li>
        </ul>
        <div v-show="noBanlance" class="noBalance text-center">
          <img src="../../assets/img/noArticle.png" alt="">
          <p class="fs30">暂无信息</p>
        </div>
      </div>
    </div>
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
        noBanlance:false,
        balanceInfo:''
      }
    },
    created(){
      document.getElementsByTagName('title')[0].innerHTML = '余额账户';
      this.getBalanceInfo();
    },
    methods:{
      getBalanceInfo(){
        var params = {
          user_id: localStorage.getItem(appUserId),
          authentication: auth
        }
        Indicator.open();
        netWrokUtils.post('/wechat/'+ gzhId +'/doctorBalanceDetail', params, (result) => {
          this.balanceInfo = result.data.data;
          if(result.data.data.list.length <= 0){
            this.noBanlance = true;
          }
          Indicator.close();
        }, (error_result) => {
          Indicator.close();
          Toast(error_result.data.msg);
        })
      },
      withdrawCash(){
        if(this.balanceInfo.isBank == 1){
          this.$router.push({name: 'docWithdrawSucc'})
        }else{
          //未添加银行卡
          this.$router.push({name: 'docWithdraw'})
        }
      }
    }
  };
</script>


