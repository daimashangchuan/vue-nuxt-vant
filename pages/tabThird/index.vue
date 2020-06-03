<template>
  <div class="container">
    <!-- 可视化图形 -->
    <andvCanvas />

    <!-- 签名 -->
    <template>
      <signature @signature="signatureClick"></signature>
      <div v-if="!!imageUrl"> 
        <van-image :src="imageUrl" />
      </div>
    </template>

    <!-- html 元素转化为 canvas -->
    <htmlCanvas />

    <!-- 二维码 -->
    <qrCanvas />
  </div>  
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      imageUrl: ''
    };
  },
  watch: {
    imageUrl(val) {
      if(val) {
        return val
      } else {
        return ''
      }
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions('AppStore', ['setTabShow', 'setHeadShow', 'setHeadShowContent']),
    signatureClick(e) {
      this.imageUrl = e
    }
  },
  components: {
    signature: () => import("../components/signature"), 
    andvCanvas: () => import("../components/andv-canvas"),
    htmlCanvas: () => import("../components/html-canvas"),
    qrCanvas: () => import("../components/qr-canvas"),
  },
  created() {
    this.setTabShow(true);
    this.setHeadShow(true);
    this.setHeadShowContent({ 
      title: '朋友',
      showleft: false, 
      showRight: true,
      actions: {
        code: 'text', 
        text: '朋友',  
      },
      onLeftClick: null,
      onRightClick: () => {
        this.$toast('朋友');
      }
    })
  },
};
</script>

<style lang="less" scoped></style>
