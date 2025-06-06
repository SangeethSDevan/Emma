import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const Protected=({children})=>{
    const [isAuthorized,setAuthorized]=useState(null)
    const navigate=useNavigate()
    
    useEffect(()=>{
        const checkAuth=()=>{
            const token=localStorage.getItem("token")

            if(!token) {
                setAuthorized(false)
                navigate("/auth/login")
            }
            else setAuthorized(true)
        }

        checkAuth()
        const interval=setInterval(checkAuth,2000)

        return ()=> clearInterval(interval)
    },[navigate])

    if(isAuthorized==null) return <div>Loading...</div>

    return isAuthorized?children:null
}

export default Protected