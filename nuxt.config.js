
const path = require('path');
import { BASE_URL } from "./config";
export default {
  mode: 'universal',
  /*
  ** 设置头部信息   有利于seo
  */
  head: {
    title: "便利",
    meta: [
      { charset: "utf-8" },
      {
        name: "keywords",
        content: "便利码头,购物"
      },
      {
        name: "description",
        content: "网上购物，同城服务，周边商户与一体的网络平台。"
      }
    ],
  },
  /**
   * 设置路由的配置
   */
  router: {
    mode: "hash",
    scrollBehavior: function(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      return new Promise(function(resolve) {
        window.$nuxt.$once("triggerScroll", () => {
          resolve({ x: 0, y: 0 });
        });
      });
    }
  },
  /*
  ** 自定义进度条颜色
  */
  loading: { color: 'blue' },
  /*
  ** 全局的 css
  */
  css: [
    { src: "~assets/css/reset.css" },
  ],
  /*
  ** 安装应用程序之前要加载的插件
  */
  plugins: [
    '~/plugins/route.js',
    { src: "~plugins/axios.js", ssr: false },
    { src: '~plugins/common.js', ssr: false },
    { src: '~plugins/vant.js', ssr: false }
  ],
  
  /*
  ** Nuxt.js开发模块
  */
  buildModules: [],
  /*
  ** Nuxt.js 集成模块
  */
  modules: [
    "@nuxtjs/proxy"
  ],
  /**
   * 代理   代理有/api前缀的接口     
   */
  proxy: {
    '/Api': { 
      // 需要请求的第三方接口   
      target: BASE_URL,   
      pathRewrite: {
        // 这里重写路径，如果 api 本身不存在接口路径中，一定要写 /
        '^/api': '/',
      }
    }
  },
  /*
  ** 生成配置
  */
  build: {
    // 设置移动端  px转化为rem
    postcss: [
      require('postcss-px2rem')({
        remUnit: 37.5 // 转换基本单位
      })
    ],
    // 引入公共的样式
    styleResources:{
      less:'./assets/css/common.less'
    },
    // VantUI 定制主题配置
    loaders: {
      less: {
        javascriptEnabled: true, // 开启 Less 行内 JavaScript 支持
        modifyVars: {
          hack: `true; @import "${path.join(
            __dirname,
            './assets/css/VantUi.less'
          )}";`
        }
      }
    },
    /*
    ** 你可以在这里扩展webpack配置
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        // 添加 alias 配置
        Object.assign(config.resolve.alias, {
        'utils': path.resolve(__dirname, './utils')
        })
      }
    },
  },
  /**
   * 设置端口号
   */
  server: {
    port: 8000, // default: 3000
    host: "0.0.0.0" // default: localhost,
  }
}
