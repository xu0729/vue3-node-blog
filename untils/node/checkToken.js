const {expressjwt} = require('express-jwt')
const secret = 'xxxx'
// 验证
const varifyToken = () =>{
    return expressjwt({
        secret:secret,
        algorithms:['HS256'],//必须要加
    }).unless({
        path:[/^\/login\/*/]
    })
}
//失败处理
const errToken = (err,req,res,next) =>{
    if(err.name ==='UnauthorizedError'){
        let obj = {}
        obj.message = 'token验证失败'
        obj.code = '0'
        obj.eror = err
        res.send(obj)
    }
}
module.exports = {
    varifyToken,
    errToken
}
//放在所有请求中间件前面 不要放在跨域前 
app.use(varifyToken());
//放在所有请求中间后面 
app.use(errToken)