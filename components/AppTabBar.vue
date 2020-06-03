<template>
  <van-tabbar  v-if="isTabShow" v-model="active" @change="onChange" :z-index='10'>
    <van-tabbar-item v-for="(item, index) in list" :key="index" :name="item.name">
      <P>{{ item.title }}</P>
      <template #icon="props">
        <img :src="props.active ? item.active : item.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'AppTabBar',
  data() {
    return {
      docmHeight: document.documentElement.clientHeight ||document.body.clientHeight,
      showHeight: document.documentElement.clientHeight ||document.body.clientHeight,
    }
  },
  computed: {
    ...mapState("AppStore", ["isTabShow"])
  },
  watch: {
    "$route.path": function(newVal) {
      this.active = newVal;
    },
  },
  mounted() {
    this.active = this.$route.path;
  },
  methods: {
    onChange(name) {
      this.$router.replace({ path: name });
    }
  },
  data() {
    return {
      active: "/",
      list: [
        {
          title: "首页",
          name: "/",
          inactive: "https://m.bianlimt.com/images/daizhifu.png",
          active: "https://img.yzcdn.cn/vant/user-active.png"
          // active: "/images/996.png"
        },
        {
          title: "搜索",
          name: "/tabSecond",
          inactive: "https://m.bianlimt.com/images/daizhifu.png",
          active: "https://img.yzcdn.cn/vant/user-active.png"
        },
        {
          title: "朋友",
          name: "/tabThird",
          inactive: "https://m.bianlimt.com/images/daizhifu.png",
          active: "https://img.yzcdn.cn/vant/user-active.png"
        },
        {
          title: "消息",
          name: "/tabFourth",
          inactive: "https://m.bianlimt.com/images/daizhifu.png",
          active: "https://img.yzcdn.cn/vant/user-active.png"
        },
        {
          title: "设置",
          name: "/tabFifth",
          inactive: "https://m.bianlimt.com/images/daizhifu.png",
          active: "https://img.yzcdn.cn/vant/user-active.png"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
  .isTabFixedClass {
    position: absolute;
  }
</style>
