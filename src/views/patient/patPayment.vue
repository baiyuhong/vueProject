<style lang="scss" scoped>
  .btn_pay {
    display: block;
    outline: none;
    margin: 0 auto;
    margin-top:0.9rem;
    width: 90%;
    height: 0.9rem;
    line-height:0.9rem;
    background-color:#b2e5e7;
    border:none;
    color: #ffffff;
    border-radius: 0.45rem;
    background-image:-webkit-linear-gradient(0deg, #62b8bd 25%, #69d9d2 75%);
    background-image:linear-gradient(90deg, #62b8bd 25%, #69d9d2 75%);
  }

  .circle-left {
    top: 118px;
    left: 0;
  }

  .circle-right {
    top: 118px;
    right: 0;
  }
</style>
<template>
  <div class="device-width">
    <div class="parent-width parent-margin circular-bead box-shade pos-relate">
      <h2 class="text-center fs28 paddingT15 paddingB10">{{ paymentInfo.prepay_id }}</h2>
      <div class="fs30 color-warn text-center paddingT10">￥{{ price }}</div>
      <div class="item-height over-hidden marginT15 border-top-dash">
        <div class="parent-width parent-margin">
          <span class="font-bold">收款方</span>
          <span class="fr">治愈肝病联盟</span>
        </div>
      </div>
      <span class="half-circle-left circle-left pos-absolute bg-grey"></span>
      <span class="half-circle-right circle-right pos-absolute bg-grey"></span>
    </div>
    <div class="parent-width parent-margin text-center">
      <a @click="postPayInfo" class="fs32 color-white btn_pay">确认支付</a>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {Toast} from 'mint-ui';
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
        order_id: this.$route.params.order_id,
        price:this.$route.params.price,
        paymentInfo:'',
      }
    },
    created(){
      document.getElementsByTagName('title')[0].innerHTML = '支付信息';
      this.payInfo();
    },
    methods:{
      payInfo(){  //获取支付信息
        var that = this;
        var params = {
          order_id: this.order_id,
          authentication: auth,
        }
        netWrokUtils.post('/wechat/' + gzhId + '/payment', params, (result) => {

          that.paymentInfo = result.data.data;
        }, (error_result) => {
          Toast(error_result.data.msg);
        })
      },
      postPayInfo(){
        var that = this;
//        var params = {
//          order_id: this.order_id,
//          authentication: auth,
//        }
//        netWrokUtils.post('/wechat/' + gzhId + '/payment', params, (result) => {
//
//          that.paymentInfo = result.data.data;
//
//          WeixinJSBridge.invoke(
//            'getBrandWCPayRequest', {
//              "appId": result.data.data.appId,     //公众号名称，由商户传入
//              "timeStamp": result.data.data.timeStamp,         //时间戳，自1970年以来的秒数
//              "nonceStr": result.data.data.nonceStr, //随机串
//              "package": result.data.data.package,     //统一订单号
//              "signType": result.data.data.signType,         //微信签名方式：
//              "paySign": result.data.data.paySign //支付签名
//            }, function (res) {
//              if (res.err_msg == "get_brand_wcpay_request:ok") {       // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
//                wx.closeWxWindow();
//
//              }
//            })
//        }, (error_result) => {
//          Toast(error_result.data.msg);
//        })

        //调起支付
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
              "appId": that.paymentInfo.appId,     //公众号名称，由商户传入
              "timeStamp": that.paymentInfo.timeStamp,         //时间戳，自1970年以来的秒数
              "nonceStr": that.paymentInfo.nonceStr, //随机串
              "package": that.paymentInfo.package,     //统一订单号
              "signType": that.paymentInfo.signType,         //微信签名方式：
              "paySign": that.paymentInfo.paySign //支付签名
            }, function (res) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {       // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                wx.closeWindow();

              }
            })
      },
    }
  }
</script>
