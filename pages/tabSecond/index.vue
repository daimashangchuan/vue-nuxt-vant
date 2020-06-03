<template>
  <div class="container">
    <!-- 轮播图 -->
    <swiperBanner :isIndicatorShow='true' />
    <!-- 分享面板 -->
    <div class="tab-share">
      <van-cell title="显示分享面板" is-link @click="showShare = true" />
      <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
    </div>
    <!-- 表单 -->
    <div class="tab-from">
      <van-form validate-first @failed="onFailed" @submit="onSumbit">
        <!-- 选择日期 -->
        <van-field
          required
          clearable
          name="date"
          readonly
          clickable
          label="日期区间"
          :value="date"
          placeholder="选择日期区间"
          @click="showCalendar = true"
          :rules="[{ 
            required: true, message: '请选择合理日期区间'
          }]"
        />
        <van-calendar
          color="#1989fa"
          v-model="showCalendar"
          :value="currentDate"
          type="range"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirmDate"
        />

        <!-- 选择时间 -->
        <van-field
          required
          clearable
          name="datetime"
          readonly
          clickable
          label="时间"
          :value="datetime"
          placeholder="选择完整时间"
          @click="showDatetime = true"
          :rules="[{ 
            required: true, message: '请选择完整时间'
          }]"
        />
        <van-popup v-model="showDatetime" position="bottom">
          <van-datetime-picker
            v-model="currentDatetime"
            type="datetime"
            title="选择完整时间"
            :min-date="minDate"
            :max-date="maxDate"
            :filter="filter"
            @confirm="onConfirmTime"
            @cancel="showDatetime=false"
          />
        </van-popup>

        <!-- 选择器 -->
        <van-field
          name="dataPicker"
          readonly
          clickable
          label="周天"
          :value="dataPicker"
          placeholder="自定义选择器"
          @click="showDataPicker = true"
          :rules="[{ 
            required: true, message: '请选择'
          }]"
        />
        <van-popup v-model="showDataPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showDataPicker = false"
            @confirm="onConfirmPicker"
          />
        </van-popup>

        <!-- 选择省市区 -->
        <van-field
          name="dataArea"
          readonly
          clickable
          label="城市"
          :value="dataArea"
          placeholder="选择城市省市区"
          @click="showDataArea = true"
          :rules="[{ 
            required: true, message: '请选择城市省市区'
          }]"
        />
        <van-popup v-model="showDataArea" round position="bottom">
          <van-area
            title="标题"
            :value="valueArea"
            :area-list="areaList"
            @cancel="showDataArea = false"
            @confirm="onConfirmArea"
          />
        </van-popup>

        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          required
          clearable
          v-model="pattern"
          name="pattern"
          label="汉字"
          placeholder="正则校--只能输入汉字"
          safe-area-inset-bottom
          :rules="[{ 
            required: true, pattern: patternClick, message: '只能输入中文'
          }]"
        />

        <!-- 通过 validator 进行函数校验 -->
        <van-field
          required
          clearable
          v-model="validator"
          type="number"
          name="validator"
          label="数字"
          placeholder="函数校验--只能输入数字"
          safe-area-inset-bottom
          :rules="[{ 
            required: true, validator: validatorsClick, message: '请输入数字'
          }]"
        />
        <van-divider :style="{ margin: '0' }" />

        <!-- 带有按钮的输入框 -->
        <van-field
          required
          clearable
          v-model="smsCode"
          maxlength="6"
          type="digit"
          name="smsCode"
          center
          label="短信验证码"
          placeholder="请输入验证码"
          safe-area-inset-bottom
          :rules="[{ 
            required: true, message: '请输入短信验证码'
          }]"
        >
          <template #button>
            <van-button 
              @click="smsCodeClick"
              native-type="button"
              size="small"
              type="info"
              :disabled="showSmsCode"
            >
              {{ showSmsCode? `${smsTime} 后重新发送` : '发送验证码' }}
            </van-button>
          </template>
        </van-field>

        <!-- 密码输入框 -->
        <!-- @touchstart.stop.native="showPassword = true" -->
        <van-field
          readonly
          clickable
          type="password"
          name="password"
          :value="password"
          @click="showPassword = true"
          placeholder="请设置密码"
          label="密码"
          :rules="[{ 
            required: true, message: '请设置密码'
          }]"
        />

        <!-- 密码弹框 -->
        <van-popup v-model="showPassword" round position="bottom" />
        <van-number-keyboard
          safe-area-inset-bottom
          v-model="password"
          :show="showPassword"
          title="键盘标题"
          extra-key=""
          close-button-text="完成"
          :maxlength="6"
          @blur="showPassword = false"
          z-index="2100"
        />
        
        <!-- 上传图片并且进行压缩 -->
        <van-field 
          name="fileList" 
          label="文件上传" 
          :rules="[{ 
            required: true, message: '请文件上传正面'
          }]"
        >
          <template #input>
            <van-uploader v-model="fileList" :max-count="3" :after-read="afterReadId" />
          </template>
        </van-field>

        <uploaderImage @uploaderImage="uploaderImageClick"></uploaderImage>

        <!-- 提交按钮 -->
        <div style="margin: 35px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { compressImg, formatDate, getAge, initDate } from "@/utils/util";
