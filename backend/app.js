const express=require('express')
const userRouter=require("./Routes/userRouter");
const chatRouter=require("./Routes/chatRouter");
const askRouter=require("./Routes/askRouter")
const pinRouter=require("./Routes/pinnedRouter")
const cookieParser=require("cookie-parser")
const cors=require('cors')
const { validateUser, checkAuthenticity } = require('./Middleware/auth');

const app=express();

app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:["GET","POST","DELETE","PUT"],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())

app.use("/api/users",userRouter)
app.use("/api/chat",validateUser,chatRouter)
app.use("/api/ask",validateUser,askRouter)
app.use("/api/pins/",validateUser,pinRouter)

app.use("/api/isalive",(req,res)=>{
    res.status(200).json({
        status:"success",
        message:"I am alive"
    })
})

app.get("/api/validate",validateUser,checkAuthenticity)


module.exports=app