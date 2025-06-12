import { toast } from "react-toastify"
import api from "./api"

export const getUserDetails=()=>{
    const users=localStorage.getItem("user")

    if(users){
        const userOBJ=JSON.parse(users)
        return userOBJ
    }
}
export const setUserDetails=(key,details)=>{
    const users=localStorage.getItem(key)

    if(users){
        localStorage.removeItem(key)
    }
    localStorage.setItem(key,JSON.stringify(details))
}

export const logout=()=>{
    api.post("/api/users/logout")
        .then((res)=>res.data.message)
        .then((data)=>{
            toast.success(data)
            localStorage.removeItem("user")
            localStorage.removeItem("history")
        })
        .catch((error)=>toast.error(error.response?.message || "Something went wrong!"))

}

export const setHistoryLocal=(history)=>{
    const data=localStorage.getItem("history")
    if(data) localStorage.removeItem("history")

    localStorage.setItem("history",JSON.stringify(history))
}

export const getHistoryLocal=()=>{
    const data=localStorage.getItem("history")

    if(data) return JSON.parse(data)
    else return []
}
