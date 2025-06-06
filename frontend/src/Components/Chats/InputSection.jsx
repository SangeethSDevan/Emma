import { useContext } from "react";
import api from "../../utils/api"
import { stateContext } from "../../Pages/ChatPage";
import { toast } from "react-toastify";

const InputSection = ({
    input,
    setInput,
    setChatId,
    setChat,
    setLoading
}) => {
    const state= useContext(stateContext);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        if (!state.chatId) {
            try {
                const res = await api.post("/api/chat/newchat",{
                    title:"Chat@"+ new Date().toLocaleString()
                });
                const id = res.data.chatId;
                setChatId(id);
                setChat("user", input);
                setInput("");
                const askRes = await api.post(`/api/ask/?id=${id}`, { message: input });
                setChat("model", askRes.data.response);
            } catch (err) {

            }
        } else {
            setChat("user", input);
            setInput("");
            setLoading(true)
            api.post(`/api/ask/?id=${state.chatId}`, { message: input })
                .then((res) => res.data.response)
                .then((data) => {
                    setChat("model", data);
                }).catch((err)=>toast.error(err.response.data.message || "Something went wrong"))
                .finally(()=>setLoading(false))
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