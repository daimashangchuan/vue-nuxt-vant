<template>
  <div class="container">
    <!-- 上传图片并且进行压缩 -->
    <van-field 
      name="fileLists" 
      label="文件上传" 
      :rules="[{ 
        required: true, message: '请文件上传反面'
      }]"
    >
      <template #input>
        <van-uploader v-model="fileLists" :max-count="3" :after-read="afterReadId"/>
      </template>
    </van-field>
  </div>
</template>

<script>
import { compressImg } from "@/utils/util";
export default {
  data() {
    return {
      // 文件上传
      fileLists: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }]
    };
  },
  methods: {
    // 读取图片前触发的函数
    afterReadId(file) {
      console.log("上传图片的文件信息", file);
      const img = new Image();
      img.src = file.content;
      compressImg(img, res => {
        console.log("压缩之后的图片", res);
        file.content = res;
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
