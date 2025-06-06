import { useNavigate } from "react-router";
import HistoryCard from "./HistoryCard"
import ProfileCard from "../Others/ProfileCard"
import { useContext} from "react";
import { stateContext } from "../../Pages/ChatPage";

const History=({
    setIsEnabled,
    setChatId,
    setHistory,
    isLoading
})=>{
    const navigate=useNavigate()
    const state=useContext(stateContext)

    return (
        <div className={`p-3 flex flex-col justify-between gap-1.5 ${state.isEnabled? `sm:w-1/5 w-full`: `hidden`}`}>
            <p className="font-outfit font-bold">Chat History</p>
            <button className="bg-gray-100 p-2 rounded-2xl hover:bg-gray-200" onClick={()=>{
                navigate("/",{replace:true})
                setChatId(undefined)
                setIsEnabled((prev)=>!prev)
            }}>
                New Chat
            </button>
            <div className="flex-1 min-h-0 max-h-[80lvh] bg-gray-100 rounded-md overflow-y-auto scrollbar-hide">
                {isLoading ? (
                    <div className="w-20 flex justify-center items-center p-2">
                        <img src="/historyLoader.svg" alt="Loading" />
                    </div>
                ) : state.history.length > 0 ? (
                    state.history.map((chat) => (
                        <HistoryCard
                            title={chat.title}
                            id={chat._id}
                            history={state.history}
                            key={chat._id}
                            setIsEnabled={setIsEnabled}
                            setHistory={setHistory}
                        />
                    ))
                ) : (
                    <p className="font-bold p-5 text-xl">No recent chats</p>
                )}
            </div>
            <ProfileCard/>
        </div>
    )
}

export default History