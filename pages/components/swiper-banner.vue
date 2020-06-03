<template>
  <div class="tab-swiper">
		<van-swipe :autoplay="4000" @change="onChange" indicator-color="white">
			<van-swipe-item v-for="(image, index) in images" :key="index">
				<van-image :radius="25" :src="image" v-lazy="image" />
			</van-swipe-item>
			<template #indicator> 
				<div v-if="isIndicatorShow" class="custom-indicator">{{ imageCurrent + 1 }}/{{ images.length }}</div>
			</template>
		</van-swipe>
	</div>
</template>

<script>
export default {
  props: {
    isIndicatorShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 轮播图
      images: [
        "https://m.bianlimt.com/Uploads/ueditor/images/20200429/1588128356926026651.jpg",
        "https://m.bianlimt.com/Uploads/ueditor/images/20200430/1588210494998082741.jpg",
        "https://m.bianlimt.com/Uploads/ueditor/images/20200430/1588210691682050967.jpg",
        "https://m.bianlimt.com/Uploads/ueditor/images/20200501/1588290578749036850.jpg",
        "https://m.bianlimt.com/Uploads/ueditor/images/20200501/1588290747271050553.jpg"
      ],
      imageCurrent: 0,
    };
  },
  methods: {
    // 自定义轮播图的索引指示器
    onChange(index) {
      this.imageCurrent = index;
    },
  }
};
</script>

<style lang="less" scoped>
.custom-indicator {
  position: absolute;
  right: 18px;
  bottom: 12px;
  padding: 2px 5px;
  font-size: 12px;
  color: @colofff;
  background: rgba(0, 0, 0, 0.1);
  z-index: 999;
}
</style>
