const express = require('express')
const {login,getUser} = require("../mysql/user")
const router = express.Router()
let setcaptcha= ''
router.get("/",async (req,res)=>{
    // console.log("111111");
    const username = req.auth.data
    // console.log(req.auth.data);
    const user = await getUser(username)
    res.send(user)
})


module.exports = router

