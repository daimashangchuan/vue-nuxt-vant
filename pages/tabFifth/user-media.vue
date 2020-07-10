<template>
  <div class="user-media">
    <video id="video" autoplay width="300" height="300" controls></video>
    <van-button class="video-btn" type="primary" @click.native="upBtnFileFace">刷脸验证</van-button>
    <input
      class="file"
      ref="videoFace"
      name="file"
      type="file"
      accept="video/*"
      @change="updateFace"
      style="display: none"
    />
  </div>
</template>

<script>
export default {
  data() {
  },
  methods: {
    updateFace(e) {
      const file = e.target.files[0] || e.dataTransfer.files[0];
      if (file) {
        // 本地预览
        const reader = new FileReader();
        const myVideo = document.querySelector("#video");
        reader.onloadend = evt => {
          myVideo.src = evt.target.result;
        };
        reader.readAsDataURL(file);
        myVideo.play();
        // 上传
        const fd = new FormData();
        fd.append("file", file);
        ocrIdCard(fd).then(response => {
          if (response) {
            console.log(response);
          }
        }).catch(() => {});
      }
    }
  }
};
</script>

<style scoped></style>
