const express = require('express')
const router = express.Router()
const { webGgetNoteList, webGetNote, webGgetNoteLimit,webSearchList } = require('../mysql/note')
router.get('/notelist', async (req, res) => {
   if (req.query.currentPage) {
      const data = await webGgetNoteLimit(req.query.currentPage, req.query.pageSize)
      res.send(data)
      return
   }
   const data = await webGgetNoteList()
   res.send(data)
})
router.get('/getnote', async (req, res) => {
   //  console.log(req.query);
   const id = req.query.id
   const data = await webGetNote(id)
   res.send(data)
})
router.get('/searchList', async (req, res) => {
   const keywords = req.query.keywords
   const data = await webSearchList(keywords)
   console.log(data);
   res.send(data)
})
module.exports = router