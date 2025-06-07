import { useContext, useEffect, useRef } from "react"
import { getUserDetails } from "../../utils/helpers"
import Message from "../Chats/Message"
import { stateContext } from "../../Pages/ChatPage"


const ChatScreen=({isLoading})=>{
    const now=new Date()
    const user=getUserDetails()
    const bottomRef=useRef(null)
    const state=useContext(stateContext)

    useEffect(()=>{
        bottomRef.current?.scrollIntoView()
    },[state.chats,isLoading])

    return(
        <div className="flex flex-col p-2 space-y-2 max-h-[calc(100dvh-120px)] w-full">
            {!state.chats || state.chats.length==0?
            <>
                <p className="text-2xl sm:text-4xl font-bold text-gray-600">Good {now.getHours()<12?"Morning":"Evening"} <span className="text-black">{user.name},</span></p>
                <p className="text-3xl sm:text-6xl font-bold text-gray-400">It's me <span className="font-rightous text-black">Emma!</span></p>
                <p className="text-2xl sm:text-3xl font-bold pb-3">Your personal <span className="text-blue-700 font-bold">Nursing mentor</span> :)</p>
            </>:
            <>
                {state.chats.map((chat,id)=><Message role={chat.role} message={chat.message} key={id}/>)}
                {isLoading?
                        <div className="flex w-10 h-10 ml-3">
                                <img src="/chatLoader.svg" alt="Loading..." />
                        </div>:
                        null
                }
            </>
            
        }
        <span ref={bottomRef}></span>
        </div>
    )
}

export default ChatScreen