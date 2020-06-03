/**
 * 全局过滤器
 */

export default function initFilters(Vue) {
  /**
   * @param type 格式化的格式
   */
  Vue.filter("dateTime", (nS, type) => {
    if (!nS) return ''
    const date = new Date(nS)
    var year = date.getFullYear()
    var mon = date.getMonth() + 1 <= 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()
    var hours = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours()
    var minu = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()
    var sec = date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds()
    if (type == 'date') {
      return year + '-' + mon + '-' + day
    } else if (type == 'time') {
      return hours + ':' + minu + ':' + sec
    } else if (type == 'noSec') {
      return year + '-' + mon + '-' + day + ' ' + hours + ':' + minu
    } else {
      return year + '-' + mon + '-' + day + ' ' + hours + ':' + minu + ':' + sec
    }
  });
  /**
   * @param number：要格式化的数字
   * @param decimals：保留几位小数 默认0位
   * @param decPoint：小数点符号 默认.
   * @param thousandsSep：千分位符号 默认为,
   */
  Vue.filter('formatMoney', (number, decimals = 2, decPoint = '.', thousandsSep = ',') => {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !isFinite(+number) ? 0 : +number
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    let dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    let s = ''
    let toFixedFix = function (n, prec) {
      let k = Math.pow(10, prec)
      return '' + Math.ceil(n * k) / k
    }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    let re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2')
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
  });
  // 计算流量值   
  Vue.filter('flowBytes', (bytes) => {
    var k = 1024, // or 1024
        sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(0) + ' ' + sizes[i];
  })
}  
