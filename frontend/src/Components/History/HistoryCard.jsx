import { useNavigate } from "react-router-dom"
import api from "../../utils/api"
import { toast } from "react-toastify"

const HistoryCard=({
    title,
    id,
    setIsEnabled,
    setHistory
})=>{
    const navigate=useNavigate()
    return(
        <div className="p-2 pl-3 pr-3 m-2 bg-white rounded-lg flex justify-between items-center hover:bg-gray-200" onClick={()=>{
            navigate(`/chat/${id}`)
            setIsEnabled((prev)=>!prev)
            }}>
            <p>{title}</p>
            <button className="hover:bg-gray-100 p-1.5 h-8 w-8 rounded-full" onClick={(e)=>{
                e.stopPropagation()
                api.delete(`/api/chat/deletechat?id=${id}`)
                .then((res)=>toast.success(res.data.message))
                .then(()=>{
                    setHistory()
                })
                .catch(error=>toast.error(error.response?.data?.message || "Something went wrong"))
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-5" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>

        </div>
    )
}

export default HistoryCard