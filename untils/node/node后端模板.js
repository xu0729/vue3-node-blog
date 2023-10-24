// 引入express
const express = require('express')
// 跨域
const cors = require('cors')
const path = require('path')
// 创建服务器对象
const app = express()
// 解析json 获取方便获取前端的传值
app.use(express.json());
app.use(cors())
// 跨域
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	// res.header('Access-Control-Allow-Headers', 'Content-Type')
	res.header('Access-Control-Allow-Headers', '*')
	res.header('Access-Control-Allow-Methods', '*')
	// res.header('Content-Type', 'application/json;charset=utf-8')
	next()
})
// 登录请求
app.use('/login',require(path.resolve(__dirname,'./user/user')))
//开启监听
app.listen(4000, () => {
	console.log('4000端口已经启动。。。')
})