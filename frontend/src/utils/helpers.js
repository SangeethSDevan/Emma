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
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("history")
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
