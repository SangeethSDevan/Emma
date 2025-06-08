const jwt=require("jsonwebtoken")
const users=require("../Model/userModel")

exports.validateUser=async(req,res,next)=>{
    const token=req.cookies?.token
   if(!token){
        return res.status(401).json({
            status:"fail",
            message:"Unauthorized access"
        })
   }

   try{
        req.body={
          ...req.body,
          user:jwt.verify(token,process.env.JWT_SECRET)
        }
        const id=req.body.user?.uid
        const user=await users.findOne({_id:id})
        
        if(!user) throw Error("User doesn't exist!")
        next()
   }catch(err){
          res.clearCookie("token",{
            path:"/",
            httpOnly:true,
            sameSite:"none",
            secure:true
          })
          return res.status(403).json({
            staus:"fail",
            message:err.message
        })
   }
}

exports.checkAuthenticity=(req,res)=>{
     res.status(200).json({
          status:"sucess",
     })
}