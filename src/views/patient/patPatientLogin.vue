<!-- 登录页, 检查报告验证码页-->
<style lang="scss" scoped>
  .htmlOrbodybg{
    background-color:#f4f4f4;
  }
  #loginBox{
    height: 100vh;
    background-color:#f4f4f4;
  }
  .loginHead{
    padding:0.96rem;
    img{
      display: block;
      width: 2rem;
      height: 2rem;
      margin: 0 auto;
    }
    p{
      color:#666;
      padding:18px 0;
    }
  }
  .inputBox{
    width: 86%;
    background:#fff ;
    margin:0 auto;
    border-radius: 0.08rem;
    overflow:hidden;
    .inputItem{
      background-color: #fff;
      padding:0.28rem 0.4rem;

      input{
        width:100%;
        outline: none;
        border: none;
        font-size: 16px;
        color: #999;
        -webkit-appearance: none;
        background-color: #fff;
        height:0.5rem;
        line-height: 0.5rem;


      }
      &.docPhone{
        border-bottom:1px solid #d2d2d2;
         position:relative;
        .phoneClose{
          color:#ccc;
          position: absolute;
          right:0.2rem;
          top:0.3rem;

        }
       }
    }
    input::-webkit-input-placeholder {
      color: #999;
      font-size: 16px;
    }
    .docCode{
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      .docCodeFont{
        width:60%;
      }
      .getCode {
        width:35%;
        font-size: 0.28rem;
        color: #ccc;
        border: none;
        background-color: transparent;
        outline: none;
        &.active{
           color: #5ab5ba;
         }
      }
    }
  }
  .toInfo {
    display: block;
    outline: none;
    margin: 0 auto;
    margin-top:0.9rem;
    width: 90%;
    height: 0.9rem;
    background: #5ab5ba;
    border:none;
    color: #ffffff;
    border-radius: 0.45rem;
  }

  .infoLogin{
    color:#999;
    line-height: 0.36rem;
    margin-top:0.35rem;
    width:90%;
    color:#666;
    .checkBox{
      display:inline-block;
      margin-top:-2px;
      vertical-align: middle;
      zoom: 130%;


    }
    i{
      color:#5ab5ba;
    }
  }
  .btnnot_on{
    background-color: #c5eef0;
  }
  .layerbox{
    position: absolute;
    top:0;
    left: 0;
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.6);
    .con_comfirm{
      position: absolute;
      top:50%;
      left:50%;
      width:80%;
      height: 80vh;
      background-color: #fff;
      border-radius:0.1rem;
      overflow:hidden;
      margin-top:-40vh;
      margin-left:-40%;
      .tit{
        height: 1.26rem;
        line-height: 1.26rem;
      }
      .con{
        overflow-y:scroll;
        height:56vh;
        color:#333;
        line-height: 0.44rem;
        padding:0 0.3rem;
      }
      .btnBox{
        position: absolute;
        bottom: 0;
        left: 0;
        background:#59b5bb;
        color:#fff;
        height: 0.92rem;
        line-height: 0.92rem;
        width: 100%;
      }
    }
  }
</style>

