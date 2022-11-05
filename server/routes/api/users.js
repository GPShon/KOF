// @login && register
const express = require('express');
const router = express.Router();
const User = require('../../Model/User')
// const jwt = require('jsonwebtoken');  //用来生成token
const {createToken} = require('../../utils/token.js')
// 测试接口
router.get('/text',(req,res)=>{
    res.json({ok:1})
})
// 注册
router.post('/register',(req,res)=>{
    const{username,password} = req.body
    User.findOne({username})
        .then((user)=>{
            if(user) {
                return res.status(400).json({username:"用户名已存在"})
            }else{
                const newUser = new User({
                    username,
                    password,
                })
                newUser.save((err,docs)=>{
                    if(!err){
                        console.log(docs);
                    }
                })
                return res.status(200).json(newUser)
                // return res.status(200)?
            }
        })
            
})
// 登录
router.post('/login',(req, res)=>{
    User.findOne({username:req.body.username,password:req.body.password})
        .then((user)=>{
            if(user){
                let content = {name:req.body.username}// 生成token的主题信息
                const token = createToken(content);
                /* let token = jwt.sign(content,secretOrPrivateKey,{
                    expiresIn:60*60*24
                }) */

                return res.status(200).json({message:'登录成功!',username:user.username,token:token})
            }else{
                return res.status(400).json({message:'用户名或密码错误！'})
            }
        })
})
// 找回密码
router.get('/refind',(req,res)=>{
    User.findOne({username:req.query.username})
        .then((user)=>{
            if(user){
                return res.status(200).json({password:user.password})
            }else{
                return res.status(400).json({message:'用户不存在!'})
            }
        })
})
// 用户总人数
router.get('/userNum',(req,res)=>{
    User.find().then(users=>{
            return res.status(200).json({userNum:users.length})
    })
})
// 更新用户名
router.put('/update',(req,res)=>{
    
        User.findOneAndUpdate({username:req.body.username},{$set:{'username':req.body.newUsername}},{new:true})
            .then(user => {
                return res.status(200).json({newUsername:user.username,data:req.auth})
            })
       
})


module.exports = router