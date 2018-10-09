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
          color:#0f9ba3;

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
  <div>
    <div class="container" v-if="!userIdCard">
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
              <div @click="chooseBank"  style="width: 60%">
                <span :class="{'col-ccc': !ichooseBank}">{{isBankName}}</span>
              </div>

            </li>
            <li>
              <span>开户人姓名：</span>
              <span>{{bankUserName}}</span>
            </li>
            <li>
              <span>银行卡号：</span>
              <input type="tel" placeholder="请输入您的银行卡号" v-model="bankCardNum" maxlength="19" />
            </li>
            <li>
              <span>身份证号：</span>
              <input type="url" placeholder="请输入您的身份证号" v-model="idCardNum" maxlength="18" />
            </li>
          </ul>
        </div>
        <div class="subBtn btnnot_on"  @click="toSub">提交</div>
      </div>
      <div class="maskCert" v-show="toMask" @touchmove="clearDefault"></div>
      <!--选择银行弹窗-->
      <div class="pickerBox pickerDate" v-show="toChooseBank" @touchmove="clearDefault">
        <div class="pickerTit text-center">选择银行</div>
        <mt-picker :slots="bankSlot" value-key="bank_name" @change="onBankValuesChange" :visible-item-count="5"></mt-picker>
        <div class="chooseBtnBox">
          <div class="cancleBth" @click="cancleBank">取消</div>
          <div class="enterBtn" @click="enterBank">确定</div>
        </div>
      </div>
    </div>

    <div class="container" v-if="userIdCard">
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
              <span>{{userBankName}}</span>
            </li>
            <li>
              <span>开户人姓名：</span>
              <span>{{bankUserName}}</span>
            </li>
            <li>
              <span>银行卡号：</span>
              <span>{{userBankCard}}</span>
            </li>
            <li>
              <span>身份证号：</span>
              <span>{{userIdCard}}</span>
            </li>
          </ul>
        </div>
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
        bankSlot: [
          {
            flex: 1,
            values: [],
            valueKey:"bank_code",
            defaultIndex: 0,
            className: 'slot1',
            textAlign: 'center',
            showToolbar:false,
            name:"请选择银行"
          }
        ],
        bankCardNum:'',
        idCardNum:'',
        idCardFlag:false,
        toMask:0, //遮罩
        toChooseBank: 0, //是否显示银行选择器
        choosedBank:0,  //选中银行
        ichooseBank:false,
        isCanSave:false,
        bankCode:'',
        bankName:'',
        isBankName:'请选择',
        bankUserName:'',
        userIdCard:'',
        userBankName:'',
        userBankCard:''
      }
    },
    beforeMount(){
      this.requstBank();
    },
    created(){
      document.getElementsByTagName('title')[0].innerHTML = '提现';

    },

    watch:{
      'bankCardNum'() {
        this.bankCardNum= this.bankCardNum.replace(/\D/g,'');
        if (this.bankCardNum.length >15 && this.ichooseBank && this.idCardFlag) {
          this.isCanSave=true;
        }else{
          this.isCanSave=false;
        }
      },
      'idCardNum'(){
        this.idCardNum= this.idCardNum.replace(/[^x\d]/g,'');
        var idCardReg=/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
        if(idCardReg.test(this.idCardNum)){
          this.idCardFlag=true;
        }else{
          this.idCardFlag=false;
        }
        if (this.bankCardNum.length >15 && this.ichooseBank && this.idCardFlag) {
          this.isCanSave=true;
        }else{
          this.isCanSave=false;
        }
      }
    },
    methods:{
      showerTost(msg){
        Toast({
          message: msg,
          duration: 1000
        });


      },
      onBankValuesChange(picker, values) {

        if(values[0]!=undefined){
          this.bankName = values[0].bank_name;
          this.bankCode = values[0].bank_code;

        }

      },
      chooseBank(event){
        this.toMask = 1;
        this.toChooseBank = 1;
      },
      cancleBank(){
        this.toMask = 0;
        this.toChooseBank=0;
      },
      enterBank(){
        this.toMask = 0;
        this.toChooseBank=0;
        this.isBankName=this.bankName;
        this.ichooseBank=true;
        if (this.bankCardNum.length >15 && this.ichooseBank && this.idCardFlag) {
          this.isCanSave=true;
        }else{
          this.isCanSave=false;
        }
      },
      //获取银行列表
      requstBank(){
        var params = {
          authentication: auth,
          user_id:localStorage.getItem(appUserId)
        }
        netWrokUtils.post('/wechat/' + gzhId + '/bankList', params, (result) => {
          //console.log(result);
          this.bankSlot[0].values=result.data.data.bankList;
          this.bankUserName=result.data.data.bank_username;
          this.userIdCard=result.data.data.id_card;
          this.userBankName=result.data.data.bank_name;
          this.userBankCard=result.data.data.bank_card;

        }, (error_result) => {
          Toast(error_result.data.msg);
        })
      },
      clearDefault(event){
        event.preventDefault();
        return false;
      },
      //提交信息
      toSub(){
        if(!this.ichooseBank){
          this.showerTost('请选择银行');
          return false;
        }else if(this.bankCardNum.length == 0){
          this.showerTost('请输入银行卡号');
          return false;
        }else if(this.bankCardNum.length <=15){
          this.showerTost('银行卡号格式不正确');
          return false;
        }else if(this.idCardNum==''){
          this.showerTost('请输入身份证号');
          return false;
        }else if(!this.idCardFlag){
          this.showerTost('身份证号格式不正确');
          return false;
        }

        if(this.isCanSave){
          var params = {
            authentication: auth,
            user_id:localStorage.getItem(appUserId),
            bank_name:this.isBankName,
            bank_code: this.bankCode,
            bank_username:this.bankUserName,
            bank_card:this.bankCardNum,
            id_card:this.idCardNum
          }
          netWrokUtils.post('/wechat/' + gzhId + '/addBankCard', params, (result) => {
            Toast(result.data.msg);
            setTimeout(() => {
                this.$router.push({name:'docWithdrawSucc'});
            }, 1500);
            //console.log(result);
          }, (error_result) => {
            Toast(error_result.data.msg);
          })


        }
      }
    }
  }
</script>


