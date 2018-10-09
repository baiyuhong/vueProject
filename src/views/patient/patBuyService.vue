<style lang="scss" scoped>
  .container{
    background-color:#f3f5f8;
    .topItem{
      background-color:#fff;
      .listItem:last-child{
        border-bottom:none;
      }
    }
    .listItem{
      border-bottom:1px solid #e1e6ed;
      padding:0.34rem 0;
      width: 92%;
      margin-left:4%;
      padding-right:4%;
      font-size:0.32rem;
      display:-webkit-flex;
      display:flex;
      justify-content: space-between;
        .lItem{
          color:#333;
        }
      &.titItem{
        padding-left:4%;
        margin-left:0;
      }
      .serTit{
        color:#333;
        display: block;
        margin-bottom:0.2rem;
      }
      .serviceBox{
        line-height: 0.44rem;
        color:#999;
      }
      &.balanceItem{
         align-items:center;
        .rbox{
          display:-webkit-flex;
          display: flex;
          align-items:center;
          span{
            line-height: 0.3rem;
            padding-right:0.1rem;
          }
        }

      }
    }
    .mainItem{
      background-color:#fff;
      margin-top:0.3rem;
      .listItem:last-child{
        border-bottom:none;
      }
      .idCardItem{
        .leftItem{
          height: 0.73rem;
          display: -webkit-flex;
          display:flex;
          flex-direction:column ;
          justify-content: space-between;
        }
        .idcard{
          width:3.5rem;
          height:0.68rem;
          border:1px solid #dcdcdc;
        }
      }
    }
    .xybox{
      padding:0.26rem 0.33rem 0.68rem;
      span{
        color:#269bcc;
      }
    }
    .submitItem{
      background-color: #fff;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      line-height: 1.0rem;
      .leftItem{
        margin-left:0.3rem;
      }
      .submitBtn{
        width:2.4rem;
        height:1.1rem;
        color:#fff;
        text-align: center;
        background-color: #58b7bc;
      }
    }
  }
  .colorRed{
    color:#e14f4f;
  }

