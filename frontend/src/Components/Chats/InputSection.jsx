import { useContext } from "react";
import api from "../../utils/api"
import { stateContext } from "../../Pages/ChatPage";

const InputSection = ({
    input,
    setInput,
    setChatId,
    setChat
}) => {
    const state= useContext(stateContext);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // If no chatId, create a new chat first, then send the message
        if (!state.chatId) {
            try {
                const res = await api.post("/api/chat/newchat");
                const id = res.data.chatId;
                setChatId(id);
                setChat("user", input);
                setInput("");
                // Now send the message to the server
                const askRes = await api.post(`/api/ask/?id=${id}`, { message: input });
                setChat("model", askRes.data.response);
            } catch (err) {
                // handle error if needed
            }
        } else {
            setChat("user", input);
            setInput("");
            api.post(`/api/ask/?id=${state.chatId}`, { message: input })
                .then((res) => res.data.response)
                .then((data) => {
                    setChat("model", data);
                });
        }
    };

    return (
        <form className="flex flex-row justify-center gap-2" onSubmit={handleSend}>
            <input
                type="text"
                placeholder="Is Everything ok?"
                className="w-full sm:w-2xl md:w-3xl border-3 border-blue-600 p-2 pl-4 rounded-full"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                className="bg-blue-600 p-2 pl-4 pr-4 rounded-full font-bold text-white"
                type="submit"
                disabled={!input.trim()}
            >
                Ask?
            </button>
        </form>
    );
};

export default InputSection