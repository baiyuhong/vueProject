/**
 * Created by admin on 2017/11/15.
 */

import axios from 'axios';
import {Toast} from 'mint-ui';
import {Indicator} from 'mint-ui';

/**
 * post 请求, 带 Indicator
 * @param url
 * @param params
 * @param success
 * @param error
 */
function post(url, params, success, error, host) {

  url = uri2url(host, url);

  Indicator.open();
  var parser = new UAParser();
   axios.post(url, params).then(function (result) {
    Indicator.close();
    if (result.data.code == 2000){
      success(result);
    }else if(result.data.code == 10002){ //无数据
      success(result);
    } else if (result.data.code == 100004) { // 切换设备
      success(result);
    } else if (result.data.code == 2001) { // 参数错误
      error(result);
    } else {
      error(result);
    }
  }).catch(function (network_error) {
    Indicator.close();

    console.log(network_error);
    Toast('网络超时，请重试！');
  })
};

/**
 * 去除Indicator post
 * @param url
 * @param params
 * @param success
 * @param error
 */
function postConsult(url, params, success, error, host) {
  // if (url[0] == '/')
  //   url = process.env.API_HOST + url;
  url = uri2url(host, url);

  axios.post(url, params).then(function (result) {
    if (result.data.code == 2000) {
      success(result);
    }
    else if (result.data.code == 100004) { //切换设备
      success(result);
    }
    else if (result.data.code == -1) {
      error(result);
      setAuthForNull(); // 清空当前公众号auth
    } else {
      error(result);
    }
  }).catch(function (network_error) {
    Indicator.close();
  })
};


function uri2url(host, url) {
  if (url[0] == '/') { //无域名的路径
    if (host) {
      url = host + url;
    } else {
      if (url.substr(0, 7) == '/wechat') { //微信非商城请求转neo域名
        url = process.env.API_HOST + url;
        console.log("///"+url);
      } else if (url.substr(0, 5) == '/mall') { //商城请求转mall域名
        url = process.env.API_HOST_MALL + url;
      }
    }
  }
  return url;
}

/**
 * post 请求  直接返回数据是 html页面
 * @param url
 * @param params
 * @param success
 * @param error
 */
function postHtml(url, params, success, error, host) {
  url = uri2url(host, url);

  Indicator.open();
  axios.post(url, params).then(function (result) {
    Indicator.close();
    console.log(result)
    success(result);
  }).catch(function (network_error) {
    Indicator.close();
    console.log(network_error);
    Toast('网络不给力 ! 请稍后再试!' + network_error);
  })
};

/**
 * get 请求 带Indicator
 * @param url
 * @param params
 * @param success
 * @param error
 */
function get(url, params, success, error, host) {
  url = uri2url(host, url);

  Indicator.open();
  axios.get(url, params).then(function (result) {
    Indicator.close();
    if (result.data.code == 2000) {
      success(result);
    }
    else if (result.data.code == -1) {
      error(result);
      setAuthForNull(); // 清空当前公众号auth
    } else {
      error(result);
    }
  }).catch(function (network_error) {
    Indicator.close();
    console.log(network_error);
    Toast('网络不给力 ! 请稍后再试!' + network_error);
  })
}

/**
 * 设置auth
 */
function setAuthForNull() {
  var path = window.location.href;
  if (path.indexOf(gzhId) != -1) {
    localStorage.setItem(gzhId + '_auth', '');
  }
}

/**
 * 获取用户状态
 * 根据返回状态，返回要跳转的页面，空为不需要跳转
 */
class Util {
  // static checkPatientStatus(auth) {
  //   return 'patientLogin';
  // }
  ;
  static getParameterByName(name, url) {
    if (!url) {
      url = window.location
    }
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  // 控制微信浏览器返回按钮到特定页面
  // 用法 放在 mounted里 netWrokUtils.Util.goBackTo(function(that){that.$router.push('docLogin')}, this);
  static goBackTo(callback, currentObj) {
    var state = {
      url: ""
    };
    window.history.pushState(state, state.title, state.url);
    window.addEventListener("popstate", function (e) {  //回调函数中实现需要的功能
      console.log("我监听到了浏览器的返回按钮事件啦");
      if (callback)
        callback(currentObj);
      // location.href = url;  //在这里指定其返回的地址
    }, false);
  }

}

class ApiHost {
  static NEO = process.env.API_HOST;
  static MALL = process.env.API_HOST_MALL;
}

//导出自定义函数和对象
export default {
  post,
  get,
  postConsult,
  postHtml,
  Util
}


