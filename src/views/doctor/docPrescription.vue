<style lang="scss" scoped>
  .conDocPrescription{
    background-color:#f0f0f6;
    min-height:100vh;
    .listBox{
      ul{
        overflow:hidden;
      }
      li{
        margin:0 auto;
        width:6.1rem;
        padding:0.4rem;
        border-radius:0.15rem;
        background-color:#fff;
        margin-top:0.25rem;
        .titBox{
          color:#333;
        }
        .midBox{
          margin-top:0.4rem;
          display:-webkit-flex;
          display:flex;
          justify-content:space-between;
          i{
            img{
              display:block;
              width:0.34rem;
            }
          }
          .descPres{
            color:#666;
            width:4.74rem;
            word-wrap:break-word;
            span{
              display:block;
              margin-top:0.20rem;
            }
          }
        }
        .bottomBox{
          margin-top:0.2rem;
          display:-webkit-flex;
          display:flex;
          justify-content: space-between;
          img{
            display:block;
            width:0.34rem;
            height: 0.34rem;
            margin-top:0.13rem;
          }
          span{
            width:4.2rem;
            color:#666;
            margin-top:0.13rem;
          }
          .btnCode{
            width:1.30rem;
            height: 0.6rem;
            color:#fff;
            line-height: 0.6rem;
            text-align: center;
            border-radius:0.1rem;
            background-image:-webkit-linear-gradient(-35deg, #59b5bb 0.5rem, #46d2db 1.0rem);
            background-image:linear-gradient(135deg, #59b5bb 0.5rem, #46d2db 1.0rem);
          }
        }
      }
    }
  }
</style>

<template>
  <div class="conDocPrescription">
      <div class="listBox">
        <ul>
          <li v-for="(item,index) in prescripTion">
            <div class="titBox fs32">{{ item.bname }}</div>
            <div class="midBox"  v-for="item in item.medicine">
              <i><img src="../../assets/img/iconPres.png"></i>
              <div class="descPres fs28">
                <p>{{ item.name }}</p>
                <span>{{ item.caseNum }}</span>
              </div>
              <div class="numBox">{{ item.hasNum }}盒</div>
            </div>
            <div class="bottomBox">
              <img src="../../assets/img/iconMoney.png">
              <span>{{ item.price }} 元</span>
              <div class="btnCode fs28" @click="goCode(item.packId)">
                二维码
              </div>
            </div>
          </li>
        </ul>
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
//        prescripTion:[
//          {
//            bname:"乙肝基础服务B（4周）",
//            medicine:[
//              {
//                name:"甘倍轻(恩替卡韦胶囊)",
//                caseNum:"0.5mg×7粒",
//                hasNum:"4盒",
//              }
//            ],
//            price:"176",
//          }
//        ]
        prescripTion:[]
      }
    },
    created(){
      this.getPackList();
    },
    mounted(){
      document.getElementsByTagName('title')[0].innerHTML = '签约服务';
    },
    methods:{
      goCode(presid){
       this.$router.push({path:'docQRCode', query:{'presid':presid}});
      },
      getPackList(){
        var params = {
          authentication: auth,
          user_id:localStorage.getItem(appUserId)
        };
        let that = this;
        netWrokUtils.post('/wechat/' + gzhId + '/packList', params, (result) => {
          var dataArr=result.data.data;
          for(var i=0;i<dataArr.length;i++){
            var drugArr=dataArr[i].drug;
            var json={};
            var medArr=[];
            for(var j=0;j<drugArr.length;j++){
              var json2={};
              json2.name=drugArr[j].drug_name;
              json2.caseNum=drugArr[j].spec;
              json2.hasNum=drugArr[j].drugNum;
              medArr.push(json2);
            }
            json.bname=dataArr[i].pack_name;
            json.price=dataArr[i].price;
            json.packId=dataArr[i].id;
            json.medicine=medArr;
            that.prescripTion.push(json);
          }
        }, (error_result) => {
          Toast(error_result.data.msg);
        })
      }
    }
  };
</script>


