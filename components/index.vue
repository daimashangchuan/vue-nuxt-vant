<template>
  <div class="container">
    <p>{{ list }}</p> 
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      list: [1]
    };
  },
  computed: {},
  methods: {
    ...mapActions('AppStore', ['setTabShow', 'setHeadShow', 'setHeadShowContent']),
  },
  components: {},
  created() {
    this.setTabShow(true);
    this.setHeadShow(true);
    this.setHeadShowContent({ 
      title: '新建的页面',
      showleft: true, 
      showRight: true,
      actions: {
        code: 'icon', 
        icon: 'setting',
      },
      onLeftClick: () => {
        this.$router.go(-1);
      },
      onRightClick: () => {
        this.list = [1,2,3,4,5];
      }
    }) 
  }
};
</script>

<style lang="less" scoped></style>
