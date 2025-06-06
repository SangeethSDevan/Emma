const express=require("express")
const { loginController, signupContoller, editProfile, isUsernameTaken} = require("../Controller/userController")
const { validateUser } = require("../Middleware/auth")

const router=express.Router()

router.post("/login",loginController)
      .post("/signup",signupContoller)
      .put("/edit",validateUser,editProfile)
      .get("/isusertaken",isUsernameTaken)

module.exports=router