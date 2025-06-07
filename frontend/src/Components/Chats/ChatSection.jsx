import { useContext, useState, useEffect } from "react";
import ChatScreen from "./ChatScreen";
import InputSection from "./InputSection";
import { stateContext } from "../../Pages/ChatPage";
import { toast } from "react-toastify";
import api from "../../utils/api";

const ChatSection = ({
  setChatId,
  setChat,
  setHistory,
  setChatTitle,
}) => {
  const [input, setInput] = useState("");
  const [isLoading, setLoading] = useState(false);
  const state = useContext(stateContext);
  const [title, setTitle] = useState(state.chatTitle || "");


 const onHandleBlur = () => {
    console.log("function called!");
    if (title !== state.chatTitle && !!state.chatId && !!state.chatTitle) {
        console.log("req sent");
        api.put(`/api/chat/renamechat/${state.chatTitle}?id=${state.chatId}`)
            .then((res) =>{
                toast.success(res.data.message)
                setTitle(state.chatTitle)
                setHistory()
            })
            .catch((error)=>toast.warning(error.response?.data?.message || "Rename failed"));
    }
};

  return (
    <div
      className={`p-2 rounded-t-md flex flex-col ${
        state.isEnabled ? "hidden sm:flex" : "flex"
      } w-full h-full`}
    >
      <input
        type="text"
        className="w-full text-center outline-none focus:bg-gray-200 bg-gray-50 rounded-sm"
        value={state.chatTitle}
        onChange={(e) => setChatTitle(e.target.value)}
        maxLength={40}
        onBlur={onHandleBlur}
      />
      <div className="flex flex-grow overflow-y-auto justify-start items-end">
        <ChatScreen isLoading={isLoading} />
      </div>
      <InputSection
        input={input}
        setInput={setInput}
        setChat={setChat}
        setChatId={setChatId}
        setLoading={setLoading}
      />
    </div>
  );
};

export default ChatSection;