import areaList from "../data/address";    // 地址信息
import { smsTime } from "@/utils/variable"

export default {
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

      // 分享
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" }
      ],

      // 日期区间
      date: "2020/06/16 - 2020/06/19",
      currentDate: [new Date("2020/06/16 14:00"), new Date("2020/06/19 14:00")],
      showCalendar: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),

      // 选择时间
      currentDatetime: new Date("2020/06/11 14:00"),
      datetime: "2020/06/11 14:00",
      showDatetime: false,

      // 选择器
      showDataPicker: false,
      dataPicker: "周一-上午",
      columns: [
        {
          values: ["周一", "周二", "周三", "周四", "周五"],
          defaultIndex: 0
        },{
          values: ["上午", "下午", "晚上"],
          defaultIndex: 0
        }
      ],

      // 选择省市区
      showDataArea: false,
      dataArea: "辽宁省-抚顺市-望花区",
      valueArea: "210421",
      areaList,

      // 密码
      showPassword: false,
      password: "139686",

      // 正则校验
      pattern: "校验汉字",
      patternClick: /^[\u4e00-\u9fa5]+$/,

      // 函数校验
      validator: "1111",

      // 验证码  
      smsCode: "123456",
      showSmsCode: false, 
      smsTime,
      
      // 文件上传
      fileList: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }]
    };
  },
  mounted() {
    // console.log(initDate("13","D"));
    // console.log(getAge("1995-08-11"));
  },
  methods: {
    ...mapActions("AppStore", [
      "setTabShow",
      "setHeadShow",
      "setHeadShowContent"
    ]),

    // 选择分享
    onSelect(value) {
      console.log(value);
      this.$toast(value.name);
      this.showShare = false;
    },

    // 日期
    onConfirmDate(date) {
      console.log(date);
      this.currentDate = date;
      const [start, end] = date;
      this.showCalendar = false;
      this.date = `${formatDate(start, "date")} - ${formatDate(end, "date")}`;
    },

    // 时间 过滤
    filter(type, options) {
      if (type === "minute") {
        return options.filter(option => option % 15 === 0);
      }
      return options;
    },
    // 选中时间
    onConfirmTime(time) {
      this.datetime = formatDate(time, "noSec");
      this.showDatetime = false;
    },

    // 初始化地址信息
    initColumns() {
      this.columns = areaList;
    },

    // 选择器确定
    onConfirmPicker(e) {
      console.log(e);
      this.dataPicker = "";
      e.forEach(item => {
        this.dataPicker += `${item}-`;
      });
      this.dataPicker = this.dataPicker.substr(0, this.dataPicker.length - 1);
      this.showDataPicker = false;
    },

    // 选中地址位置的数据
    onConfirmArea(e) {
      console.log(e);
      this.dataArea = "";
      e.forEach(item => {
        this.dataArea += `${item.name}-`;
      });
      this.dataArea = this.dataArea.substr(0, this.dataArea.length - 1);
      this.showDataArea = false;
    },

    // 校验函数返回 true 表示校验通过，false 表示不通过
    validatorsClick(val) {
      const reg = /^[0-9]+.?[0-9]*$/;
      return reg.test(val);
    },

    // 获取
    smsCodeClick() {
      if(this.showSmsCode) return;
      this.showSmsCode = true;
      this.countDown();
      console.log("发送验证码接口 go")
    },
    countDown() {
      this.smsTime = this.smsTime - 1;
      if (this.smsTime === 0) {
        this.showSmsCode = false;
        this.smsTime = 60;
        return;
      } else {
        setTimeout(this.countDown, 1000);
      }
    },

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

    uploaderImageClick(file) {
      this.fileList.push(file);
    },

    // 提交表单校验没有通过日志
    onFailed(errorInfo) {
      console.log("失败日志 onFailed", errorInfo);
      const { errors, values } = errorInfo;
      if(errors && errors.length) {
        const toast = errors[0].message;
        this.$toast(toast);
      }
    },

    // 提交表单校验通过日志
    onSumbit(successInfo) {
      successInfo.password = this.JsMd5(successInfo.password)
      console.log("成功日志 onSumbit", successInfo);
      this.$toast("提交成功");
    }
  },
  components: {
    swiperBanner: () => import("../components/swiper-banner"),
    uploaderImage: () => import("../components/uploader-image"),
  },
  created() {
    this.setTabShow(true);
    this.setHeadShow(true);
    this.setHeadShowContent({
      title: "搜索",
      showleft: false,
      showRight: true,
      actions: {
        code: "icon",
        icon: "search"
      },
      onLeftClick: null,
      onRightClick: () => {
        this.$toast("搜索");
      }
    });
  },
  // activated() {
  //   this.setTabShow(true);
  //   this.setHeadShow(true);
  //   this.setHeadShowContent({
  //     title: "搜索",
  //     showleft: false,
  //     showRight: true,
  //     actions: {
  //       code: "icon",
  //       icon: "search"
  //     },
  //     onLeftClick: null,
  //     onRightClick: () => {
  //       this.$toast("搜索");
  //     }
  //   });
  // }
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
