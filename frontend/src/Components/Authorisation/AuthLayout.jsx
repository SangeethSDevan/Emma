import { Outlet } from "react-router-dom"
import Navbar from "../Others/Navbar"

const AuthLayout=()=>{
    return (
        <div className="h-[100dvh]  flex flex-col font-outfit">
            <Navbar type={"login"}/>
            <div className="flex h-full justify-center items-center">
                <Outlet/>
            </div>
        </div>
    )
}

export default AuthLayout