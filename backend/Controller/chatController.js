const chat=require("../Model/chatModel")
const user=require("../Model/userModel")

exports.fetchChat=async(req,res)=>{
    const id=req.body.id

    if(!id) return res.status(404).json({
        status:"fail",
        message:"Chat id is a required field"
    })

    try{
        const history=await chat.findById(id)

        if(!history) return res.status(404).json({
            status:"fail",
            message:"No chat exists"
        })
        
        // if(history.userId!=req.body.uid) return res.status(403).json({
        //     status:"fail",
        //     message:"ACCESS DENIED: You are acessing a chat that doesn't belong to you"
        // })
        res.status(200).json({
            status:"success",
            data:history
        })
    }catch(error){
        res.status(400).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.createChat=async(req,res)=>{
    const id=req.body?.user?.uid
    const title=req.body?.title
    if(!id) return res.status(403).json({
        status:"fail",
        message:"UserID is required field"
    })
    try{
        const data=await chat.create({
            userId:id,
            title
        })

        await user.findByIdAndUpdate(id,
            {$push:{log:data._id}}
        )

        res.status(201).json({
            status:"success",
            chatId:data._id
        })
    }catch(error){
        res.status(400).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.deleteChat=async(req,res)=>{
    const id=req.query?.id
    const userID=req.body?.user?.uid

    if(!id) return res.status(404).json({
        status:"fail",
        message:"Chat can't be deleted with ID"
    })
    if(!userID) return res.status(404).json({
        status:"fail",
        message:"You must be a valid user to delete a chat"
    })

    try{
        const data=await chat.findById(id)
        if(!data || data.userId!=userID) throw Error("Un-authorized access or data doesn't exist")

        await chat.findByIdAndDelete(id)

        await user.findByIdAndUpdate(userID,{
            $pull:{log : id}
        })

        res.status(200).json({
            status:"success",
            message:"Chat deleted!"
        })
    }catch(error){
        res.status(400).json({
            status:"fail",
            message:error.message
        })
    }
}
exports.renameChat=async(req,res)=>{
    const id=req.query.id
    const {name}=req.params
    if(!id) return res.status(404).json({
        status:"fail",
        message:"Can't rename chat without ID"
    })
    if(!name) return res.status(404).json({
        status:"fail",
        message:"A new name is required"
    })
    try{
        await chat.findByIdAndUpdate(id,{
            title:name
        })
        res.status(202).json({
            status:"success",
            message:"Chat renamed!"
        })
    }catch(error){
        res.status(400).json({
            status:"fail",
            message:error.message
        })
    }
}
exports.getChats=async(req,res)=>{
    const userId=req.body?.user?.uid
    if(!userId) return res.status(404).json({
        status:"fail",
        message:"You must be a valid user to access chats"
    })

    try{
        const chats=await chat.find({userId:userId}).sort({updatedAt:-1}).select("_id title")

        res.status(200).json({
            status:"success",
            length:chats.length,
            chats:chats
        })
    }catch(error){
        res.status(400).json({
            status:"fail",
            message:error.message
        })
    }
}