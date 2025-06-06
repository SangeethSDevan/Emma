const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true, "Username is a required field"],
        unique:true,
    },
    name:{
        type:String,
        required:[true, "Name is a required field"],
        maxlength:20,
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email is a required field"]
    },
    password:{
        type:String,
        required:[true, "Password is a required field"],
        minlength:8,
    },
    mode:{
        type:String,
        enum:['Dark','White','System'],
        default:'System'
    },
    log:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Messages"
        }
    ]
})

module.exports=mongoose.model("Users",userSchema)