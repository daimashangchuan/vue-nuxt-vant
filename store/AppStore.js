/**
 * head 和 tabbar 用到的状态
 */
import { AppService } from "@/api";
const state = {
  isTabShow: true,   
  isheadShow: true,     // 是否展示头部
  title: '首页',        // 标题的内容
  showleft: false,       // 是否显示返回按钮
  showRight: false,     // 是否显示右上角的内容
  actions: {
    code: null,     // text/icon  展示字/图片
    text: null,     // 按钮的内容
    icon: null,   // 按钮的图标
  },
  onLeftClick: null,    // 右边点击事件
  onRightClick: null,    // 左边点击事件
  loadingShow: false,
};
const mutations = {
  SER_TAB_SHOW (state, newState) {
    state.isTabShow = newState;
  },
  SER_HEAD_SHOW (state, newState) {
    state.isheadShow = newState;
  },
  SER_HEAD_SHOW_CONTENT (state, newState) {
    state.title = newState.title;
    state.showleft = newState.showleft;
    state.showRight = newState.showRight;
    state.actions = newState.actions;
    state.onLeftClick = newState.onLeftClick;
    state.onRightClick = newState.onRightClick;
  },
  SET_LOADING (state, newState) {
    state.loadingShow = newState;
  }
};
const actions = {
  setTabShow({ commit }, newState) {
    commit('SER_TAB_SHOW', newState);
  },
  setHeadShow({ commit }, newState) {
    commit('SER_HEAD_SHOW', newState);
  },
  setHeadShowContent({ commit }, newState) {
    commit('SER_HEAD_SHOW_CONTENT', newState);
  },
  setLoading({ commit }, newState) {
    commit('SET_LOADING', newState);
  }
};
const getters = {
   gettersss: async (state) => {
    if(state.title) {
      const { errCode, result } = await AppService.getShop({
        longitude: 117.233055,
        latitude: 39.109994,
        tabActive: 1,
        page: 1,
        pageSize: 20
      });
      return result
    } else {
      return state.title + "aaaaaaaaaaaa"
    }
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
