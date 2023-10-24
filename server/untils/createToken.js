const jwt = require('jsonwebtoken')

// 生成token
const secret = 'xxxx' //密钥
let createToken = function(data,exp){
let obj = {}
obj.data = data?data:null
obj.type = 'express-jwt'
obj.ctime = new Date().getTime() //token创建时间
exp = exp ?exp:60*60*24  //设定过期时间
// exp = 10
let token = 'Bearer '+ jwt.sign(obj,secret,{expiresIn:exp})
return token
}

module.exports = {createToken}