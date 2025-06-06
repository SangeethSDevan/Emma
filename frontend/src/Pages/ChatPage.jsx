import { createContext, useEffect, useState } from "react"
import Navbar from "../Components/Others/Navbar"
import History from "../Components/History/History"
import ChatSection from "../Components/Chats/ChatSection"
import { useLocation, useParams } from "react-router-dom"
import api from "../utils/api"
import { toast } from "react-toastify"

export const stateContext=createContext()

const ChatPage = () => {
    const params = useParams()
    const location=useLocation()
    const [state,setState]=useState({
        chatId:"",
        chats:[],
        history:[],
        isEnabled:false
    })

    const setHistory=()=>{
        api.get("/api/chat/getchats")
            .then((data) => data.data.chats)
            .then((res) => setState((prev)=>({
                ...prev,
                history:res
            })))
            .catch(error=>toast.error(error.response.data.message || "Unable to fetch chats"))
    }

    const setChatId=(id)=>{
        setState((prev)=>({
            ...prev,
            chatId:id
        }))
    }

    const setChat=(role,data)=>{
        setState((prev)=>({
            ...prev,
            chats:[
                ...prev.chats,
                {
                    role:role,
                    message:data
                }
            ]
        }))
    }
    const setisEnabled=()=>{
        setState((prev)=>({
            ...prev,
            isEnabled:!prev.isEnabled
        }))
    }
    // Set chatid from URL params
    useEffect(() => {
        if (params.chatid) {
            setState((prev)=>({
                ...prev,
                chatId:params.chatid
            }))
        } else {
            setState((prev)=>({
                ...prev,
                chatId:params.chatid
            }))
        }
    }, [params.chatid])

    // Fetch chat messages when chatid changes
    useEffect(() => {
        setState((prev)=>({
            ...prev,
            chats:[]
        }))
        if (state.chatId) {
            api.post("/api/chat/fetch", { id: state.chatId })
                .then((res) =>res.data.data.history)
                .then((data)=>setState((prev)=>({
                    ...prev,
                    chats:data
                })))
                .catch((error)=>toast.error(error.response.data.message || "Something went wrong"))
        }
    }, [state.chatId])

    // Fetch chat history on route change
    useEffect(() => {
        setHistory()
    }, [state.chatId, location.pathname])

    return (
        <stateContext.Provider value={state}>
        <div className="h-screen flex flex-col flex-grow font-outfit" >
            <Navbar
                handleChange={setisEnabled}
                type={"chatScreen"}
            />
            <div className="flex flex-grow">
                <History setIsEnabled={setisEnabled} setChatId={setChatId} setHistory={setHistory}/>
                <ChatSection setChatId={setChatId} setChat={setChat}/>
            </div>
        </div>
        </stateContext.Provider>
    )
}

export default ChatPage