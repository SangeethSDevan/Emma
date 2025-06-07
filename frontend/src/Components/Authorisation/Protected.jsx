import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import api from "../../utils/api"
import { logout } from "../../utils/helpers"

const Protected=({children})=>{
    const [isAuthorized,setAuthorized]=useState(null)
    const navigate=useNavigate()
    
    useEffect(()=>{
        const checkAuth=()=>{
            api.get("/api/validate")
                .then(()=>setAuthorized(true))
                .catch((error)=>{
                    console.log(error)
                    setAuthorized(false)
                    logout()
                    navigate("/auth/login")
                })
        }
        checkAuth()
    },[navigate])

    if(isAuthorized==null) return <div>Loading...</div>

    return isAuthorized?children:null
}

export default Protected