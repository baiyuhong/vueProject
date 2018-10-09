<style lang="scss" scoped>
  .container{
    .hasPay{height: 0.62rem; line-height: 0.62rem; text-align: center; background: #f3f5f8;
      color: #999999;}
    .orderTit{line-height: 1.04rem; font-weight: bold;}
    .padL15{padding-left: 0.3rem}
    .qhCodeBox{width: 6.9rem; height: 1.7rem; border-radius: 0.1rem;overflow: hidden; box-shadow: -2px 2px 5px #f1f1f1}
    .qhCodeTop{height: 0.4rem; background: linear-gradient(60deg,#5ab5ba,#4bc6cd)}
    .qhCodeNum{display: flex; display: -webkit-flex; align-items: center; -webkit-align-items: center;
      justify-content: space-between; -webkit-justify-content: space-between; height: 1.3rem;}
    .qhCodeNum span{width: 2.24rem; text-align: center; height: 0.7rem; line-height: 0.7rem; border-left: 1px solid #b5b5b5;}
    .qhCodeNum i{flex-grow: 1; -webkit-flex-grow: 1; text-align: center; color:#5ab5ba; font-weight: bold; font-size: 0.32rem}
    .botBar{height: 0.2rem; background: #f3f5f8;}
    .orderTips{height: 1.1rem; padding-top: 0.3rem; border-bottom: 1px solid #e1e6ed;}
    .orderTips p,.orderAddr p{line-height: 0.44rem; color: #666;}
    .orderAddr p.col-5ab{color:#5ab5ba;}
    .orderAddr{padding: 0.2rem 0;}
    .orderSenItem .orderTit{border-bottom: 1px solid #e1e6ed;}
    .orderDoc{display: flex; display: -webkit-flex; align-items: center; -webkit-align-items: center;
      justify-content: space-between; -webkit-justify-content: space-between; height: 1.04rem; border-bottom: 1px solid #e1e6ed; }
    .orderDoc i{margin-right: 0.3rem;}
    .col-999{color: #999;}
    .col-666{color: #666;}
    .orderSenDeta p{line-height: 0.46rem; width: 96%;}
    .orderSenDeta>p{padding: 0.2rem 0;}
    .orderSenDeta{padding-bottom: 0.2rem}
  }
</style>

<template>
  <div class="container">
    <div class="hasPay fs28">已支付</div>
    <div class="padL15">
      <div class="orderTit fs30">取货码</div>
      <div class="qhCodeBox">
        <div class="qhCodeTop"></div>
        <div class="qhCodeNum">
          <i>{{codeNum}}</i>
          <span class="fs28" v-if="iftake==1">未取药</span>
          <span class="fs28" v-if="iftake==2">已取药</span>
        </div>
      </div>
      <div class="fs24">
        <div class="orderTips">
         <p>1. 请不要把提货码泄露给他人</p>
         <p>2. 请携带药品处方，出示手机号及取货码去以下药店取药</p>
        </div>
        <div class="orderAddr" v-for="item in pharmacy">
          <p>{{item.pharmacy_name}}</p>
          <p class="col-5ab">{{item.pharmacy_tel}}</p>
          <p>{{item.address}}</p>
        </div>
      </div>
    </div>
    <div class="botBar"></div>
    <div class="orderSenItem">
      <div class="orderTit fs30 padL15">{{packName}}</div>
      <div class="fs26 padL15">
        <div class="orderDoc">
          <p class="fs28">签约医生</p>
          <i class="col-999">{{docName}}</i>
        </div>
        <div class="orderSenDeta">
          <p class="fs28">服务详情</p>
          <div class="col-666">
            <p>医生慢病管理服务，包括：</p>
            <span>
              专属医生4周服务<br>
            </span>
            <span>
              随访管理<br>
            </span>
            <span>
              定期复诊提醒<br>
            </span>
            <span>
              电子病历管理<br>
            </span>
            <p v-for="item in drugInfo">{{item}}</p>
            <p v-if="insurancenum">奖励积分1000（可换取医生咨询，预约等服务） <br>赠送肝硬化保险 {{insurancenum}}份</p>
          </div>
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
        }else{
          next(true);
        }
      }, (error_result) => {
        Toast(error_result.data.msg);
      })
    },
    data(){
      return {
        codeNum:'',
        packName:'',
        docName:'',
        iftake:1,
        drugInfo:[],
        insurancenum:0,
        pharmacy:[]
      }
    },
    created(){
      document.getElementsByTagName('title')[0].innerHTML = '签约详情';
      this.getOrderDetail();
    },

    methods:{
      getOrderDetail(){
        var params = {
          user_id : localStorage.getItem(appUserId),
          order_id:this.$route.query.order_id
        }
        netWrokUtils.post('/wechat/' + gzhId + '/orderInfo', params, (result) => {
          console.log(result);
          if(result.data.code == 2000){
            this.codeNum=result.data.data.pickupcode;
            this.packName=result.data.data.pack_name;
            this.docName=result.data.data.doctor_name;
            this.iftake=result.data.data.iftake;
            this.drugInfo=result.data.data.drugInfo;
            this.insurancenum=result.data.data.insurancenum;
            this.pharmacy=result.data.data.pharmacy;
          }

        }, (error_result) => {
          Toast(error_result.data.msg);
        })
      }

    }
  };
</script>


