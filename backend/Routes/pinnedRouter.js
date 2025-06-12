const express=require('express')
const { pinChat, getPins, unPin } = require('../Controller/pinnedController')

const router=express.Router()

router.get("/getpins",getPins)
      .post("/pin",pinChat)
      .delete("/unpin",unPin)

module.exports=router