<template>
  <div id="loginBox">
    <div class="loginHead">
      <img src="../../assets/img/loginhead.png" alt="">
      <p class="text-center">肝病治疗联盟</p>
    </div>
    <div class="inputBox">
      <div class="docPhone inputItem">
        <input pattern="[0-9*]"  type="tel" maxlength="11" v-model="requestJson.phone" placeholder="请输入您的手机号码"/>
        <i class="phoneClose iconfont icon-closecircled fr" v-show="isShowClearPhone" @click="clearPhone"></i>
      </div>
      <div class="codeBox inputItem">
        <div class="docCode ">
          <div class="fontBox docCodeFont">
            <input pattern="[0-9*]" type="tel" maxlength="4" class="codeInput" placeholder="请输入验证码" v-model="requestJson.code"/>
          </div>
          <button id="getCode" class="getCode" :class="{'active': isCode}" @click="getMsgCode($event)">{{getCode}}</button>
        </div>
      </div>
    </div>
    <button class="toInfo" :class="{'btnnot_on': loginIsOn}" @click="toLogin">
      <label class="mint-button-text fs32">登 录</label>
    </button>
    <div class="infoLogin">
      <p class=" fs30 text-center">
        <label @click="agreeRead">
          <input class="checkBox" type="checkbox" id="agreeRead">
          已阅读并同意 <i @click="patArgeeBook">《用户注册协议》</i>
        </label>
      </p>
    </div>

    <div class="layerbox" v-show="islayershow">
      <div class="con_comfirm">
        <div class="tit text-center fb">用户注册协议</div>
        <div class="con fs28">
          <p>“爱肝一生健康管理中心”（以下简称“中心”）是一个专门服务于慢性肝病患者的公益项目，由中国肝炎防治基金会与全国各地医院联合共建。</p>
          <p>为促使您有效的控制病情发展、预防及治疗疾病，中心将根据医生对您的综合诊疗结果，为您配备专业的个案管理师并制定适合您的个案管理方案，以便免费为您提供一系列慢性肝病预防、保健、诊疗支持方面的公益服务。</p>
          <p>此服务需要您签字申请，且您的申请被审核通过后方可加入“爱肝一生健康管理中心”并开始享受免费的个案管理服务，包括专业个案管理师提供的健康咨询指导、复诊复查提醒、长期健康随访关怀、健康教育讲座及活动、中心开展的特色诊疗互动等多种形式服务。包括专业个案管理师提供的健康咨询指导、复诊复查提醒、长期健康随访关怀、健康教育讲座及活动、中心开展的特色诊疗互动等多种形式服务。</p>
        </div>
        <div class="btnBox fs32 fb text-center" @click="readAticle">
          已阅读并同意
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {MessageBox,Toast, Indicator} from 'mint-ui';
  import netWrokUtils from '../../components/NetWrokUtils'
  var timer = null;
  export default {
    beforeRouteEnter(to, from, next){
      var parser = new UAParser();


      var userid = localStorage.getItem(appUserId);
      var params = {
        authentication: auth,
        user_id: userid ? userid :''
      };

      function getParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
      }
      netWrokUtils.post('/wechat/' + gzhId + '/patientStatus', params, (result) => {
        //status  1、未完善信息；2、已完善信息；3、账号在其他设备登录，请重新登录； 4、未登录
        var status = result.data.data.status;
        if(status == 3 || status == 4){
          if(status == 4){
            //如果初始链接跳转进来
            if(getParameterByName("is_login")){
              next(true);
            }else{
              localStorage.setItem(appUserId, "");
              localStorage.setItem(authKey, "");
              next({name: 'patientLogin'})
            }
          }
          next(true);

        }else if(status == 1){
          next({name: 'patInfoPerfect', query: {'from': to.path}}) //去完善信息页
        }else{
          Toast('已登录成功！');
          //部分andriod机无法关闭窗口
          var parser = new UAParser();
          let message = parser.getResult();
          if(message.os.name == "Android"){
            setTimeout(()=>{
              wx.closeWindow();
            }, 1500);
          }else{
            wx.closeWindow();
          }
        }
      }, (error_result) => {
        Toast(error_result.data.msg);
      })
//      next(true); //测试
    },
    data() {
      return {
        getCode: "获取验证码",
        time: 60,
        isCode: false,
        active: false,
        code: '',
        authentication: auth,
        flag_testReportIdentityCard: false,
        requestJson: {
          phone: '',
          code: '',
          tempPhone: ''
        },
        isShowClose: false,
        isShowClearPhone: false,
        phonetype:'',
        loginIsOn:true,
        isShowClearPhone:false, //清空手机号
        islayershow:false, //是否显示用户协议
        agreeLetter:'',  //是否同意知情同意书
      }
    },
    created() {
      //设置bodybg
      document.getElementsByTagName("body")[0].style.background = "#f4f4f4";
      var parser = new UAParser();
      this.phonetype = parser.getResult().os.name;
//       console.log(parser.getResult());
    },
    mounted(){
      document.getElementsByTagName('title')[0].innerHTML = '用户登录';
      var that = this;
      setTimeout(function(){
        that.islayershow = true;
      }, 700);
    },
    watch: {
      'requestJson.phone'(){
        if (!(/^1[34578]\d{9}$/.test(this.requestJson.phone))) {
          this.isCode = false;
          this.isShowClearPhone = true;
          this.loginIsOn = true;
        }else{
          if(this.requestJson.code.length == 4){
            this.loginIsOn = false;
          }else{
            this.loginIsOn = true;
          }
          this.isShowClearPhone = true;
          this.time = 60;
          this.isCode = true;
          clearInterval(timer);       //停止计时器
          document.getElementById("getCode").innerHTML = '获取验证码';
        }
        if(!this.requestJson.phone){
          this.isShowClearPhone = false;
        }
      },
      'requestJson.code'() {
        if (this.requestJson.code.length == 4 && this.requestJson.phone){
          this.loginIsOn = false;
        } else {
          this.loginIsOn = true;
        }
      },
    },
    methods: {
      getMsgCode(el) {
        if(!this.isCode){
          return false;
        }
        if (!(/^1[34578]\d{9}$/.test(this.requestJson.phone))) {
          Toast('请输入正确手机号！');
          return false
        } else {

          let _that = this;
          if (this.time >= 0 && !this.isCode) {

            return false
          } else {

            var params = {
              mobile: this.requestJson.phone
            }

            // 获取验证码
            netWrokUtils.post('/wechat/'+ gzhId +'/sendCode', params, (result) => {
//              this.requestJson.code = result.data.data.code;
              //请求成功

              this.isCode = false;
              //停止计时器
              clearInterval(timer);
              timer = setInterval(function () {
                if (_that.time >= 0) {
                  el.target.innerHTML = _that.time + '（s）'
                  _that.time--;

                }
                if (_that.time === -1) {
                  _that.time = 60;
                  _that.isCode = true;
                  clearInterval(timer);       //停止计时器
                  el.target.innerHTML = '获取验证码'
                }
              }, 1000)

              Indicator.close();
            }, (error_result) => {


              Indicator.close();
              console.log(error_result);
              Toast(error_result.data.msg);
            })
          }
        }
      },
      clearPhone(){
        this.requestJson.phone = ''
      },
      toLogin(){
        if(this.loginIsOn){
          return false;
        }else{
          this.loginIsOn = false;
        }


        let _this = this;
        if (_this.requestJson.phone == '' || _this.requestJson.phone.length != 11) {
          Toast('请输入手机号码！');
          return false
        } else if (!this.checkPhone(_this.requestJson.phone)) {
          Toast('请输入正确手机号码！');
          return false
        }
        if (_this.requestJson.code == '' || _this.requestJson.code.length != 4) {
          Toast('请输入正确验证码！');
          return false
        }
        Indicator.open('登录中');

        var params = {
          authentication: auth,
          mobile: _this.requestJson.phone,
          type: _this.phonetype,
          code:_this.requestJson.code
        }

        netWrokUtils.post('/wechat/' + gzhId + '/login', params, (result) => {

          //在其他设备登陆
          if(result.data.code == 100004){
            MessageBox.confirm('您的帐号已在其它设备登录，您是否要在本设备登录您的账号？').then(action => {
              netWrokUtils.post('/wechat/' + gzhId + '/replaceDevice', params, (result) => {
                Indicator.open('登录成功');
                localStorage.setItem(appUserId, result.data.data.user_id);
                //status  状态 1：未完善信息
                if(result.data.data.status == 1){
                  this.$router.push({name: 'patInfoPerfect'})
                }else{
                  wx.closeWindow();
                }
              }, (error_result) => {
                Toast(error_result.data.msg);
              })
            },action => {
              wx.closeWindow();
            });
            return false;

//            正常登陆
          }else{
            Indicator.open({text:'登录成功',spinnerType:'snake'});
            localStorage.setItem(appUserId, result.data.data.user_id);
            //status  状态 1：未完善信息
            if(result.data.data.status == 1){
              Indicator.close();
              this.$router.push({name: 'patInfoPerfect'})
            }else{
              Indicator.close();
              wx.closeWindow();
            }

          }
          this.loginIsOn = false;
        }, (error_result) => {
          this.loginIsOn = false;
          Indicator.close();
          Toast(error_result.data.msg);
        })
      },
      checkPhone(phone) {
        if (!(/^1[34578]\d{9}$/.test(phone))) {
          return false;
        } else {
          return true;
        }
      },
      goUserSignDeal(){
        this.$router.push({name: 'userSignDeal'})
      },
      readAticle(){
        this.islayershow = false;
        document.getElementById("agreeRead").checked = true;
      },
//      agreeLetter(){
//        if(document.getElementById("agreeRead").checked){
//          this.agreeLetter = true;
//          document.getElementById("agreeRead").checked = false;
//        }else{
//          this.agreeLetter = false;
//          document.getElementById("agreeRead").checked = true;
//        }
//      },
      agreeRead(){
        event.preventDefault();
        return false;
      },
      patArgeeBook(){
        this.islayershow = true;

      }
    }
  }

</script>

