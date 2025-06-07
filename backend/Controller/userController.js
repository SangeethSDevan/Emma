const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
require("dotenv").config()

const users=require("../Model/userModel")
const chat=require("../Model/chatModel")

exports.loginController= async (req,res)=>{
    const {credential,password}=req.body
    if(!credential || !password){
        return res.status(403).json({
            status:"fail",
            message:"Identify credential and password is required!"
        })
    }

    let userData;
    const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(credential.match(regex)){
        userData=await users.findOne({ email:credential })
    }else{
        userData=await users.findOne({ username:credential })
    }

    if(!userData) return res.status(400).json({
        status:"fail",
        message:"No profile exists with these credentials"
    })

    const isUser=await bcrypt.compare(password,userData.password)
    if(isUser){

        const token=jwt.sign({
            uid:userData._id,
            username:userData.username,
            email:userData.email
        },process.env.JWT_SECRET);

        res.cookie("token",token,{
            path:"/",
            httpOnly:true,
            sameSite:"None",
            secure:true
        })

        const log= await chat.find({userId: userData._id}).select('_id title').lean()

        return res.status(200).json({
            status:"sucess",
            user:{
                username:userData.username,
                name:userData.name,
                email:userData.email
            },
            token:token,
            log:log
        })
    }
    return res.status(403).json({
        status:"fail",
        message:"The password and credential doesn't match"
    })

}
exports.signupContoller=async(req,res)=>{
    const {username,name,email,password}=req.body
    //Validate user details
    if(!username || !name || !email || !password){
        return res.status(403).json({
            status:"fail",
            message:"All the fields are required"
        })
    }

    if(name.length>20){
        return res.status(403).json({
            status:"fail",
            message:"Name can't exceed 20 characters"
        })
    }
    if(password.length<8 || password.length>16) return res.status(403).json({
        status:"fail",
        message:"Password must contain min 8 and max 16 characters"
    })
    
    const data=await users.find({username})

    if(data.length>0) return res.status(403).json({
        status:"fail",
        message:"User with this username already exists"
    })

    const e=await users.find({email})
    if(e.length>0) return res.status(403).json({
        status:"fail",
        message:"User with this email already exists"
    })
    const hash=await bcrypt.hash(password,10)

    try{
        const user=await users.create({
            username:username,
            name: name,
            email:email,
            password:hash
        })

        const token=jwt.sign({
            uid:user._id,
            username:user.username,
            email:user.email
        },process.env.JWT_SECRET)

        res.cookie("token",token,{
            path:"/",
            httpOnly:true,
            sameSite:"None"
        })
        const log= await chat.find({userId: user._id}).select('_id title').lean()


        return res.status(200).json({
            status:"sucess",
            message:`Welcome ${user.name}`,
            user:{
                username:user.username,
                name:user.name,
                email:user.email,
            },
            token:token,
            log:log
        })
    }catch(err){
        return res.status(400).json({
            status:"fail",
            message:err.message
        })
    }
}
exports.editProfile = async (req, res) => {
    const { user, update } = req.body;

    const uid = user?.uid;

    if (!uid) {
        return res.status(403).json({
            status: "fail",
            message: "User ID doesn't exist"
        });
    }

    try {
        const userExist = await users.findById(uid);

        if (!userExist) {
            return res.status(404).json({
                status: "fail",
                message: "User doesn't exist"
            });
        }

        const data = await users.findOneAndUpdate(
            { _id: uid },
            update,
            { new: true }
        ).select("username name email"); 

        return res.status(200).json({
            status: "success",
            data: data
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "Something went wrong"
        });
    }
};

exports.isUsernameTaken=async(req,res)=>{
    const username=req.query?.username

    if(!username) return res.status(400).json({
        status:"fail",
        message:"username is required"
    })

    try{
        const user=await users.findOne({username:username})
        if(!user){
            res.status(200).json({
                status:"success",
                message:`${username} is available`,
                isTaken:false
            })
        }else{
            res.status(200).json({
                status:"fail",
                message:"username already taken",
                isTaken:true
            })
        }
    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        })
    }
}
exports.logoutController=(req,res)=>{
    res.clearCookie("token",{
        path:"/",
        httpOnly:true,
        sameSite:"None",
        secure:true
    })
    res.status(200).json({
        status:"success",
        message:"Logged out!"
    })
}