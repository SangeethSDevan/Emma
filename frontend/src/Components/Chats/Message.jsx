import { useContext } from "react"
import ReactMarkdown from "react-markdown"
import { stateContext } from "../../Pages/ChatPage"
import api from "../../utils/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
const Message=({
    chat,
    type,
    getPins
})=>{

    const state=useContext(stateContext)
    const navigate=useNavigate()

    const onDoubleClick=()=>{
        toast.promise(
            api.post("/api/pins/pin",{
                chatId:state.chatId,
                msgId:chat._id
            }),
            {
                pending:"Your message is pinning",
                success:{
                    render({data}){
                        return data?.data?.message
                    }
                },
                error:{
                    render({data}){
                        const message=data?.response?.data?.message || "Something went wrong"
                        return message
                    }
                }
            }
        )
    }

    const onUnpin=()=>{
        api.delete("/api/pins/unpin", {
            data: {
                chatId: chat.chatId,
                msgId: chat.message._id
            }
        })
        .then((res) => toast.success(res.data.message))
        .then(()=>getPins())
        .catch((err) => toast.error(err?.response?.data?.message || "Unpin failed"));
    }

    if(type==="pin") return <div className="flex flex-col justify-start p-4 max-w-lg md:max-w-6xl bg-gray-700 rounded-md text-white mb-2.5" onDoubleClick={onUnpin}>
        <div className="bg-gray-600 p-2 rounded-sm font-mono mb-2.5" onClick={()=>navigate(`/chat/${chat.chatId}`)}>From {chat.chatTitle}</div>
        <ReactMarkdown>{chat.message.message}</ReactMarkdown>
    </div>

    return(
        chat.role=="user"?
        <div className="flex flex-row justify-end overflow-clip">
            <p className="p-3 bg-gray-600 text-white rounded-2xl max-w-80 md:max-w-md lg:max-w-2xl">{chat.message}</p>
        </div>:
        <div className="flex flex-col justify-start p-6 max-w-sm md:max-w-6xl bg-gray-100 rounded-md" onDoubleClick={onDoubleClick}>
            <ReactMarkdown>{chat.message}</ReactMarkdown>
        </div>
    )
}

export default Message