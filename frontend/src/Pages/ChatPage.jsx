import { createContext, useEffect, useState } from "react"
import Navbar from "../Components/Others/Navbar"
import History from "../Components/History/History"
import ChatSection from "../Components/Chats/ChatSection"
import { useLocation, useParams } from "react-router-dom"
import api from "../utils/api"
import { toast } from "react-toastify"
import { getHistoryLocal, setHistoryLocal } from "../utils/helpers"

export const stateContext=createContext()

const ChatPage = () => {
    const params = useParams()
    const location=useLocation()
    const [isHistoryAvailable,setHistoryStatus]=useState(false)
    const [state,setState]=useState({
        chatId:"",
        chatTitle:"",
        chats:[],
        history:[],
        isEnabled:false
    })

    const setHistory=()=>{
        const localHistory=getHistoryLocal()
        setState((prev)=>({
            ...prev,
            history:localHistory
        }))
        setHistoryStatus(Array.isArray(localHistory) && localHistory.length >0)
        api.get("/api/chat/getchats")
            .then((data) => data.data.chats)
            .then((res) => {
                setHistoryLocal(res)
                setHistoryStatus(true)
                setState((prev)=>({
                ...prev,
                history:res
            }))})
            .catch(error=>{
                toast.error(error.response?.data?.message || "Unable to fetch chats")
                setHistoryStatus(false)
            })
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
                (role=="user"?
                {
                    role:role,
                    message:data,
                }:
                data
                )
            ]
        }))
    }
    const setisEnabled=()=>{
        setState((prev)=>({
            ...prev,
            isEnabled:!prev.isEnabled
        }))
    }

    const setChatTitle=(title)=>{
        setState((prev)=>({
            ...prev,
            chatTitle:title
        }))
    }

    useEffect(() => {
        if (params.chatid) {
            setState((prev)=>({
                ...prev,
                chatId:params.chatid,
                chatTitle:""
            }))
        } else {
            setState((prev)=>({
                ...prev,
                chatId:params.chatid,
                chatTitle:""
            }))
        }
    }, [params.chatid])

    useEffect(() => {
        setState((prev)=>({
            ...prev,
            chats:[],
            chatTitle:""
        }))
        if (state.chatId) {
            api.post("/api/chat/fetch", { id: state.chatId })
                .then((res) =>res.data.data)
                .then((data)=>{
                    setState((prev)=>({
                    ...prev,
                    chats:data?.history,
                    chatTitle:data?.title
                }))
            })
                .catch((error)=>toast.error(error.response?.data?.message || "Something went wrong"))
        }
    }, [state.chatId])

    useEffect(() => {
        setHistory()
    }, [state.chatId, location.pathname])

    return (
        <stateContext.Provider value={state}>
        <div className="h-[100dvh] flex flex-col flex-grow font-outfit" >
            <Navbar
                handleChange={setisEnabled}
                type={"chatScreen"}
            />
            <div className="flex flex-grow">
                <History setIsEnabled={setisEnabled} setChatId={setChatId} setHistory={setHistory} isHistoryAvailable={isHistoryAvailable} setHistoryStatus={setHistoryStatus}/>
                <ChatSection setChatId={setChatId} setChat={setChat} setChatTitle={setChatTitle} setHistory={setHistory}/>
            </div>
        </div>
        </stateContext.Provider>
    )
}

export default ChatPage