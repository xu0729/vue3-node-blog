const {expressjwt} = require('express-jwt')
const secret = 'xxxx'
// 验证
const varifyToken = () =>{
    return expressjwt({
        secret:secret,
        algorithms:['HS256'],//必须要加
    }).unless({
        path:[/^\/login\/*/,/^\/web\/*/]
        // path:[/^http:\/\/127.0.0.1:5000\/api\/*/]
    })
}
//失败处理
const errToken = async(err,req,res,next) =>{
    // console.log(err.name ==='UnauthorizedError');
    if(err.name ==='UnauthorizedError'){
        let obj = {}
        obj.message = 'token验证失败'
        obj.code = '600'
        obj.eror = err
        // console.log(obj);
        // res.status(401).json(obj);
        console.log(err);
        res.send({code:"600",message:obj.message})
        // res.status(500).send('Something broke!');
    }
}
module.exports = {
    varifyToken,
    errToken
}