/**
 * vuex的主入口文件
 */
import Vue from 'vue';
import Vuex from 'vuex';
import AppStore from './AppStore';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    AppStore
  }
});

export default store