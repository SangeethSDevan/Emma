import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import api from "../../utils/api"
import { toast } from "react-toastify"

const Protected=({children})=>{
    const [isAuthorized,setAuthorized]=useState(null)
    const navigate=useNavigate()
    
    useEffect(()=>{
        const checkAuth=()=>{
            api.get("/api/validate")
                .then(()=>setAuthorized(true))
                .catch((error)=>{
                    toast.error(error.response.data.message)
                    setAuthorized(false)
                    navigate("/auth/login")
                })
        }
        checkAuth()
    },[navigate])

    if(isAuthorized==null) return <div>Loading...</div>

    return isAuthorized?children:null
}

export default Protected