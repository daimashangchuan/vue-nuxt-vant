import moment from "moment";

function formatNumber(value) {
  return String(value).padStart(2, '0');
  // return (value < 10 ? "0" : "") + value;
}
/**
 * 计算当前时间之前或之后的日期
 * initDate(-1,"D");    //获得当前时间1天前的日期
 * initDate(13,"M");    //获得当前时间13个月后的日期
 * initDate(14,"Y");    //获得当前时间14年后的日期
 */
export function initDate(n, timeUnit) {
  n = Number(n);
  var curr_date = new Date();
  if (timeUnit === "D") {
    curr_date.setDate(curr_date.getDate() + n);
  } else if (timeUnit === "M") {
    curr_date.setMonth(curr_date.getMonth() + n);
  } else if (timeUnit === "Y") {
    curr_date.setFullYear(curr_date.getFullYear() + n);
  }
  var strYear = curr_date.getFullYear();
  var strMonth = curr_date.getMonth();
  var strDay = curr_date.getDate();
  var strHours = curr_date.getHours();
  var strMinutes = curr_date.getMinutes();
  var datastr = strYear + "-" +
    formatNumber(strMonth) + "-" +
    formatNumber(strDay) + " " +
    formatNumber(strHours) + ":" +
    formatNumber(strMinutes);
  return datastr;
}

/**
 * 去字符串两头空字符串
 */
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 去除字符串全部空格
 * @author wfyuan 2020-02-07
 */
export function trimAll(str) {
  return str.replace(/\s+/g, "");
}

/**
 * 根据出生日期计算年龄
 */
export function getAge(birthday) {
  let age;
  if (!birthday) return 0;
  birthday =
    birthday.indexOf("-") >= 0
      ? birthday
      : moment(birthday).format("YYYY-MM-DD");
  const birthdayArr = birthday.split("-");
  const birthdayYear = birthdayArr[0];
  const birthdayMonth = parseInt(birthdayArr[1]);
  const birthdayDay = parseInt(birthdayArr[2]);
  const today = new Date();
  const nowYear = today.getFullYear();
  const nowMonth = today.getMonth() + 1;
  const nowDay = today.getDate();
  if (nowYear == birthdayYear) {
    age = 0; // 同年 则为0岁
  } else {
    const ageDiff = nowYear - birthdayYear; // 年之差
    if (ageDiff > 0) {
      if (nowMonth === birthdayMonth) {
        const dayDiff = nowDay - birthdayDay; // 日之差
        if (dayDiff < 0) {
          age = ageDiff - 1;
        } else if (dayDiff > 0) {
          age = ageDiff;
        } else {
          age = ageDiff;
        }
      } else {
        const monthDiff = nowMonth - birthdayMonth; // 月之差
        if (monthDiff < 0) {
          age = ageDiff - 1;
        } else if (monthDiff > 0) {
          age = ageDiff;
        } else {
          age = ageDiff;
        }
      }
    } else {
      let day = moment(today).diff(moment(birthday), "day"); // 天
      age = "未知"; // 0岁
    }
  }
  return age; // 返回周岁年龄
}

/**
 * 时间格式化方法
 * @param fmt YYYY-mm-dd HH:MM:SS
 * @param date
 * @returns {*}
 */
export function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
export function formatDate(nS, type){
  if (!nS) return ''
  const date = new Date(nS)
  var year = date.getFullYear();
  var mon = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minu = date.getMinutes();
  var sec = date.getSeconds();
  if (type == 'date') {
    return formatNumber(year) + '/' + formatNumber(mon) + '/' + formatNumber(day)
  } else if (type == 'time') {
    return formatNumber(hours) + ':' + formatNumber(minu) + ':' + formatNumber(sec)
  } else if (type == 'noSec') {
    return formatNumber(year) + '/' + formatNumber(mon) + '/' + formatNumber(day) + 
    ' ' + formatNumber(hours) + ':' + formatNumber(minu)
  } else {
    return formatNumber(year) + '/' + formatNumber(mon) + '/' + formatNumber(day) + 
    ' ' + formatNumber(hours) + ':' + formatNumber(minu) + ':' + formatNumber(sec)
  }
}


/**
 * 设别设备判断
 */
