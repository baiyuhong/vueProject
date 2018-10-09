<style lang="scss" scoped>
  .container{
    background: #f0f0f6;
    input::-webkit-input-placeholder{
      color: #ccc;
    }
    .col-ccc{color: #ccc;}
    .mar92{
      width:92%;
      margin: 0 auto;
    }
    .topBox{
      background: #fff;
      font-size: 0.26rem;
      line-height: 0.48rem;
      padding: 0.26rem 0;
      margin-bottom: 0.2rem;
      .col-64{color: #64b6c2;font-weight: bold;}
    }
    .senBox{
      background: #fff;
      font-size: 0.3rem;

      ul{
        li {
          display: -webkit-flex;
          display: flex;
          line-height: 1.1rem;
          border-bottom: 1px solid #eee;
          :nth-child(1) {
            margin-right: 0.26rem;
          }
        }
      }
      .subBtn{
        color: #fff;
        width: 87%;
        height: 0.9rem;
        background: #c5eef0;
        text-align: center;
        line-height: 0.9rem;
        margin: 0.9rem auto 0;
        border-radius: 0.5rem;
      }
      .btnnot_on{
        background-color: #5ab5ba;
      }
    }

  }
  .pickerBox{
    position: fixed;
    bottom: 0;
    left: 0;
    width:100%;
    background-color: #fff;
    .pickerTit{
      padding:0.3rem 0;
      color:#333;
      font-size:0.32rem;
    }
    .chooseBtnBox{
      display:-webkit-flex;
      display:flex;
      justify-content:space-between;
      div{
        width: 50%;
        text-align: center;
        padding:0.3rem;
        color:#666;
        font-size:0.32rem;
        &.enterBtn{
          color:#83c7cb;
        }
      }
    }
  }
  .maskCert{
    position: fixed;
    left:0;
    top:0;
    width: 100vw;
    height:100vh;
    background:rgba(0,0,0,0.4);
  }

  .picker-item.picker-selected{
    color:#59b4b9 !important;
  }
</style>

<template>
  <div class="container">
    <div class="topBox">
      <div class="mar92">
        医生服务费按月结算，请在本月20日前完善提现信息，确保及时提现，如有疑问，请联系客服
        <span class="col-64">400-7791-122 </span>
      </div>

    </div>
    <div class="senBox">
      <div class="mar92">
        <ul>
          <li>
            <span>选择银行：</span>
            <span>{{bankName}}</span>
          </li>
          <li>
            <span>开户人姓名：</span>
            <span>{{bankUserName}}</span>
          </li>
          <li>
            <span>银行卡号：</span>
            <span>{{bankCard}}</span>
          </li>
          <li>
            <span>身份证号：</span>
            <span>{{idCardNum}}</span>
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
        bankName:'',
        bankUserName:'',
        bankCard:'',
        idCardNum:''
      }
    },
    beforeMount(){
      this.requstBank();
    },
    created(){
      document.getElementsByTagName('title')[0].innerHTML = '提现';
    },
    methods:{

      //获取银行列表
      requstBank(){
        var params = {
          authentication: auth,
          user_id:localStorage.getItem(appUserId)
        }
        netWrokUtils.post('/wechat/' + gzhId + '/getBankInfo', params, (result) => {
            this.bankName=result.data.data.bank_name;
            this.bankUserName=result.data.data.bank_username;
            this.bankCard=result.data.data.bank_card;
            this.idCardNum=result.data.data.id_card;

        }, (error_result) => {
          Toast(error_result.data.msg);
        })
      }
    }
  }
</script>


