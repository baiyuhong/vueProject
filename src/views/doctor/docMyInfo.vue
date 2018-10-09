<style lang="scss" scoped>
  .container{
    background-color:#f3f5f8;
    .secondBox{
      margin-top:0.2rem;
    }
    ul{
      li{
        display:-webkit-flex;
        display:flex;
        justify-content:space-between;
        padding:0.38rem 0.3rem;
        border-bottom:1px solid #e1e6ed;
        background-color:#fff;
        .lItem{
          color:#3e3e3e;
          min-width:1.5rem;

        }
        .rItem{
          color:#999;
          line-height: 0.36rem;
        }
        &.hospitalName{
          .rItem{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
         }
      }
    }
    .tipBox{
      color:#999;
      padding:1rem 1rem 0;
      background-color:#fff;
      line-height:0.4rem;
      i{
        color:#cc3333;
      }
    }
  }
</style>

<template>
  <div class="container">
    <div class="topBox">
      <ul>
        <li>
          <div class="lItem fs30">
            姓名
          </div>
          <div class="rItem fs28">
            {{ docInfo.doctor_name }}
          </div>
        </li>
        <li>
          <div class="lItem fs30">
            性别
          </div>
          <div class="rItem fs28">
            {{ docInfo.sex }}
          </div>
        </li>
        <li class="hospitalName">
          <div class="lItem fs30">
            医院
          </div>
          <div class="rItem fs28">
            {{ docInfo.hospitalName }}
          </div>
        </li>
        <li>
          <div class="lItem fs30">
            科室
          </div>
          <div class="rItem fs28">
            {{ docInfo.departmentName }}
          </div>
        </li>
        <li>
          <div class="lItem fs30">
            临床职称
          </div>
          <div class="rItem fs28">
            {{ docInfo.gradeName }}
          </div>
        </li>
        <li>
          <div class="lItem fs30">
            教育职称
          </div>
          <div class="rItem fs28">
            {{ docInfo.educateName }}
          </div>
        </li>
      </ul>
    </div>
    <div class="secondBox">
      <ul>
        <li @click="goDocMajors">
          <div class="lItem fs30">
            擅长
          </div>
          <div class="rItem fs28">
            <!--{{ docInfo.intro ? '' : '未填写' }} <i class="iconfont icon-arrowR"></i>-->
            {{ cutString(docInfo.majors)}} <i class="iconfont icon-arrowR"></i>
          </div>
        </li>

        <li @click="goDocIntro">
          <div class="lItem fs30">
            简介
          </div>
          <div class="rItem fs28">
            {{ cutString(docInfo.intro)}} <i class="iconfont icon-arrowR"></i>
          </div>
        </li>

        <li @click="goVisit">
          <div class="lItem fs30">
            出诊时间
          </div>
          <div class="rItem fs28">
             <i class="iconfont icon-arrowR"></i>
          </div>
        </li>

      </ul>
    </div>
    <div class="tipBox fs24 text-center">
      <i>注：</i>部分信息不可更改，<br> 若需修改请联系您的医生助手
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {Toast,MessageBox} from 'mint-ui';
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
        docInfo:''
      }
    },
    created(){
      document.getElementsByTagName('title')[0].innerHTML = '个人信息';
      this.getPatientList();
    },
    methods:{
      getPatientList(){
        var params = {
          authentication: auth,
          user_id:localStorage.getItem(appUserId)
          //user_id:127  //测试
        }
        var that = this;
        netWrokUtils.post('/wechat/' + gzhId + '/getMyInfo', params, (result) => {
          that.docInfo = result.data.data;

         //console.log(that.docInfo.majors.length);

        }, (error_result) => {
          Toast(error_result.data.msg);
        })
      },
      goDocIntro(){
        let that = this;
        this.$router.push({name:'docBrief', params:{ 'intro': that.docInfo.intro}});
      },
      goDocMajors(){
        let that = this;
        this.$router.push({name:'docMajors', params:{ 'majors': that.docInfo.majors}});
      },
      goVisit(){
        let that = this;
        let visitStr=JSON.stringify(that.docInfo.visit);
        console.log(visitStr);
        this.$router.push({name:'docVisit', params:{ 'visit': visitStr}});
      },
      cutString(val){

        if(val==''){
          val='未填写'
          return val;

        }else{
          if(val){
            if(val.length>10){
              return val.substring(0,10)+'...';
            }else{
              return val;
            }
          }

        }
      }
    }
  }
</script>


