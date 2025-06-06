const jwt=require("jsonwebtoken")

exports.validateUser=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
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
        res.status(417).json({
            staus:"fail",
            message:err.message
        })
   }
}