</style>
<template>
  <div class="container">
    <div class="topItem">
      <div class="listItem titItem">
        <span class="lItem">
          {{ packData.pack_name }}
        </span>
      </div>
      <div class="listItem">
        <span class="lItem">签约医生</span>
        <i>{{ packData.doctor_name }}</i>
      </div>
      <div class="listItem">
        <div class="serviceBox">
          <p class="serTit">服务详情：</p>
          <span class="color-base"> 医生慢病管理服务，包括：</span><br>
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
          <span class="color-base" v-for="item in packData.drugInfo">
            {{ item }}<br>
          </span>

          <span v-if="packData.insurancenum" class="color-base" v-for="">
            赠送肝硬化保险{{ packData.insurancenum }}
          </span><br>
        </div>
      </div>
      <div class="listItem">
        <span>服务总价</span>
        <span>￥{{ packData.price }}</span>
      </div>
      <div class="listItem balanceItem">
        <span>余额抵扣</span>
        <div class="rbox">
          <span>￥{{ packData.deductionamount }}</span>
          <mt-switch v-model="balanceSel" @change="changeDeduc"></mt-switch>
        </div>
      </div>
      <div class="listItem">
        <span></span>
        <span>
          小计：
          <i class="colorRed">￥{{  numPrice ? numPrice : packData.price }}</i>
        </span>
      </div>
    </div>
    <div class="mainItem">
      <div class="listItem">
        <span>患者信息</span>
        <span>{{ packData.patient_name }} {{ packData.patient_mobile }}</span>
      </div>
      <div class="listItem idCardItem">
        <div class="leftItem">
          <p>身份证号&nbsp;&nbsp;<i class="fs28">  （非必填）</i></p>
          <span class="colorRed">赠送保险，请准确填写</span>
        </div>
        <div class="rItem">
          <input class="idcard" type="text" v-model="idCard">
        </div>
      </div>
      <div class="listItem" @click="toRemarks">
        <span>备注<i class="fs28">（非必填）</i></span>
        <div class="rItem">
          {{ patientremarks | fixRemarks  }}
          <i class="iconfont icon-arrowR"></i>
        </div>
      </div>
    </div>
    <div class="xybox fs30">
      下单即同意<span @click="toServiceAgreement">《家庭医生签约服务协议》</span>
    </div>
    <div class="submitItem">
      <div class="leftItem">合计 <i class="">¥{{ numPrice ? numPrice : packData.price }}</i></div>
      <div class="submitBtn" @click="submitOrder">
        提交订单
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {Toast, Switch} from 'mint-ui';
  import netWrokUtils from '../../components/NetWrokUtils'
  import '../../../static/editmintui.css';  //改变mint ui默认样式
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
        patInfo:'',
        balanceSel:(localStorage.getItem("balanceSel") === 'false') ? false : true,
        packData:'',
        numPrice:'',  //总价
        idCard:localStorage.getItem("serviceIdCard"),  //身份证号
        patientremarks:this.$route.query.remarks ? this.$route.query.remarks : '',
        user_id: localStorage.getItem(appUserId),
        doctor_id: this.$route.query.doctor_id,
        pack_id:this.$route.query.pack_id,
      }
    },
    created(){


      this.getOrderInfo();
      document.getElementsByTagName('title')[0].innerHTML = '确认签约信息';

    },
    filters:{
      fixRemarks:function(value){  //备注最多10个字
        var Val = value.substr(0,10);
        if(value.length > 10){
          Val = Val+'...';
        }

        return Val;
      }
    },
    watch:{
      'idCard':function(){
        localStorage.setItem("serviceIdCard", this.idCard)
      },
    },
    methods:{
      //获取订单信息
      getOrderInfo(){
        var that = this;
        var params={
          user_id: this.user_id,
          doctor_id: this.doctor_id,
          pack_id:this.pack_id,
        }
        netWrokUtils.post('/wechat/' + gzhId + '/orderDown', params, (result) => {

          that.numPrice =  that.balanceSel ?  that.util.Subtr(result.data.data.price, result.data.data.deductionamount) : result.data.data.price;
          that.packData = result.data.data;
//          console.log(result);
        }, (error_result) => {
          Toast(error_result.data.msg);
        })

      },
      toRemarks(){   //备注页
        let that = this;
        this.$router.push({name:'patRemarks', query:{"remarks": that.patientremarks, "doctor_id":that.doctor_id, "pack_id":that.pack_id}});

      },
      toServiceAgreement(){   //服务协议页
        let that = this;
        this.$router.push({name:'serviceAgreement', query:{"remarks": that.patientremarks, "doctor_id":that.doctor_id, "pack_id":that.pack_id}});

      },
      //余额抵扣
      changeDeduc(){

        localStorage.setItem("balanceSel", this.balanceSel);
        if(this.balanceSel){
          this.numPrice = this.util.Subtr(this.packData.price, this.packData.deductionamount);
        }else{
          this.numPrice = this.packData.price;
        }
      },
      //提交订单
      submitOrder(){
        var that = this;
        var params = {
          user_id: this.user_id,
          doctor_id: this.doctor_id,
          pack_id:this.pack_id,
          patient_id: this.packData.patient_id,
          deductionamount: this.balanceSel ? this.packData.deductionamount : '0.00',
          paymentamount: this.numPrice,
          idnumber: this.idCard,                //身份证号
          patientremarks: this.patientremarks,  //备注
        }
        console.log(params);

        if(params.idnumber){
          if((/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(params.idnumber) == false){
            Toast('请输入正确身份证！');
            return false;
          }
        }

        netWrokUtils.post('/wechat/' + gzhId + '/generateOrder', params, (result) => {
          that.packData = result.data.data;
          //本地缓存处理
          localStorage.setItem("balanceSel", true);
          localStorage.setItem("serviceIdCard", "");

          //如果是0.00
          if(result.data.data.isPay == 2){
            var zeroParam={};
                zeroParam.order_id = result.data.data.order_id;
                zeroParam.authentication = auth;
            netWrokUtils.post('/wechat/' + gzhId + '/zeroPurchase', zeroParam, (result) => {

                  wx.closeWindow();

            }, (error_result) => {
              Toast(error_result.data.msg);
            })
            return false;
          }
          this.$router.push({name:'patPayment', params:{'order_id': result.data.data.order_id, 'price': that.numPrice}});
        }, (error_result) => {
          Toast(error_result.data.msg);
        })
      }

    }
  };
</script>


