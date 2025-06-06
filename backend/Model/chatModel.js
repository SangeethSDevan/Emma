const mongoose=require('mongoose')

const chatSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"UserID is required field"]
    },
    title:{ 
        type:String,
        default:`NewChat@${new Date().toLocaleString()}`
    },
    history:[
        {
            role:{
                type:String,
                enum:['model','user']
            },
            message:String,
            timeStamp:{
                type:Date,
                default:Date.now
            }
        }
    ]
}, { timestamps: true })

module.exports=mongoose.model('chats',chatSchema)