/**
 * Created by admin on 2017/4/18.
 */
import Vue from 'vue'
import Router from 'vue-router'

// 路由
import router_index from '../views/router_index'
import wuhan_d_rootRouter from '../components/doctorIndex'
import wuhan_p_rootRouter from '../components/patientIndex'


// 具体页面
// 公共页面
import unionIntroduction from '../components/unionIntroduction' //联盟介绍

// 患者端页面
// import patientMenu from '../views/patient/patPatientMenu';

import patientLogin from '../views/patient/patPatientLogin';  //登录页, 检查报告验证码页
import patInfoPerfect from '../views/patient/patInfoPerfect'; //完善信息
import patMyInfo from '../views/patient/patMyInfo' //个人中心完善信息
import patPersonalCenter from '../views/patient/patPersonalCenter' //个人中心
import patAccountBalance from '../views/patient/patAccountBalance' //账户余额
import patServiceTimes from '../views/patient/patServiceTimes' //服务次数
import patBuyService from '../views/patient/patBuyService'//下单页面
import patRemarks from '../views/patient/patRemarks'  // 下单备注
import patPayment from '../views/patient/patPayment'  // 支付
import patOrderDetail from '../views/patient/patOrderDetail' //订单详情
import serviceAgreement from '../views/patient/serviceAgreement'  // 家庭医生签约服务协议



// 医生端页面
import docLogin from '../views/doctor/docLogin'//登录
import docPrescription from '../views/doctor/docPrescription'//开药
import docQRCode from '../views/doctor/docQRCode'  //开药二维码
import docMypatientList from '../views/doctor/docMypatientList'  //我的患者列表
import docPersonalCenter from '../views/doctor/docPersonalCenter' //医生个人中心
import docMyInfo from '../views/doctor/docMyInfo' //医生个人信息
import docBrief from '../views/doctor/docBrief' //医生个人简介
import docAccountBalance from '../views/doctor/docAccountBalance' //医生账户余额
import docMajors from '../views/doctor/docMajors' //医生擅长
import docVisit from '../views/doctor/docVisit' //医生出诊时间
import docWithdraw from '../views/doctor/docWithdraw' //医生提现
import docWithdrawSucc from '../views/doctor/docWithdrawSucc' //医生提现成功

//二维码
//我得患者

///:packOrderId
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: router_index,
    },
    {
      path: '/wuhan_p',
      component: wuhan_p_rootRouter,
      children: [
        {path: 'patientLogin', component: patientLogin, name: 'patientLogin'},
        {path:'patInfoPerfect',component: patInfoPerfect, name:'patInfoPerfect'},
        {path:'patMyInfo',component: patMyInfo, name:'patMyInfo'},
        {path:'patPersonalCenter',component: patPersonalCenter, name:'patPersonalCenter'},
        {path:'patAccountBalance',component: patAccountBalance, name:'patAccountBalance'},
        {path:'patServiceTimes',component: patServiceTimes, name:'patServiceTimes'},
        {path:'unionIntroduction',component: unionIntroduction, name:'unionIntroduction'},
        {path:'patRemarks', component: patRemarks, name: 'patRemarks'},
        {path:'patBuyService', component: patBuyService, name: 'patBuyService'},
        {path:'patPayment', component: patPayment, name: 'patPayment'},
        {path:'patOrderDetail', component: patOrderDetail, name: 'patOrderDetail'},
        {path:'serviceAgreement', component: serviceAgreement, name: 'serviceAgreement'},

      ],
    },
    {
      path: '/wuhan_d',
      component: wuhan_d_rootRouter,
      children: [
        {path: 'docLogin', component: docLogin, name:'docLogin'},
        {path: 'docPrescription', component: docPrescription, name:'docPrescription'},
        {path: 'docQRCode', component: docQRCode, name:'docQRCode'},
        {path: 'docMypatientList', component: docMypatientList, name:'docMypatientList'},
        {path: 'docPersonalCenter', component: docPersonalCenter, name:'docPersonalCenter'},
        {path: 'docBrief/:intro', component: docBrief, name:'docBrief'},
        {path: 'docMyInfo', component: docMyInfo, name:'docMyInfo'},
        {path: 'docAccountBalance', component: docAccountBalance, name:'docAccountBalance'},
        {path: 'docMajors/:majors', component: docMajors, name:'docMajors'},
        {path: 'docVisit/:visit', component: docVisit, name:'docVisit'},
        {path: 'docWithdraw', component: docWithdraw, name:'docWithdraw'},
        {path: 'docWithdrawSucc', component: docWithdrawSucc, name:'docWithdrawSucc'}
      ]
    }

  ]
})

