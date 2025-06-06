const express=require("express")
const { askEmma } = require("../Controller/askController")

const router=express.Router()

router.post("/",askEmma)

module.exports=router