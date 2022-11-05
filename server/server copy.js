//  引入express
const express = require('express')
const app = express();
// 引入routes
const users = require('./routes/api/users');
// 引入jwt登录拦截
const {expressjwt: expressJWT } = require('express-jwt')



const PORT = process.env.PORT || 8000
// 引入cors解决跨域
const cors = require('cors');
app.use(cors())
// 引用bodyParser中间件
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


const {secretKey} = require('./utils/token')
app.use(expressJWT(
{
  secret: secretKey,
  algorithms: ['HS256'],
  credentialsRequired: false
}).unless(
{
  path: ['/api/users/register', '/api/users/login', '/api/users/refind'] //白名单,除了这里写的地址，其他的URL都需要验证
}));


/* const {verToken} = require('./utils/token.js')

app.use(function(req,res,next){
    console.log(req.headers);
    var token = req.headers['authorization']
    console.log(token);
    if(token==undefined){
        return next()
    }else{
        verToken(token).then(data=>{
            console.log(data);
            req.data =data;
            return next()
        }).catch(err=>{
            return next()
        })
    }
}) */


// 使用routes
app.use('/api/users', users)


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

app.listen(PORT, () =>
{
  console.log(`Server is Running on port ${PORT}`);
})

const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/KOF_project"
mongoose.connect(url)
  .then(() => console.log('mongoDB connect'))
  .catch((err) => console.log(err))

app.get('/', (req, res) =>
{
  res.json('hello world')
})