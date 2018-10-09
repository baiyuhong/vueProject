/**
 * Created by lihao on 2017-4-20.
 */
//封装自定义方法


// 验证公用的function
//  患者-
//   登录，完善信息
//   //验证身份证、验证HIS对应手机码；
//   关注关系
//   签约关系

//  医生-
//   登录，手机号，审核通过
//   签约关系


import axios from 'axios';
import netWrokUtils from './NetWrokUtils'

//将json转换成请求式字符串
function formatPara(info) {
  let str = '';
  for (let i in info) {
    str += i + '=' + info[i] + '&';
  }
  str = str.substr(0, str.length - 1);
  return str;
}

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//创建axios请求对象,规定基本参数
const request =  axios.create({
  baseURL: process.env.API_HOST,
  timeout: 5000,
  header: {"content-type": 'application/x-www-form-urlencoded'},
});

function formatSeconds(value) {

  var theTime = parseInt(value);// 秒
  var theTime1 = 0;// 分
  var theTime2 = 0;// 小时
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  var result = "" + parseInt(theTime) + "秒";
  if (theTime1 > 0) {
    result = "" + parseInt(theTime1) + "分" + result;
  }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2) + "小时" + result;
  }
  return result;
}

// 查询医生auth的状态
function checkAuthStatus(auth, path) {
  let checkArray = [
    '/' + gzhId + '/docCheck',
    '/' + gzhId + '/docLogin',
    '/' + gzhId + '/doctorPerfectInfo'
  ];
  var data = {}, auditStutus = "", hasAuditInfo = "", hasMobile = "", url = "";
  var params = {
    authentication: auth
  };
  netWrokUtils.post('/wechat' + gzhId + '/doctorauditstatus', params, function(success) {
     data = success.data.content;
     auditStutus = success.data.content.auditStutus;     // auditStutus 是否审核 1审核 0未审核 2审核失败
     hasAuditInfo = success.data.content.hasAuditInfo;   // hasAuditInfo 是否完善个人信息 true完善 false未完善
     hasMobile = success.data.content.hasMobile;         // hasMobile 是否已登录 true登录 false未登录
    console.log(hasMobile,hasAuditInfo,auditStutus)

    if (checkArray.indexOf(path) == -1) {
      if (hasMobile && hasAuditInfo && (auditStutus == 1)) {  // 审核中
        alert('审核中页面');
        url = 'docCheck';
      } else if (hasMobile && hasAuditInfo && (auditStutus == 2)) {  // 审核失败
        alert('审核失败页面');
        url = 'docLogin';
      } else if (hasMobile && !hasAuditInfo) {  // 未完善信息
        alert('审核未完善页面');
        url = 'doctorPerfectInfo';
      } else if (!hasMobile) {  // 手机未登录
        alert('手机登录页面');
        url = 'docLogin';
      }
    }
    return url;
  }), function (failure) {


  };

}


//将证件号码加*显示
function formatIdentifyNumber(number){
  let result = '';
  if(number == '' || number == null || number == undefined) return;
  if(number.length == 15){
    result = number.toString().replace(/(\d{2})\d{11}(\d{2})/,"$1***********$2");
  }else if(number.length == 18){
    result = number.toString().replace(/(\d{2})\d{14}(\d{2})/,"$1**************$2");
  } else if(number.length == 11){
    result = number.toString().replace(/(\d{3})\d{4}(\d{4})/,"$1****$2");
  }else{
    let starsNum = number.length - 4, starStr = '';
    for(let i = 0; i< starsNum; i++){
      starStr += "*";
    };
    result = number.substring(0,2) + starStr + number.substring(number.length,number.length-2);
  }
  return result;
}

//关闭窗口
function closeWxWindow(){
  if(typeof(WeixinJSBridge)!="undefined"){
    WeixinJSBridge.call('closeWindow');
  }else{
    if (navigator.userAgent.indexOf("MSIE") > 0) {
      if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
        window.opener = null; window.close();
      }
      else {
        window.open('', '_top'); window.top.close();
      }
    }
    else if (navigator.userAgent.indexOf("Firefox") > 0) {
      window.location.href = 'about:blank ';
      //window.history.go(-2);
    }
    else {
      window.opener = null;
      window.open('', '_self', '');
      window.close();
    }
  }
}
//JS加法函数
function accAdd(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split()[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split()[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2))
  return ((arg1*m+arg2*m)/m).toFixed(2);
}

//JS减法函数
function Subtr(arg1,arg2){
  var r1,r2,m,n;
  try{r1=arg1.toString().split()[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split()[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
//动态控制精度长度
//   n=(r1>=r2)?r1:r2;
  n = 2;
  return ((arg1*m-arg2*m)/m).toFixed(n);
}

//导出自定义函数和对象
export default {
  formatPara,
  request,
  formatSeconds,
  checkAuthStatus,
  formatIdentifyNumber,
  closeWxWindow,
  accAdd,
  Subtr,
}
