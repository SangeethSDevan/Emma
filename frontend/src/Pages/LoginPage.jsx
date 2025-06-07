import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../utils/api"
import { toast } from "react-toastify"

const LoginPage=()=>{
    const navigate=useNavigate()
    const [isLoading,setLoading]=useState(false)
    const [state,setState]=useState({
        credential:"",
        password:""
    })
    
    const onHandleChange=(e)=>{
        const {name,value}=e.target
        setState((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const isComplete=()=>{
        return !!(state.credential && state.password)
    }

    const onFormSubmit=()=>{
        setLoading(true)
        api.post("/api/users/login",{
            credential:state.credential,
            password:state.password
        }).then((res)=>res.data)
          .then((data)=>{
            toast.success(`Welcome ${data.user.name}`)
            localStorage.setItem("user",JSON.stringify(data.user))
            navigate("/")
        })
          .catch((error)=>{
            toast.error(error.response.data.message || "Something went wrong")
        }).finally(()=>setLoading(false))
    }
    
    return (
        <form className="flex flex-col p-5 rounded-md pl-10 pr-10" onSubmit={(e)=>{
            e.preventDefault()
        }}>
            <h1 className="font-bold text-3xl">Hello,</h1>
            <h1 className="font-bold text-3xl">Nice to Meet <span className="text-blue-600">you again.</span></h1>
            <br />
            <div className="flex flex-col">
                <label htmlFor="credential">Username or Email</label>
                <input 
                    type="text" 
                    name="credential" 
                    id="credential" 
                    placeholder="user.name_" 
                    className="pl-3 pr-3 p-1 border-3 rounded-md border-gray-300 focus:border-blue-600 outline-0"
                    onChange={onHandleChange}
                    value={state.credential}
                />   
            </div>
            <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="********" 
                    className="pl-3 pr-3 p-1 border-3 rounded-md border-gray-300 focus:border-blue-600 outline-0"
                    onChange={onHandleChange}
                    value={state.password}
                />
            </div>
            <p>New to Emma? <Link replace={true} to={"/auth/signup"}><span className="text-blue-600 active:text-red-500 underline">Signup</span></Link></p>
            <br />
            <button className="bg-blue-500 pl-5 pr-5 p-2 rounded-md text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed" disabled={!isComplete()||isLoading} onClick={onFormSubmit}>Login</button>
            {isLoading?
                <div className="flex justify-center items-center">
                    <img src="/loader.svg" className="w-20 h-20"/>
                </div>:
                null
            }
        </form>
    )
}

export default LoginPage