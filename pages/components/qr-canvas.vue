<template>
  <div class="qrCanvas">
    <vue-qr :size="200" :logoSrc="logoIcon" :logoScale="50" :text="codeValue" :margin="0" :dotScale="1"></vue-qr>
  </div>
</template>

<script>
import vueQr from "vue-qr";

export default {
  data() {
    return {
      codeValue: "https://m.bianlimt.com",
      logoIcon: require("../../assets/images/logo.gif"),   // 必须使用 require   绝对路径	 
    };
  },
  mounted() {},
  components: {
    vueQr
  }
};
</script>

<style lang="less" scoped>
.qrCanvas {
	background: @backfff;
	display: flex;
	justify-content: center;
}
/**
text                        欲编码的内容
size  　　　　　　　　　　　　尺寸, 长宽一致, 包含外边距
margin 　　　　　　　　　　　二维码图像的外边距, 默认 20px
colorDark　　　　　　　　　　实点的颜色
colorLight 　　　　　　　　　 空白区的颜色
bgSrc     　　　　　　　　　　欲嵌入的背景图地址
gifBgSrc     　　　　　　　　  欲嵌入的背景图 gif 地址,设置后普通的背景图将失效。设置此选项会影响性能
backgroundColor 　　　　　　背景色
backgroundDimming 　　　　 叠加在背景图上的颜色, 在解码有难度的时有一定帮助
logoSrc 　　　　　　　　　　 嵌入至二维码中心的 LOGO 地址
logoMargin LOGO 　　　　　 标识周围的空白边框, 默认为0
logoBackgroundColor Logo    背景色,需要设置 logo margin
logoCornerRadius LOGO        标识及其边框的圆角半径, 默认为0
whiteMargin                         若设为 true, 背景图外将绘制白色边框
*/
</style>