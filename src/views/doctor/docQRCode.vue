<style lang="scss" scoped>
  .containerQR{
    min-height:100vh;
    padding:0.4rem 0;
    background:#f0f0f6;
    .mainQR{
      margin:0 auto;
      width: 92%;
      min-height:91vh;
      background-color:#fff;
      border-radius:0.2rem;
      padding-bottom:0.9rem;
      .headBox{
        margin:0 auto;
        width:6.28rem;
        padding:1.15rem 0 0.8rem;
        border-bottom:1px solid #d2d2d2;
        img{
          margin-top:0.58rem;
          display:block;
          width:85%;
          margin:0 auto;
        }
        .price{
          color:#cc3333;
          line-height:0.9rem;
        }
        p{
          color:#999;

        }
      }
      .itemBox{
        margin:0 auto;
        width:6.28rem;
        padding-top:0.68rem;
        color:#666;
        dl{
          display:-webkit-flex;
          display:flex;

          dt{
            min-width:0.45rem;
            i{
              display:block;
              width:0.2rem;
              height:0.2rem;
              border-radius:50%;
              background:#7ab0fa;
              margin-top:0.1rem;
              &.color1{
                background-color:#bdc801;
              }
               &.color2{
                background-color:#f3c274;
               }
            }
          }
          dd{
            i{
              display:inline-block;
              width:0.3rem;
              height:0.3rem;
              text-align: center;
              line-height: 0.3rem;
              font-size: 0.24rem;
              border:1px solid #000;
              border-radius:50%;
              margin-right:0.1rem;
            }
            line-height:0.45rem;
          }
        }
      }
    }

  }
</style>

<template>
  <div class="containerQR">
    <div class="mainQR">
      <div class="headBox  text-center">
        <div class="tit fs32">{{ detailData.pack_name }}</div>
        <img :src="detailData.url" alt="">
        <div class="price fb">￥{{detailData.price}}</div>
        <p class="fs26"> 该二维码当天24点前有效，重新进入将更新 </p>
      </div>
      <div class="itemBox fs28">
        <dl>
          <dt>
            <i></i>
          </dt>
          <dd>
            医生慢病管理服务，包括：<br>
            <span>
              <i>1</i>专属医生4周服务<br>
            </span>
            <span>
              <i>2</i>随访管理<br>
            </span>
            <span>
              <i>3</i>定期复诊提醒<br>
            </span>
            <span>
              <i>4</i>电子病历管理<br>
            </span>
          </dd>
        </dl>
        <dl v-for="item in detailData.drugInfo">
          <dt>
            <i class="color1"></i>
          </dt>
          <dd>
            {{ item }}
          </dd>
        </dl>
        <dl v-if="detailData.insurancenum">
          <dt>
            <i class="color2"></i>
          </dt>
          <dd>
            赠送肝硬化保险{{ detailData.insurancenum }}份
          </dd>
        </dl>
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
        detailData: [],
      }
    },
    created(){
      document.getElementsByTagName('title')[0].innerHTML = '二维码';
      this.getData();
    },
    methods:{
      getData(){
        var params = {
          user_id:localStorage.getItem(appUserId),
          pack_id: this.$route.query.presid,  //服务包id
        };
        var that = this;
        netWrokUtils.post('/wechat/' + gzhId + '/serverPackQrcode', params, (result) => {

          console.log(result);
          that.detailData = result.data.data;

        }, (error_result) => {
          Toast(error_result.data.msg);
        })
      },
    }
  };
</script>


