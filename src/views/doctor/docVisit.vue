<style lang="scss" scoped>
  .dovVisitCont{
    padding-top:0.3rem;
    .visitTableBox{
      width: 92%;
      margin: 0 auto;
      background: #fff;
      border-radius: 0.2rem;

    }
    .visitTable{
      width:100%;
      margin-bottom: 0.6rem ;
      th{
        font-weight: bold;
        height:1.1rem;
        line-height: 1.1rem;
      }
      th,td{
        border-right:1px solid #d2d2d2;
        color:#666;
        width:33.33%;
        text-align: center;
      }
      td{
        border-top:1px solid #d2d2d2;
        height:0.9rem;
        line-height: 0.9rem;
       }
      th:nth-last-child(1),td:nth-last-child(1){
        border-right:none;
      }
      .hsaVisit{
        background:url("../../assets/img/docVisitIcon.png") center center  no-repeat;
        -webkit-background-size: 50%;
        background-size: 50%;
      }
    }
    .subBtn{
      width:90%;
      height: 0.9rem;
      color:#fff;
      margin:0 auto;
      line-height: 0.9rem;
      text-align: center;
      border-radius:0.5rem;
      background-image:linear-gradient(-35deg, #46d2db, #59b5bb);
      background-image:-webkit-linear-gradient(-35deg, #59b5bb, #46d2db);
    }
  }
</style>

<template>
  <div class="dovVisitCont">
    <div class="visitTableBox">
      <table class="visitTable">
        <tr>
          <th>日期</th>
          <th>上午</th>
          <th>下午</th>
        </tr>
        <tr v-for="(val,name,index) in visitData">
          <td>{{week[index]}}</td>
          <td :class="{hsaVisit:val[0]==1}" @click="addVisit($event,index,0)"></td>
          <td :class="{hsaVisit:val[1]==2}" @click="addVisit($event,index,1)"></td>
        </tr>

      </table>
    </div>
    <div class="subBtn" @click="visitSub">提交</div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {Toast,MessageBox,Indicator} from 'mint-ui';
  import netWrokUtils from '../../components/NetWrokUtils'

    export default {
      data(){
        return{
          visitData:JSON.parse(this.$route.params.visit),
          visitEditArr:[],
          week:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
          postTiemData:{},
        }
      },
      methods:{
        addVisit(ev,index,n){
          var _this=ev.currentTarget;
          this.postTiemData = this.visitData;

          var weekArr=['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];


          //判断是否有带class
          if(hasClass(_this, 'hsaVisit')){
            _this.className='';
            if(n == 0){
              this.postTiemData[weekArr[index]][0] = 0;
            }else{
              this.postTiemData[weekArr[index]][1] = 0;
            }
          }else{
            _this.className='hsaVisit';
            if(n==0){
              this.postTiemData[weekArr[index]][0] = 1;
            }else{
              this.postTiemData[weekArr[index]][1] = 2;

            }
          }
          function hasClass(obj, cls){
            var obj_class = obj.className,//获取 class 内容.
              obj_class_lst = obj_class.split(/\s+/);
            var x = 0;
            for(x in obj_class_lst) {
              if(obj_class_lst[x] == cls) {
                return true;
              }
            }
            return false;
          }
//          console.log(this.postTiemData);
        },
        visitSub(){
          //console.log(this.postTiemData);
          var params = {
            visit:this.postTiemData,
            user_id:localStorage.getItem(appUserId)
            //user_id:127
          };
          var that = this;

          netWrokUtils.post('/wechat/' + gzhId + '/editVisit', params, (result) => {
            that.docInfo = result.data.data;
            Toast({
              message: '提交成功',
              duration: 1900
            });
            setTimeout(()=>{
              this.$router.push({name:'docMyInfo'});
            },2000)

          }, (error_result) => {
            Toast(error_result.data.msg);
          })
        }
      },
      created() {
        document.documentElement.style.background="#f0f0f6";
        document.getElementsByTagName('title')[0].innerHTML = '出诊时间';
        //console.log(this.visitData)
        this.postTiemData = this.visitData;
        var visitDataJson=this.visitData;

        var weekArr=['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
        var visArr=[];
        var visArr2=[];
        for(var name in visitDataJson){
          visArr.push(visitDataJson[name]);
        }
        for(var i=0;i<visArr.length;i++){
         var json={};
         var arr=[];
          for(var j=0;j<visArr[i].length;j++){
            if(visArr[i][j]!=0){
              arr.push(visArr[i][j]);
            }
          }
          json[weekArr[i]]=arr;
          visArr2.push(json);
        }

        this.visitEditArr=visArr2;
      }

    }

</script>


