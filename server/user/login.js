const express = require('express')
const { generateRandomCode } = require("../untils/captcha")
const {createToken} = require("../untils/createToken")
const {login} = require("../mysql/user")
const bcrypt = require('bcrypt');
const router = express.Router()
const jwt = require('jsonwebtoken');
let setcaptcha= ''
// 获取验证码
router.get("/captcha", async (req, res) => {
     setcaptcha = req.headers.captcha = generateRandomCode()
    res.send({code:1,setcaptcha})
})
// 登录请求
router.post("/", async (req, res) => {
    const {Username,Password,captcha} = req.body
    console.log(req.headers.captcha);
    if(captcha !== setcaptcha){
        res.send({code:0,message:"验证码有误请刷新后重新输入"})
    }else{
        const getLoginStatus = await login(Username,Password)
        const token = createToken(Username,10000);
        getLoginStatus.token = token
        res.send(getLoginStatus)
    }
})


module.exports = router

