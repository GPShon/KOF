const jwt = require('jsonwebtoken');  //用来生成token

// 生成token
let secretKey="jwt"//加密的key
const createToken = content => jwt.sign(content,secretKey,{
                    expiresIn:60*60*24//token 有效期
                })

// 验证token
let verToken = function(token) {
    return new Promise((resolve, reject)=>{
        var info = jwt.verify(token.split(' ')[1],secretKey)
        resolve(info)
    })
}

module.exports = { verToken, createToken,secretKey };