<template>
  <div class="html2canvas">
		<div class="imageWrapper" ref="imageWrapper">
			<van-steps direction="vertical" active-icon="success" active-color="#38f" active>
				<van-step>
					<h3>【城市】物流状态1</h3>
					<p>2016-07-12 12:40</p>
				</van-step>
				<van-step>
					<h3>【城市】物流状态2</h3>
					<p>2016-07-11 10:00</p>
				</van-step>
				<van-step>
					<h3>快件已发货</h3>
					<p>2016-07-10 09:30</p>
				</van-step>
			</van-steps>
		</div>
		<div class="htmlToImageUrl" v-if="!!htmlToImageUrl"> 
			<van-image :src="htmlToImageUrl" />
		</div>
  </div>
</template>

<script>
import html2canvas from "html2canvas"
export default {
	data() {
		return {
			active: 0,
			htmlToImageUrl: ''
		}
	},
  mounted() {
		this.$nextTick(() =>{
      this.htmlToImage();
    })
  },
  methods: {
    htmlToImage() {
			html2canvas(this.$refs.imageWrapper).then(canvas => {
				this.htmlToImageUrl = canvas.toDataURL("image/png");
			});
		}
  },
};
</script>

<style lang="less" scoped>
.html2canvas {
	margin: 30px 0;
	.imageWrapper {
		position: relative;
	}
	.htmlToImageUrl {
		margin-top: 10px;
	}
}
</style>
