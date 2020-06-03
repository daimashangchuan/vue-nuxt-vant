<template>
  <div> 12313 </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapActions('AppStore', ['setTabShow', 'setHeadShow', 'setHeadShowContent']),
  },
  mounted() {
    
  },
  components: {},
  created() {
    this.setTabShow(false);
    this.setHeadShow(true);
    this.setHeadShowContent({ 
      title: '二级页面',
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
        this.list.push(this.list.length);
      }
    }) 
  },
};
</script>

<style lang="less" scoped></style>