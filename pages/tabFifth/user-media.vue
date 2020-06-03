<template>
  <div>
    <!--照片区域-->
    <div
      v-for="(urls, index) in imgs "
      :key="index"
      style="float: left; margin: 10px ; border: 1px solid #ccc;"
    >
      <div style="text-align: right; position: relative;" v-on:click="deleteImg(index)">X</div>
      <img :src="urls" width="100px" height="100px" />
    </div>
    <div
      style=" width: 100px; height: 100px; background-color: #ccc; border:1px solid #ccc; float: left;  margin: 10px ;"
      v-on:click="imgClick()"
    ></div>
    <input
      style="float: left;  display: none;"
      type="file"
      id="uploadFile"
      accept="image/*"
      v-on:change="readLocalFile()"
    />
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      imgs: []
    };
  },
  methods: {
    //删除图片
    deleteImg: function(index) {
      this.imgs.splice(index, 1);
    },
    //图片click
    imgClick: function() {
      document.getElementById("uploadFile").click();
    },
    //点击选中图片
    readLocalFile: function() {
      var localFile = document.getElementById("uploadFile").files[0];
      var reader = new FileReader();
      var content;
      var current = this;
      reader.onload = function(event) {
        content = event.target.result;
        current.imgs.push(content); //获取图片base64代码
      };
      reader.onerror = function(event) {
        alert("error");
      };
      content = reader.readAsDataURL(localFile, "UTF-8");
      var sss = document.getElementById("uploadFile").value;
      console.log(sss);
    }
  },
};
</script>
 
<style scoped></style>