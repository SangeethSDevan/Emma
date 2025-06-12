import { useEffect } from "react"
import { getUserDetails } from "../../utils/helpers"
import { useNavigate } from "react-router"
import { useState } from "react"

const Navbar=({
    type,
    handleChange,
})=>{
    let userOBJ=getUserDetails()
    const navigate=useNavigate()
    const [isOnline, setIsOnline]=useState(window.navigator.onLine)

    useEffect(()=>{
        window.addEventListener('online',()=>setIsOnline(true))
        window.addEventListener('offline',()=>setIsOnline(false))
    },[])

    return (
        <div className="w-full p-2 pl-5 pr-5 flex justify-between items-center font-outfit">
            <div className="flex gap-2 align-middle items-center">
                {type=='chatScreen'?
                    <button onClick={()=>{
                        handleChange()
                    }} className="p-2 rounded-full hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </button>:
                    null
                }
               <div className="flex gap-2 flex-row justify-center items-center">
                     <p className="font-rightous text-lg">Emma</p>
                     <div className={`h-2 w-2 rounded-full ${isOnline?'bg-green-600':'bg-red-600'}`}></div>
               </div>
            </div>
            {userOBJ?.name && type!='login'?
            <p  className="invisible sm:visible pr-11">Hi <span className="font-bold">{userOBJ.name}</span>!</p>:
            null}
            {type==='chatScreen'?
                <div className="flex flex-row">
                    <div className="p-2 rounded-full hover:bg-gray-200" onClick={()=>navigate("/pins",{replace:true})}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                        </svg>
                    </div>
                    <div className="p-2 rounded-full hover:bg-gray-200" onClick={()=>navigate("/editProfile",{replace:true})}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                </div>:
            null
            }
            {type==='edit'?
                <div className="p-2 rounded-full hover:bg-gray-200" onClick={()=>navigate("/",{replace:true})}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>

            </div>:
            null
            }

        </div>
    )
}

export default Navbar
