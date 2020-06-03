<template>
  <div class="container" ref="container">
    <div class="grid" ref="grid">
      <van-grid :gutter="10" ref="grid">
        <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" badge="9" />
      </van-grid>
    </div>
    <div class="wrapper" :style="{ height: `${wrapHeight}px` }">
      <van-sidebar v-model="sidebarActiveKey">
        <van-sidebar-item title="标签名1" />
        <van-sidebar-item title="标签名2" />
        <van-sidebar-item title="标签名3" />
        <van-sidebar-item title="标签名4" />
        <van-sidebar-item title="标签名5" />
        <van-sidebar-item title="标签名6" />
        <van-sidebar-item title="标签名7" />
        <van-sidebar-item title="标签名8" />
        <van-sidebar-item title="标签名9" />
      </van-sidebar>
      <div class="sidebarRight">
        <van-index-bar :index-list="indexList" highlight-color="#1989fa">
          <van-index-anchor index="1">标题1</van-index-anchor>
          <van-cell :title="`文本1`" v-for="(item ,index) in [1,2,3,4,5,6,7,8,9]" :key='index'/>
          <van-index-anchor index="2">标题2</van-index-anchor>
          <van-cell :title="`文本2`" v-for="(item ,index) in [1,2,3,4,5,6,7,8,9]" :key='index'/>
          <van-index-anchor index="3">标题3</van-index-anchor>
          <van-cell :title="`文本3`" v-for="(item ,index) in [1,2,3,4,5,6,7,8,9]" :key='index'/>
          <van-index-anchor index="4">标题4</van-index-anchor>
          <van-cell :title="`文本4`" v-for="(item ,index) in [1,2,3,4,5,6,7,8,9]" :key='index'/>
        </van-index-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      wrapHeight: 0,
      sidebarActiveKey: 0,
      indexList: [1, 2, 3, 4]
    };
  },
  computed: {},
  methods: {
    ...mapActions("AppStore", [
      "setTabShow",
      "setHeadShow",
      "setHeadShowContent"
    ])
  },
  mounted() {
    let clientHeight = `${document.documentElement.clientHeight}`;
    let grid = this.$refs.grid.offsetHeight;
    this.wrapHeight = clientHeight - (grid + 96);
  },
  components: {},
  created() {
    this.setTabShow(true);
    this.setHeadShow(true);
    this.setHeadShowContent({
      title: "消息",
      showleft: false,
      showRight: true,
      actions: {
        code: "icon",
        icon: "friends"
      },
      onLeftClick: null,
      onRightClick: () => {
        this.$toast("消息");
      }
    });
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  background: @backfff;
  display: flex;
  .sidebarRight {
    width: 290px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>