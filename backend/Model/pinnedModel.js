const mongoose=require("mongoose")

const pinnedSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    pinned:[
        {
            chatId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Chats"
            },
            msgId:mongoose.Schema.Types.ObjectId
        }
    ]
})

module.exports=mongoose.model("pinned",pinnedSchema)