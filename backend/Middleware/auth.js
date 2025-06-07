const jwt=require("jsonwebtoken")

exports.validateUser=(req,res,next)=>{
     console.log(req.cookies)
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
        next()
   }catch(err){
          res.clearCookie("token",{
            path:"/",
            httpOnly:true,
            sameSite:"None",
            secure:true
          })
          return res.status(417).json({
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