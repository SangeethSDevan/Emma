const express=require("express")
const { loginController, signupContoller, editProfile, isUsernameTaken, logoutController} = require("../Controller/userController")
const { validateUser } = require("../Middleware/auth")

const router=express.Router()

router.post("/login",loginController)
      .post("/signup",signupContoller)
      .post("/logout",logoutController)
      .put("/edit",validateUser,editProfile)
      .get("/isusertaken",isUsernameTaken)

module.exports=router