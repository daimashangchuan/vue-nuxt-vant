<template>
  <div id="root">
    <div class="layouts" :style="!isheadShow&&!isTabShow ? { padding: 0 } : !isheadShow ? { paddingTop: 0 } : !isTabShow ? { paddingBottom: 0 }: ''">
      <!-- 接口加载loading -->
      <AppLoading></AppLoading>

      <!-- 公共的 head -->
      <app-header></app-header>

      <!-- 本地缓存 -->
      <keep-alive>
        <router-view v-if="keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!keepAlive"></router-view>

      <!-- 公共的 foot -->
      <app-tab-bar></app-tab-bar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppHeader from "../components/AppHeader.vue";
import AppTabBar from "../components/AppTabBar.vue";
import AppLoading from "../components/AppLoading.vue";

export default {
  components: {
    AppHeader,
    AppTabBar,
    AppLoading
  },
  computed: {
    ...mapState("AppStore", ["isheadShow", "isTabShow"]),
    keepAlive() {
      const { path } = this.$route
      // 缓存首页及分类页
      // return /^\/(tabSecond|tabFourth)?$/.test(path);
      return /^\/?$/.test(path);
    }
  }
};
</script>

<style lang="less">
@import "./default.less";
</style>
