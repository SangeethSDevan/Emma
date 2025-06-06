const express=require('express')
const userRouter=require("./Routes/userRouter");
const chatRouter=require("./Routes/chatRouter");
const askRouter=require("./Routes/askRouter")
const cors=require('cors')
const { validateUser } = require('./Middleware/auth');

const app=express();

app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:["GET","POST","DELETE","PUT"],
    credentials:true
}))

app.use(express.json())

app.use("/api/users",userRouter)
app.use("/api/chat",validateUser,chatRouter)
app.use("/api/ask",validateUser,askRouter)

app.use("/api/isalive",(req,res)=>{
    res.status(200).json({
        status:"success",
        message:"I am alive"
    })
})

module.exports=app