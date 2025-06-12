const pinned=require("../Model/pinnedModel")
const chat=require("../Model/chatModel")

exports.getPins = async (req, res) => {
    const uid = req?.user?.uid;

    if (!uid) {
        return res.status(403).json({
            status: "fail",
            message: "User id can't be empty"
        });
    }

    try {
        const pins = await pinned.findOne({ userId: uid });

        if (!pins || pins.pinned.length === 0) {
            return res.status(200).json({
                status: "success",
                data: []
            });
        }

        const messages = await Promise.all(
            pins.pinned.map(async ({ chatId, msgId }) => {
                const result = await chat.aggregate([
                    { $match: { _id: chatId } },
                    {
                        $project: {
                            title:1,
                            history: {
                                $filter: {
                                    input: "$history",
                                    as: "msg",
                                    cond: { $eq: ["$$msg._id", msgId] }
                                }
                            }
                        }
                    }
                ]);
                if (!result[0] || result[0].history.length === 0) return null;

                return {
                    chatId,
                    chatTitle: result[0].title,
                    message: result[0].history[0]
                };

            })
        );
        const filteredMessages = messages.filter(msg => msg !== null);

        res.status(200).json({
            status: "success",
            data: filteredMessages
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error?.message || "Something went wrong!"
        });
    }
};


exports.pinChat=async(req,res)=>{
    const chatId=req.body?.chatId
    const msgId=req.body?.msgId

    const uid=req?.user?.uid

    if(!chatId || !msgId) return res.status(403).json({
        status:"fail",
        message:"messageID and chatID can't be empty"
    })

    try{
        await pinned.findOneAndUpdate({userId:uid},{
            $push:{
                pinned:{
                    chatId:chatId,
                    msgId:msgId
                }
            }
            },{new:true, upsert:true}
        )

        res.status(200).json({
            status:"success",
            message:"Chat successfully pinned"
        })
    }catch(error){
        res.status(500).json({
            status:"fail",
            message:error?.message || "Something went wrong"
        })
    }
}
exports.unPin=async(req,res)=>{
    const { chatId, msgId } = req.body;
  const uid = req?.user?.uid;

  if (!chatId || !msgId) {
    return res.status(403).json({
      status: "fail",
      message: "chatId and msgId are required"
    });
  }

  try {
    const result = await pinned.findOneAndUpdate(
      { userId: uid },
      {
        $pull: {
          pinned: {
            chatId: chatId,
            msgId: msgId
          }
        }
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({
        status: "fail",
        message: "User not found or nothing to unpin"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Chat message unpinned successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error?.message || "Something went wrong"
    });
  }
}