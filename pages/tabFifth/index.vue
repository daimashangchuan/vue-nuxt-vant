<template>
  <div class="container">
    <userMedia></userMedia>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapActions('AppStore', ['setTabShow', 'setHeadShow', 'setHeadShowContent']),
  },
  components: {
    userMedia: () => import("./user-media"),
  },
  created() {
    this.setTabShow(true);
    this.setHeadShow(true);
    this.setHeadShowContent({ 
      title: '设置',
      showleft: false, 
      showRight: true,
      actions: {
        code: 'icon',
        icon: 'setting',
      },
      onLeftClick: null,
      onRightClick: () => {
        this.$toast('设置');
      }
    }) 
  },
};
</script>

<style lang="less" scoped></style>
