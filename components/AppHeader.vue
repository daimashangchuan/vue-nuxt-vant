<template>
  <van-nav-bar v-if="isheadShow" fixed :z-index="10"
    :title="title" :left-arrow="showleft" 
    @click-left="onClickLeft" @click-right="onClickRight">
    <template #right v-if="showRight">
      <template v-if="actions && actions.code == 'icon'">
        <van-icon v-if="actions.icon == 'search'" name="search" size="18" />
        <van-icon v-else-if="actions.icon == 'friends'" name="friends-o" size="18"/>
        <van-icon v-else-if="actions.icon == 'setting'" name="setting-o" size="18"/>
      </template>
      <template v-if="actions && actions.code == 'text'">
        <p>{{ actions.text }}</p>
      </template>
    </template>
  </van-nav-bar>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "AppHeader",
  data() {
    return {};
  },
  computed: {
    ...mapState("AppStore", [
      "isheadShow",
      "title",
      "showleft",
      "showRight",
      "actions",
      "onLeftClick",
      "onRightClick",
    ]),
    ...mapGetters("AppStore", [
      "gettersss"
    ]),
  },
  async mounted() {
    console.log(await this.gettersss)
  },
  methods: {
    onClickLeft() {
      const leftClick = this.onLeftClick ? this.onLeftClick : null;
      if (this.isheadShow && this.showleft && typeof leftClick == "function") {
        leftClick();
      }
    },
    onClickRight() {
      const rightClick = this.onRightClick ? this.onRightClick : null;
      if (this.isheadShow && this.showRight && typeof rightClick == "function") {
        rightClick();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  background: @back198;
  color: @colofff;
  /deep/ .van-nav-bar__title, /deep/ .van-icon {
    color: @colofff;
  }
}
</style>
