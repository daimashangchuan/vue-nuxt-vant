/**
 *  挂载到全局
 */
import Vue from "vue"; 

// 全局过滤器 filter 
import initFilters from '../utils/fliter';
initFilters(Vue);

// 挂载全局公共的方法
import { SessionUtil, LocalUtil, CookieUtil } from "../utils/caches";
import JsMd5 from 'js-md5';
import { BASE_URL } from "../config"
Vue.use(SessionUtil).use(LocalUtil).use(CookieUtil);
Vue.prototype.JsMd5= JsMd5;
Vue.prototype.BASE_URL= BASE_URL;


// 挂载公共的组件
import AppHeader from '../components/AppHeader.vue';
import AppTabBar from '../components/AppTabBar.vue';
Vue.component(AppHeader.name, AppHeader);
Vue.component(AppTabBar.name, AppTabBar);


// 在项目中使用 vconsole
console.log("===production || development===",process.env.NODE_ENV);
import Vconsole from 'vconsole'
if(process.env.NODE_ENV == "development") {
	let vConsole = new Vconsole()
	Vue.use(vConsole)
}


// 解决不能跳转自己的问题
// import vueRouter from 'vue-router'
// const originalPush = vueRouter.prototype.push
// vueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
