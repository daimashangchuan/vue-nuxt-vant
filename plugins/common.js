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



