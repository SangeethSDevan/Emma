import { useContext, useState } from "react";
import ChatScreen from "./ChatScreen"
import InputSection from "./InputSection"
import { stateContext } from "../../Pages/ChatPage";

const ChatSection = ({setChatId,setChat}) => {
    const [input,setInput]=useState("")
    const state=useContext(stateContext)

    return (
        <div className={`p-2 rounded-t-md flex flex-col ${state.isEnabled ? "hidden sm:flex" : "flex"} w-full h-full`}>
            {/* Chat screen with scrollable height */}
            <div className="flex-grow overflow-y-auto">
                <ChatScreen/>
            </div>
            <InputSection input={input} setInput={setInput} setChat={setChat} setChatId={setChatId}/>
        </div>
    );
};



export default ChatSection
