// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import rootRouter from './router/router-index'

//引入插件与第三方库
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import util from './components/util'

//实例化方法
Vue.config.productionTip = false;
Vue.use(MintUI);

Vue.prototype.util = util;

function getGzhId() {
  let r = /\/([\w_]+)\//
  var t = location.href.match(r);
  return t ? t[1] : '';
}


var gzhId = getGzhId();
global.gzhId = gzhId;

rootRouter.beforeEach(function (to, from, next) {

  if (!gzhId) {
    // MintUI.Toast('url地址不正确，请检查是否在公众号内');
    next(false);
  }
  var str = location.href;
  if(str.indexOf("wuhan_p/unionIntroduction") > -1){
    next(true);
  }else {

    var authKey = 'auth_35' + gzhId;
    var appUserId = authKey + 'user_id';
    global.appUserId = appUserId;
    global.authKey = authKey;

    var auth = getParameterByName('authentication');
    // 测试环境auth
    // var auth = '6edba748b24d32e757d1df69b9465c11'; //baiyuhong auth
    //var auth = 'fabd4cf5553db3450cb4032b23bdb9c9';
    if (!auth) {
      auth = localStorage.getItem(authKey);
      if (!auth) {
        window.location.href = process.env.API_HOST + '/wechat/' + gzhId + '/authorization'; // 正式
        return;
      }
    } else {
      localStorage.setItem(authKey, auth);
    }

    global.auth = auth;
    next(true);
  }
});

// 跳转不同的授权url
function toLine(gzhId) {
  window.location.href = process.env.API_HOST + '/wx/' + gzhId + '/login'; // 正式
}

// 从localStorage中获取不同平台的auth
function getAuthFromLS(path) {
  if (path.indexOf('' + gzhId + '') != -1) {
    return localStorage.getItem('' + gzhId + '_auth');
  } else if (path.indexOf('' + gzhId + '') != -1) {
    return localStorage.getItem('' + gzhId + '_auth');
  }
}

// 不同平台设置不同的auth值
function setAuthForLS(path, auth) {
  if (path.indexOf('' + gzhId + '') != -1) {
    localStorage.setItem('' + gzhId + '_auth', auth);
  } else if (path.indexOf('' + gzhId + '') != -1) {
    localStorage.setItem('' + gzhId + '_auth', auth);
  }
}

function getParameterByName(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getParameterByIndexOf() {
  var url = location.search; //获取url中"?"符后的字串
  // var theRequest = new Object();
  console.log('url===' + url);
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    // for (var i = 0; i < strs.length; i++) {
    //   theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    // }
    auth = str.replace('auth=', '');
    console.log('auth===' + auth);
  }
}
Vue.prototype.goDoctorInfo = function (id) {
  var gzhId = getGzhId();
  if (gzhId.substr(-2) == '_d') {
    MintUI.Toast("您是医生不能预约")
  } else if (gzhId.substr(-2) == '_p') {
    window.location.href = '/' + gzhId + '/subscribeList/' + id;
  }
}
/* eslint-disable no-new */
window.eventBus = new Vue({
  el: '#app',
  router: rootRouter,
  template: '<App/>',
  components: {App}
})