export function getDevice() {
  const u = navigator.userAgent;
  let device = "";
  if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    device = "android";
  } else if (u.indexOf("iPhone") > -1 && u.indexOf("Safari") === -1) {
    device = "ios";
  } else if (u.indexOf("MicroMessenger") > -1) {
    device = "wechat";
  } else {
    device = "web";
  }
  return device;
}

/**
 * 深拷贝
 */
export function deepClone(obj, toemptystr = false) {
  let copy;
  if (toemptystr && (obj || obj === null || obj === undefined)) return "";
  if (null == obj || "object" != typeof obj) return obj;
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i], toemptystr);
    }
    return copy;
  }
  if (obj instanceof Function) {
    copy = function() {
      return obj.apply(this, arguments);
    };
    return copy;
  }
  if (obj instanceof Object) {
    copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr))
        copy[attr] = deepClone(obj[attr], toemptystr);
    }
    return copy;
  }
  throw new Error("无法复制对象，因为不支持类型 " + obj.constructor.name);
}

/**
 * 数据类型判断
 */
export function getType(_val) {
  let s = Object.prototype.toString.call(_val);
  let res = s.substring(1, s.length - 1).split(" ")[1];
  return res;
}

/**
 * 将文件转化为base64
 * @param {*} file 待转换的文件
 */
export function fileToBase64(file) {
  let reader = new FileReader();
  reader.readAsDataURL(oFiles[0]);
  reader.onload = function(e) {
    return this.result;
  };
}

/**
 * 将base64转换为文件
 * @param {*} dataurl base64数据
 * @param {*} filename 文件名（示例:img.jpg）
 */
export function convertBase64UrlToFile(dataurl, filename) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * 图片上传压缩  压缩至尺寸: 383*512
 * @param {*} img 被压缩的图片对象（示例：<img src="1.png"/>）
 * @param {*} callback
 */
export function compressImg(img, callback) {
  img.onload = () => {
    let limitWidth = 383;
    let imageWidth = img.width;
    let imageHeight = img.height;
    const width = imageWidth > limitWidth ? limitWidth : imageWidth;
    const height = imageWidth > limitWidth ? parseInt((imageHeight * limitWidth) / imageWidth) : imageHeight;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    callback && callback(canvas.toDataURL("image/jpeg", 0.8));
  };
}

/**
 * 千分位字符串还原
 * @export
 * @param {*} num
 */
export function delcommafy(num) {
  //去除千分位中的‘，’
  if (num && num != "undefined" && num != "null") {
    let numS = num;
    numS = numS.toString();
    numS = numS.replace(/,/gi, "");
    return numS;
  } else {
    return num;
  }
}

/**
 * 数字转大写
 *
 * @export
 * @param {*} str
 */
export function number_chinese(str) {
  try {
    let num = parseFloat(str);
    let strOutput = "",
      strUnit = "仟佰拾亿仟佰拾万仟佰拾元角分";
    num += "00";
    let intPos = num.indexOf(".");
    if (intPos >= 0) {
      num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    }
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (let i = 0; i < num.length; i++) {
      strOutput +=
        "零壹贰叁肆伍陆柒捌玖".substr(num.substr(i, 1), 1) +
        strUnit.substr(i, 1);
    }
    return strOutput
      .replace(/零角零分$/, "整")
      .replace(/零[仟佰拾]/g, "零")
      .replace(/零{2,}/g, "零")
      .replace(/零([亿|万])/g, "$1")
      .replace(/零+元/, "元")
      .replace(/亿零{0,3}万/, "亿")
      .replace(/^元/, "零元");
  } catch (error) {
    return str;
  }
}


export const inputHandle = () => {
  // 判断是否是ios
  let flag = false;
  let pageBackNormFunc;
  document.body.addEventListener("focusin", () => {
    // 软键盘弹起事件
    flag = true;
    pageBackNormFunc && clearTimeout(pageBackNormFunc);
  });
  document.body.addEventListener("focusout", () => {
    // 软键盘关闭事件
    if (flag) {
      pageBackNormFunc = setTimeout(function() {
        // 当键盘收起的时候让页面回到原始位置
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 200);
    }
    flag = false;
  });
};


/**
 * console.log(Date.now("2020/06/16"));
 * console.log(new Date("2020/06/16").getTime());
 * 1590047728210
 * 1592236800000
 * 
 * Date.now() new Date().getTime()  获取当前时间戳结果一样
 */
