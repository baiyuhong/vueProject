<style lang="scss" scoped>
  .infoBox{
    hieght:100%;
    padding-bottom:0.2rem;
  }

  .infoHead{
    padding:0.96rem;
    img{
      display: block;
      width: 2rem;
      height: 2rem;
      margin: 0 auto;
    }
    p{
      color:#b8b7b7;
      padding:0.18rem 0;
      font-size:0.26rem;
      line-height: 0.36rem;
    }
  }
  .infoInputBox{
    width:80%;
    margin:0 auto;
    color:#3e3e3e;
    .iconCir{
      display:block;
      width:0.16rem;
      height:0.16rem;
      border-radius:50%;
      overflow:hidden;
      margin-top:0.55rem;
    }
    .itemInput{
      display: -webkit-flex; /* Safari */
      display:flex;
      justify-content:space-between;
      .iconCir{
        background-color: #5ab5ba;
      }
      .itemB{
        width:93%;
        display: -webkit-flex; /* Safari */
        display:flex;
        justify-content:space-between;
        border-bottom:1px solid #e5e5e5;
        line-height: 1.32rem;
        font-size:0.3rem;
        color:#3e3e3e;
        textarea{
          width:80%;
          padding: 0.1rem 0.05rem;
          text-align: right;
          outline: none;
          border:none;
          resize: none;
          height:0.5rem;
          margin-top:0.3rem;
          background: #fff;

        }
        textarea::-webkit-input-placeholder{
          font-size:0.3rem;
          color:#ccc;
          text-align: right;
        }
      }
      &.sex{
        .iconCir{
          background-color: #bdc801;
        }
      }
      &.age{
        .iconCir{
          background-color: #c663ad;
        }
        .chooseDate{
          color:#ccc;
        }
      }
      &.disease{
        .choosedisease{
          width:3.88rem;
          height:1.27rem;
          color:#ccc;
          overflow:hidden;
          text-align: right;
          textarea{
            margin-top:0.15rem;
            vertical-align: middle;
          }
          .choosedDName{
            width:3.4rem;
            height:0.4rem;
            line-height: 0.4rem;
            display:inline-block;
            overflow:hidden;
            vertical-align: middle;
          }
        }
      }

    }
  }
  .iconChooseJj{
    font-family: "SimSun";
    font-size:0.18rem;
    margin-left:0.1rem;
    font-weight:bold;
  }
  .saveInfobtn{
    display: block;
    outline: none;
    margin: 0 auto;
    margin-top:0.9rem;
    width: 90%;
    height: 0.9rem;
    background: #c5eef0;
    border:none;
    color: #fff;
    border-radius: 0.45rem;
  }

  .switchBox{
    width:1.68rem;
    height: 0.46rem;
    display:flex;
    isplay:-webkit-flex;
    justify-content:space-between;
    border:1px solid #5ab5ba;
    border-radius:0.07rem;
    margin-top:0.4rem;
    div{
      width:50%;
      height:100%;
      color:#ccc;
      line-height:0.46rem;
      text-align:center;

      &.active{
        background-color: #5ab5ba;
        color:#fff;
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
  .btnnot_on{
    background-color: #5ab5ba;
  }
  .picker-item.picker-selected{
    color:#59b4b9 !important;
  }
</style>

<template>
  <div class="infoBox">
    <div class="infoHead">
      <img src="../../assets/img/loginhead.png" alt="">
      <p class="text-center">为了给您提供更精准的、更优质的服务<br>
        请完善您的个人信息</p>
    </div>
    <div class="infoInputBox">
      <div class="itemInput">
        <i class="iconCir"></i>
        <div class="itemB">
          <span>姓名</span>
          <textarea type="text" class="fs30" name="name" v-model="name" placeholder="请输入真实姓名"></textarea>
        </div>
      </div>
      <div class="itemInput sex">
        <i class="iconCir"></i>
        <div class="itemB">
          <span>性别</span>
          <div class="switchBox" @click="changeSex">
            <div class="man" :class="{'active': choosedSec == 2}" >男</div>
            <div class="woman" :class="{'active': choosedSec == 1}">女</div>
          </div>
        </div>
      </div>
      <div class="itemInput age">
        <i class="iconCir"></i>
        <div class="itemB">
          <span>出生年份</span>
          <div class="chooseDate">
            <span class="textFont" @click="chooseDate">{{ choosedDate ? choosedDate : '请选择出生年份' }}</span>
            <i class="iconfont icon-arrowR"> </i>
          </div>
        </div>
      </div>
      <div class="itemInput disease">
        <i class="iconCir"></i>
        <div class="itemB">
          <span>所患疾病</span>
          <div class="choosedisease">
            <div @click="ChooseDisease" class="fs30 choosedDName"  v-model="choosedDiseaseName">{{ choosedDiseaseName ? choosedDiseaseName : '请选择疾病' }}</div>
            <i class="iconfont icon-arrowR"> </i>
          </div>
        </div>
      </div>
    </div>
    <button class="btn saveInfobtn fs18" :class="{'btnnot_on': isCanSave}" @click="submitInfo">
      <label class="mint-button-text fs30">确 认</label>
    </button>
    <div class="maskCert" v-show="toMask" @touchmove="clearDefault"></div>
    <!--选择日期弹窗-->
    <div class="pickerBox pickerDate" v-show="toChooseDate" @touchmove="clearDefault">
      <div class="pickerTit text-center">请选择出生年份</div>
      <mt-picker :slots="slots" @change="onDateValuesChange" :visible-item-count="5"></mt-picker>
      <div class="chooseBtnBox">
        <div class="cancleBth" @click="cancleDate">取消</div>
        <div class="enterBtn" @click="enterDate">确定</div>
      </div>
    </div>
    <!--选择疾病弹窗-->
    <div class="pickerBox pickerDisease" v-show="toChooseDisease" @touchmove="clearDefault">
      <div class="pickerTit text-center">请选择疾病</div>
      <mt-picker :slots="diseaseData" value-key="name" @change="onDiseaseValueChange"></mt-picker>
      <div class="chooseBtnBox">
        <div class="cancleBth" @click="cancleDisease">取消</div>
        <div class="enterBtn" @click="enterDisease">确定</div>
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
        next({name: 'patientLogin', query: {'from': to.path}}) //跳转登陆页面
      }

      netWrokUtils.post('/wechat/' + gzhId + '/patientStatus', params, (result) => {
        //status  1、未完善信息；2、已完善信息；3、账号在其他设备登录，请重新登录； 4、未登录
        var status = result.data.data.status;
        if(status == 3 || status == 4){
          next({name: 'patientLogin', query: {'from': to.path}}) //去登陆页面
        }else if(status == 1){
          next(true);

        }else{
          wx.closeWindow(); //已完善
        }
      }, (error_result) => {
        Toast(error_result.data.msg);
      })

    },
    data(){
      return {
        slots: [
          {
            flex: 1,
            values: [],
            defaultIndex: 70,
            className: 'slot1',
            textAlign: 'center',
            showToolbar:false,
            name:"请选择出生年份",
            divider: false,
          }
        ],
        diseaseData:[
          {
            flex: 1,
            values: [{"id":1, "name":"aaa"}],
            valueKey:"id",
            defaultIndex: 0,
            className: 'slot2',
            textAlign: 'center',
            showToolbar:false,
            name:"请选择疾病"
          }
        ],
        name:'', //姓名
        choosedSec:1,//选中性别
         toMask:0, //遮罩
        toChooseDate: 0, //是否显示时间选择器
        choosedDate:0,  //选中日期
        ichooseDate:0,
        toChooseDisease:0,
        choosedDiseaseName:'', //最终要提交的疾病
        iChoosedDiseaseName:0,  //
        choosedDiseaseId:0,
        iChoosedDiseaseId:0,
        isCanSave:false,

      };
    },
    beforeMount(){
      //出生日期计算
      var dataArr = new Array();
      for(var i = 1910; i<= 2018; i++){
        dataArr.push(i);
      }
      this.slots[0].values = dataArr
      this.requstDisease();
    },
    mounted(){

      //设置bodybg
      document.getElementsByTagName("body")[0].style.background = "#fff";
    },
    created(){
      document.getElementsByTagName('title')[0].innerHTML = '完善信息';

    },
    watch:{
      "name"(){
        if(this.name!='' && this.choosedDiseaseName !='' && this.choosedDate != ''){
            this.isCanSave = true;
        }else{
          this.isCanSave = false;
        }
      },
      "choosedDiseaseName"(){
        if(this.name!='' && this.choosedDiseaseName !='' && this.choosedDate != ''){
          this.isCanSave = true;
        }else{
          this.isCanSave = false;
        }
      },
      "choosedDate"(){
        if(this.name!='' && this.choosedDiseaseName !='' && this.choosedDate != ''){
          this.isCanSave = true;
        }else{
          this.isCanSave = false;
        }
      }
    },
    methods:{
      onDateValuesChange(picker, values) {
       this.ichooseDate = values[0];
      },
      onDiseaseValueChange(picker, values){
        this.ichoosedDiseaseName = values[0].name;
        this.ichoosedDiseaseId = values[0].id;
      },
      changeSex(){
        if(this.choosedSec == 1){
          this.choosedSec = 2;
        }else{
          this.choosedSec = 1;
        }
      },
      chooseDate(event){
        this.toMask = 1;
        this.toChooseDate = 1;
      },
      //取消选择年份
      cancleDate(){

        this.toMask = 0;
        this.toChooseDate = 0;
      },
      enterDate(){
        this.choosedDate = this.ichooseDate;
        this.toMask = 0;
        this.toChooseDate = 0;
      },
      ChooseDisease(){
        this.toMask = 1;
        this.toChooseDisease = 1;
      },
      cancleDisease(){
        this.toMask = 0;
        this.toChooseDisease = 0;
      },
      enterDisease(){
        this.choosedDiseaseName = this.ichoosedDiseaseName;
        this.choosedDiseaseId = this.ichoosedDiseaseId;
        this.toMask = 0;
        this.toChooseDisease = 0;
      },
      requstDisease(){
        netWrokUtils.post('/wechat/' + gzhId + '/diseaseList', '', (result) => {
          this.diseaseData[0].values = result.data.data;
          console.log(result);
        }, (error_result) => {
          Toast(error_result.data.msg);
        })
      },
      clearDefault(event){
        event.preventDefault();
        return false;

      },
      submitInfo() {
        if(!this.isCanSave){
          return false;
        }
        var requestJson = {
          real_name: this.name,
          sex: this.choosedSec,
          birthday: this.choosedDate,
          disease_name: this.choosedDiseaseName,
          disease_id: this.choosedDiseaseId,
          authentication:auth,
          user_id:localStorage.getItem(appUserId)
        }

        if (requestJson.real_name == '' || requestJson.real_name == undefined ||  !/^[\u4E00-\u9FA5.]{1,15}$/.test(requestJson.real_name)) {
          Toast('请输入正确姓名');
          return false;
        } else if (!requestJson.birthday) {
          Toast('请选择出生年份');
          return false;
        } else if (!requestJson.disease_name || requestJson.disease_name == '请选择疾病') {
          Toast('请选择疾病类型');
          return false;
        }
      console.log(requestJson);
        netWrokUtils.post('/wechat/' + gzhId + '/perfectInfo', requestJson, (result) => {

          //如果联盟简介跳过来
          Toast({
            message:'提交成功！',
            position:'bottom',
            duration:1400
          });
          setTimeout(() => {
//            var from = this.$route.query.from;
//            if (from)
//              this.$router.push(from)
//            else {
              wx.closeWindow();
//            }
          }, 1400);



        }, (error_result) => {
          Toast(error.data.msg);
        })
      }

    }
  };

</script>


