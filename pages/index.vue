a<template>
  <div class="container">
    <!-- <div class="datetime">{{ new Date() | dateTime }}</div> -->
    <van-tabs
      v-model="tabActive"
      sticky
      animated
      offset-top="46"
      swipe-threshold="5"
      title-active-color="#1989fa"
      color="#1989fa"
      @click="onTabsClick"
    >
      <van-tab v-for="(tab, tabIndex) in list" :key="tabIndex" :title="tab.title" :name="tab.tabActive">
        <listNews
          v-if="tabActive == tab.tabActive"
          :finished="false"
          :disabled="false"
          @jumpClick="jumpClick"
          :requestData="requestData"
        >
        <div slot='buts'>
          <van-button @click.stop="btn1" type="info" size="small">按钮</van-button>
          <van-button @click.stop="btn1" type="info" size="small">按钮</van-button>
        </div>
        </listNews>
      </van-tab>
    </van-tabs>
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { AppService } from "@/api";
import { list,  } from "@/utils/variable";
export default {
  inject: ['routerLoad'],
  data() {
    return {
      tabActive: 1,
      list,
      requestData: null
    };
  },
  computed: {},
  created() {
    this.requestData = {
      longitude: 117.233055,
      latitude: 39.109994,
      tabActive: this.tabActive,
    };
  },
  methods: {
    ...mapActions("AppStore", [
      "setTabShow",
      "setHeadShow",
      "setHeadShowContent"
    ]),
    // 列表跳转函数
    jumpClick(e) {
      console.log("获取店铺的详情",e);
      const query = { shopId: e.sId };
      this.$router.push({ path: "/other", query });
    },
    // tab 切换
    onTabsClick(e) {
      this.requestData = JSON.parse(JSON.stringify(this.requestData));
      this.requestData.tabActive = e;
    }
  },
  components: {
    // 分页和上拉加载
    listNews: () => import("./list-news"),
  },
  activated() {
    this.setTabShow(true);
    this.setHeadShow(true);
    this.setHeadShowContent({
      title: "首页",
      showleft: false,
      showRight: true,
      actions: {
        code: "text",
        text: "确定"
      },
      onLeftClick: null,
      onRightClick: () => {
        // let oldQuery = this.$route.query;
        // let newQuery = { name: 'a' }
        // let query = { ...oldQuery, ...newQuery };
        // this.$router.push({ path: '/', query })
        // //  调用刷新当前页面的方法
        // this.routerLoad()
        this.$toast("首页");
      }
    });
  }
};
</script>

<style lang="less" scoped>
.datetime {
  height: 50px;
}
</style>
