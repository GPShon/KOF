//  引入express
const express = require('express')
// 引入routes
const users = require('./routes/api/users');
const activity = require('./routes/api/Activity');
const fighter = require('./routes/api/Fighter');
// 引入cors解决跨域
const cors = require('cors');
// 引入jwt登录拦截
const {expressjwt: expressJWT } = require('express-jwt')
const {secretKey} = require('./utils/token')
const { Server } = require("socket.io");
const PORT = process.env.PORT || 8000

const app = express();
// 引入socketio
const server = require('http').createServer(app);
const io =new Server(server,{
  cors:{
    origin:'*'
  }
  // {
  //   origin:'http://100.2.249.89:8888'
  //   // origin:'*'
  // }
})

var userList= []
// 监听用户链接的事件
io.on('connection', (socket)=>{
    console.log('校验一下');

    
    socket.on('login',username=>{
      console.log(`${username}已登录`);
      userList.push(username)
      console.log(userList);
      io.emit('relogin', {
        msg: `用户${username}进入了聊天室`,
        code: 200,
        username:username,
        userList:userList
      });  
    })



    socket.on('send',msg=>{
      msg.msg = msg.msg.trim()
      // socket.emit('broadcast',msg)
      io.emit('resend',msg)
    })


    

    socket.on('disconnection', (username) => {
      userList = userList.filter(item => item!= username )
      console.log('删除后的数组',userList);
      io.emit('reDisconnection',{
        msg:`用户${username}离开了聊天室`,
        username : username,
        userList :userList
      })
      //userMap.delete(socket.handshake.query.username)
    })

    


})



server.listen(PORT, () =>
{
  console.log(`Server is Running on port ${PORT}`);
})





app.use(cors())
// 引用bodyParser中间件
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.use(expressJWT(
{
  secret: secretKey,
  algorithms: ['HS256'],
  credentialsRequired: false
}).unless(
{
  path: ['/api/users/register', '/api/users/login', '/api/users/refind'] //白名单,除了这里写的地址，其他的URL都需要验证
}));

// 使用routes
app.use('/api/users', users)
app.use('/api/activity', activity)
app.use('/api/fighter', fighter)


// token过期校验中间件
app.use((err, req, res, next) => {
  // console.log(req,'2');
  console.log(err.name,'3');
if (err.status === 401) {
  return res.status(err.status).json({
    msg: 'token失效',
    error: err.name + ':' + err.message
  })
}
});



const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/KOF_project"
mongoose.connect(url)
  .then(() => console.log('mongoDB connect'))
  .catch((err) => console.log(err))

app.get('/', (req, res) =>
{
  res.json('hello world')
})