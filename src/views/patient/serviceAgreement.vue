<style  lang="scss" scoped>
  .containerIntro{
    width:92%;
    margin:0 auto;
    padding-top:0.3rem;
    color:#333;
    text-align: justify;
    line-height: 0.4rem;
    text-indent:2em;

    img{
      display:block;
      width: 100%;
      margin:0.2rem auto;
    }
  }
</style>
<template>
  <div class="containerIntro fs30">
    <h3 class="fb">服务内容</h3>
    <p>
      <b>本签约服务内容如下所示：</b><br>
      1.提供慢病患者一定数量药品（具体药品种类和数量请见服务说明）<br>
      2.根据患者购买药品种类和数量奖励患者一定数量的积分<br>
      3.服务期限内专属签约医生慢病管理<br>
      4.复诊提醒，平台定时复诊提醒<br>
      5.电子病历，完整终生电子病历<br>


    </p>
    <h3 class="fb">服务使用说明</h3>
    <p>
      1. 取药方式：<br>
      <span>（1）自取：患者到当地合作药店取药，患者购买服务后会告知详细取药信息；</span>
      <span>（2）复诊提醒：治愈肝病联盟将根据线上专家设置的复诊计划定期给您提供详细的复诊信息</span>
    </p>
    <h3 class="fb">特别提示</h3>
    <p>
      1.本服务中药品为正规处方药，根据国家规定需凭处方出售，一经售出概不退换；<br>
      2.本签约服务所收取费用为代收代付，即平台代患者购买签约服务所需药品付给药店的费用；<br>
      3.如有任何问题可联系您的医生助手。
  </p>
  </div>
</template>
<script>
  import axios from 'axios';
  import {Toast,MessageBox,Indicator} from 'mint-ui';
  import netWrokUtils from '../../components/NetWrokUtils'
  export  default {
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
      document.getElementsByTagName('title')[0].innerHTML = '家庭医生签约服务协议';
    },
    methods:{
      toInfo(){
        let that = this;
        this.$router.push({name:'patBuyService', query:{"remarks": that.remarks, "doctor_id":that.doctor_id, "pack_id":that.pack_id}});
      }
    }
  };
</script>
