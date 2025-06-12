import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import api from "../../utils/api"
import { toast } from "react-toastify"
import LoadingPage from "../../Pages/LoadingPage"

const Protected=({children})=>{
    const [isAuthorized,setAuthorized]=useState(null)
    const navigate=useNavigate()
    
    useEffect(()=>{
        const checkAuth=()=>{
            api.get("/api/validate")
                .then(()=>setAuthorized(true))
                .catch((error)=>{
                    toast.error(error.response?.data?.message || "Something went wrong!")
                    setAuthorized(false)
                    navigate("/auth/signup")
                })
        }
        checkAuth()
    },[navigate])

    if(isAuthorized==null) return <LoadingPage/>

    return isAuthorized?children:null
}

export default Protected