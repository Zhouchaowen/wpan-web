'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = {//打包文件大小配置
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '' : '',// 基本路径
  outputDir: "dist",// 输出目录
  assetsDir: "static",// 静态资源目录(js css img)
  chainWebpack: (config) => {
    config.resolve.alias
          .set('@',resolve('src'))
  },
  devServer: {
    // 本地ip地址
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    /* 使用代理 */
    proxy: {
      '/api': {
        /* 目标代理服务器地址 */
        target: 'http://192.168.31.159:8080',
        /* 允许跨域 */
        changeOrigin: true,
        secure: false,
        // ws: true,
        pathRewrite: {
            '^/api': '/static/mock'   // 请求数据路径别名,这里是注意将static/mock放入public文件夹
        }
      }
    }
  }
}
