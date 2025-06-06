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
}