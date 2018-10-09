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
          display:-webkit-flex;
          display:flex;
          justify-content: space-between;

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
          .time{
            color:#999;
            padding-top:0.2rem;
          }
          .rightItem{
            color:#333;
            line-height: 0.65rem;
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
    </div>
    <div class="conBanlance">
      <div class="titBanlance fs34">明细</div>
      <div class="listBanlance ">
        <ul>
          <li v-for="item in balanceInfo.list">
            <div class="leftitem">
              <h3>
                <span class="iconCir"></span>
                <span class="fs30">{{ item.topicDesc }}</span>
              </h3>
              <div class="fs28 time">{{ item.ctime }}</div>
            </div>
            <div class="rightItem fs30">
              {{  (item.amount_type==1 ? '+' : '-') + item.amount}}
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
        next({name: 'patientLogin', query: {'from': to.path}}) //跳转登陆页面
      }

      netWrokUtils.post('/wechat/' + gzhId + '/patientStatus', params, (result) => {
        //status  1、未完善信息；2、已完善信息；3、账号在其他设备登录，请重新登录； 4、未登录
        var status = result.data.data.status;
        if(status == 3 || status == 4){
          next({name: 'patientLogin', query: {'from': to.path}}) //去登陆页面
        }else if(status == 1){
          next({name:'patInfoPerfect'});
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
      document.getElementsByTagName('title')[0].innerHTML = '账户余额';
      this.getBalanceInfo();
    },
    methods:{
      getBalanceInfo(){
        var params = {
          user_id: localStorage.getItem(appUserId),
          authentication: auth
        }
        Indicator.open();
        netWrokUtils.post('/wechat/'+ gzhId +'/patientBalanceDetail', params, (result) => {
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
    }
  };
</script>


