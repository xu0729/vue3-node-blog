// 需要和cheackToken验证
// createToken创建token
app.use(varifyToken());
app.post('/admin',cors(),(req,res,next)=>{
	console.log(req.auth.data);
})
app.use(errToken)
const token = createToken(Username,1000);