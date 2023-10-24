// 引入express
const express = require("express")
// 跨域
const cors = require('cors')
const path = require("path")
const { varifyToken, errToken } = require('./untils/checkToken')
// 创建服务器对象
const app = express()
// 解析json 获取方便获取前端的传值
app.use(express.json());
app.use(cors())
// 跨域
app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Content-Type")
	res.header("Access-Control-Allow-Headers", "*")
	res.header("Access-Control-Allow-Methods", "*")
	res.header("Content-Type", "application/json;charset=utf-8")
	next()
})
app.use(varifyToken());
// 不需要权限访问
// 登录请求
// 后台
app.use("/login",require(path.resolve(__dirname,"./user/login")))
app.use("/user",require(path.resolve(__dirname,"./user/user")))
app.use("/note",require(path.resolve(__dirname,"./notes/note")))
// 前台
app.use('/web',require(path.resolve(__dirname,"./web/web")))
// app.post('/admin',cors(),(req,res,next)=>{
// 	console.log("111");
// 	console.log(req.auth.data);
// })
// token
// app.use(errToken)
//开启监听
app.use(errToken)
app.listen(4000, () => {
	console.log("4000端口已经启动。。。")
})