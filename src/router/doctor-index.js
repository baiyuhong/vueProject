/**
 * Created by zheha on 2017/4/12.
 */
import Vue from 'vue'
import Router from 'vue-router'
import doctorMain from '../views/doctor/doctorMain'
import docLogin from '../views/doctor/docLogin'
import docMoney from '../views/doctor/docMoney'
import myPatient from '../views/doctor/docPatient'
import docConsult from '../views/doctor/docConsult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'docLogin',
      component: docLogin
    },
    {
      path: '/doctor',
      name: 'doctorMain',
      component: doctorMain
    },
    {
      path: '/docMoney',
      name: 'docMoney',
      component: docMoney
    },
    {
      path: '/myPatient',
      name: 'myPatient',
      component: myPatient
    },

    {
      path: '/docConsult',
      name: 'docConsult',
      component: docConsult
    }

  ]
})
