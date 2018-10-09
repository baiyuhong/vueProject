<style  lang="scss" scoped>
  .container{
    height:100vh;
    background-color:#f3f5f8;
    overflow:hidden;
  .textBox{
    margin:0 auto;
    margin-top:0.46rem;
    width:6.5rem;
    height:3.32rem;
    padding:0.3rem;
    background-color:#fff;

  textarea{
    border:none;
    resize: none;
    font-size: 0.28rem;
    width:6.2rem;
    line-height: 0.38rem;
    font-family: 'Microsoft YaHei';
    height: 2.56rem;
  }
  div{
    color:#999;
    line-height: 0.66rem;
    text-align: right;
  }
  }
  .toInfo {
    display: block;
    outline: none;
    margin: 0 auto;
    margin-top:0.9rem;
    width: 90%;
    height: 0.9rem;
    background-color:#b2e5e7;
    border:none;
    color: #ffffff;
    border-radius: 0.45rem;
  &.active{
     background-image:-webkit-linear-gradient(0deg, #62b8bd 25%, #69d9d2 75%);
     background-image:linear-gradient(90deg, #62b8bd 25%, #69d9d2 75%);
   }
  }
  }
</style>
<template>
  <div class="container">
    <div class="textBox">
      <textarea placeholder="请输入备注内容（可不填）" v-model="remarks"></textarea>
      <div class="infotext fs28">{{ fontNum }}/150</div>
    </div>
    <button class="toInfo" :class="isActive ? 'active' : ''" @click="toInfo">
      <label class="mint-button-text fs32">提 交</label>
    </button>
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
        remarks: this.$route.query.remarks,
        fontNum:this.$route.query.remarks.length ? this.$route.query.remarks.length : 0,
        isActive:this.$route.query.remarks ? true : false,
        doctor_id: this.$route.query.doctor_id,
        pack_id:this.$route.query.pack_id,
      }
    },
    created(){
      document.getElementsByTagName('title')[0].innerHTML = '擅长';
    },
    watch:{
      'remarks' () {
        this.fontNum = this.remarks.length;
        if(this.fontNum >150){
          this.remarks = this.remarks.substring(0, 150);
        }
        if(this.remarks.length >= 0){
          this.isActive = true;
        }else{
          this.isActive = false;
        }
      }
    },
    methods:{
      toInfo(){
        let that = this;
        this.$router.push({name:'patBuyService', query:{"remarks": that.remarks, "doctor_id":that.doctor_id, "pack_id":that.pack_id}});
      }
    }
  };
</script>
