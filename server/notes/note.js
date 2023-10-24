const express = require('express')
const router = express.Router()
const {setnotes,getnote,delnote,modifynote} = require('../mysql/note')
// 发布文章
router.post('/setnote',async (req,res)=>{
    // console.log(req.body);
    const setdata = req.body
    // console.log(req.auth.data);
    setdata.username = req.auth.data
    // console.log(setdata);
    const data = await setnotes(setdata)
    res.send(data)
})
// 获取文章
router.get('/getnote',async (req,res)=>{
    const noteData = req.query
    noteData.username = req.auth.data
    const data = await getnote(noteData)
    // console.log(data);
    res.send(data)
})
// 删除文章
router.get('/delnote',async (req,res)=>{
    const noteId = req.query
    const data =await delnote(noteId.id)
    res.send(data)
})
// 编辑文章
router.post('/modifynote',async (req,res)=>{
        const setdata = req.body
        setdata.username = req.auth.data
        console.log(setdata);
        const data = await modifynote(setdata)
        res.send(data)
})
module.exports = router