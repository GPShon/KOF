拳皇交流系统

1: 完成系统流程

## devServer 配置
devServer: {
    // host: 'localhost',
    port: 8090, //项目运行的端口号
    open: true, //配置自动启动浏览器
    proxy: {
      "/opAdmin": {
        target: "http://116.66.65.193:8081", //对应服务端的接口地址
        changeOrigin: true, // 开启跨域
        pathRewrite: {
          "^/opAdmin": "/opAdmin" //将以 /opAdmin 开头的接口重写http://116.66.65.193:8081/opAdmin ,调用时直接以 /opAdmin开头即表示调用http://116.66.65.193:8081/opAdmin
          // "^/opAdmin": "/" //将以 /opAdmin 开头的接口重写http://116.66.65.193:8081/ ,调用时直接以 /opAdmin开头即表示调用http://116.66.65.193:8081/
          // "^/opAdmin": "" //将以 /opAdmin 开头的接口重写http://116.66.65.193:8081 ,调用时直接以 /opAdmin开头即表示调用http://116.66.65.193:8081
        }
      },
      "/DoorStatus": {
        target: "http://47.99.11.102:8088", //对应服务端的接口地址
        changeOrigin: true
      }
    }
  }

## 2.注册页面及接口完成
使用element-ui 完成表单制作
使用vuex仓库和封装axios发送ajax请求,完成devServer配置
服务端完成接口配置，接收username和password参数，对username进行数据库重名校验，cors解决跨域，
分别返回200成功和400重名失败
疑问: res.status(200)出错 ,res.status(200).json(user)成功

## 3.登录页面及接口完成，token校验完成，路由守卫完成，axios拦截器完成
使用jwt和expressJWT 中间件生成token，在登录功能完成时返回到客户端并保存到本地存储
使用路由前置守卫来判断token是否存在，不存在返回登录页面
使用axios的请求拦截器，让主界面页面跳转时都携带token发送给服务端
服务端使用expressJWT进行token校验（第一次配置出现跨域问题？？可能是中间件使用错误）
第二次重新配置无法拿到req.auth，原因：路由配置在了验证前，导致无法获取users路由无法进行登录校验
使用axios响应拦截器拦截后端token失效的response信息，利用原生js重定向到登录页面，同时清除本地存储token

## 聊天室功能实现(socketIo)
1.如何开启聊天室服务器？
客户端使用vue-socket.io 服务器使用socket.io


