const express=require("express")
const { getChats, createChat, deleteChat, renameChat, fetchChat } = require("../Controller/chatController")

const router=express.Router()

router.post("/fetch",fetchChat)
      .post("/newchat",createChat)
      .delete("/deletechat",deleteChat)
      .put("/renamechat/:name",renameChat)
      .get("/getchats",getChats)


module.exports=router