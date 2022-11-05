const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    open: false,
   
    // 跨域
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true
      },
      'http://api.map.baidu.com': {
        target: 'http://api.map.baidu.com',
        // pathRewrite: { '^/api': '' },
      },
      // 'http://127.0.0.1:8000/socket.io':{
      //   target:'http://127.0.0.1:8000/socket.io',
      // }
    }
  }
})
