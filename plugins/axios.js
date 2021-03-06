/**
 * axios的全局设置
 */
import axios from "axios";
import qs from "qs";
import { AXIOS_URL } from "../config";

export default ({ store }) => {
  // 设置请求路径
  axios.defaults.baseURL = AXIOS_URL;
  // 设置超时时间
  axios.defaults.timeout = 45000;
  // qs 解析 URL 为字符串/对象
  axios.defaults.transformRequest = [
    function(params) {
      return qs.stringify(params, { arrayFormat: "brackets", allowDots: true });
    }
  ];
  // 跨域访问需要发送cookie
  axios.defaults.withCredentials = true;
  // post 请求需要 Content-Type
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";

  // 请求 request 拦截器，在这里，我们给每个请求都加 token
  axios.interceptors.request.use(
    request => {
      request.headers["X-SZK-Channel"] = "h5";
      request.headers["X-SZK-Token"] = "";
      request.headers["X-SZK-UUID"] = "";

      // 动画效果
      const loadingFlag = request.data.NoLoading;
      if (!loadingFlag) {
        store.dispatch("AppStore/setLoading", true);
      }
      return request;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // 响应 response 拦截器
  axios.interceptors.response.use(
    response => {
      store.dispatch("AppStore/setLoading", false);
      return response.data.result;
    },
    //-- 对响应错误做点什么
    error => {
      store.dispatch("AppStore/setLoading", false);
      return Promise.reject(error);
    }
  );
  return axios;
};

export function ajaxRequest(url, method, data, callback) {
  var xhr;
  try {
    // Firefox, Opera 8.0+, Safari
    xhr = new XMLHttpRequest();
  } catch (e) {
    try {
      // Internet Explorer
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {}
    }
  }
  xhr.open(method, url, true);
  //如果是POST请求方式，设置请求首部信息
  xhr.setRequestHeader("utoken", token);
  xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhr.send(data);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200 || xhr.status == 304) {
        var res = xhr.responseText;
        var data = JSON.parse(res);
        callback(data);
      }
    }
  };
}
