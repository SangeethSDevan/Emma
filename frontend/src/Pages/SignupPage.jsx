import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import api from "../utils/api"
import { toast } from "react-toastify"
import { setHistoryLocal, setUserDetails } from "../utils/helpers"

const SignupPage=()=>{

    const navigate=useNavigate()
    const [isLoading,setLoading]=useState(false)
    const [state,setState]=useState({
        uname:"",
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const [error,setError]=useState({
        name:"",
        username:"",
        email:"",
        password:""
    })

    const onHandleChange=(e)=>{
        const {name,value}=e.target
        setState((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const onFormSubmit=()=>{
        setLoading(true)
        api.post("/api/users/signup",{
            username:state.username,
            name:state.uname,
            email:state.email.toLowerCase(),
            password:state.password
        },{withCredentials:true}).then((res)=>{
            setUserDetails("user",res.data.user)
            setHistoryLocal(res.data.log)
            navigate("/")
            toast.success(res.data.message)
        }).catch(err=>{
            toast.error(err.response?.data?.message)
        }).finally(()=>setLoading(false))
    }

    const isusertaken = () => {
        api.get(`/api/users/isusertaken?username=${state.username}`)
            .then((res) => res.data)
            .then((data)=>{
                data.isTaken?setError((prev)=>({
                    ...prev,
                    username:data.message
                })):
                setError((prev)=>({
                    ...prev,
                    username:""
                }))
            })
            .catch((err) => {
                toast.warning(err.message || "Error checking username")
            });
    };

    function errorExist() {
        return !!(
            error.email || error.username || error.password || error.name ||
            !state.uname || !state.username || !state.email || !state.password
        )
    }

    return (
        <form className="flex flex-col p-5 rounded-md pl-10 pr-10 w-[400px]" onSubmit={(e)=>{
            e.preventDefault()
        }}>
            <h1 className="font-bold text-3xl">Hello,</h1>
            <h1 className="font-bold text-3xl">Welcome to <span className="text-blue-600">Emma.</span></h1>
            <br />

            <div className="flex flex-col">
                <label htmlFor="uname">your name?</label>
                <input 
                    type="text" 
                    name="uname" 
                    id="uname" 
                    placeholder="John Doe" 
                    className="pl-3 pr-3 p-1 border-3 rounded-md border-gray-300 focus:border-blue-600 outline-0"
                    onChange={onHandleChange}
                    value={state.uname}
                    onBlur={(e) => {
                        const name = e.target.value.trim();
                        const regex=/^([A-Z][a-z]{1,19}|[A-Z])(?: ([A-Z][a-z]{1,19}|[A-Z]))*$/

                        if (!name.match(regex)) {
                            setError((prev) => ({
                                ...prev,
                                name: "Enter a valid name"
                            }));
                        } else {
                            setError((prev) => ({
                                ...prev,
                                name: ""
                            }));
                        }
                    }}
                />
                <p className="text-red-600 text-sm">{error.name}</p>     
            </div>

            <div className="flex flex-col">
                <label htmlFor="username">pick a username</label>
                <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    placeholder="johnn.doe_" 
                    className="pl-3 pr-3 p-1 border-3 rounded-md border-gray-300 focus:border-blue-600 outline-0"
                    onChange={onHandleChange}
                    value={state.username}
                    onBlur={isusertaken}
                />
                <p className="text-red-600 text-sm">{error.username}</p> 
            </div>

            <div className="flex flex-col">
                <label htmlFor="email">email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="john@random.com" 
                    className="pl-3 pr-3 p-1 border-3 rounded-md border-gray-300 focus:border-blue-600 outline-0"
                    onChange={onHandleChange}
                    value={state.email}
                    onBlur={(e)=>{
                        const email=e.target.value
                        const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        if(!email.match(regex)) setError((prev)=>({
                            ...prev,
                            email:"Enter a valid email"
                        }))
                        else{
                            setError((prev)=>({
                                ...prev,
                                email:""
                            }))
                        }
                    }}
                />
                <p className="text-red-600 text-sm">{error.email}</p>     
            </div>

            <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="********" 
                    className="pl-3 pr-3 p-1 border-3 rounded-lg border-gray-300 focus:border-blue-600 outline-0"
                    onChange={onHandleChange}
                    value={state.password}
                    onBlur={(e)=>{
                        const password=e.target.value

                        if(password.length<8 || password.length>16) setError((prev)=>({
                            ...prev,
                            password:"Password must contain min. 8 and max. 16 characters"
                        }))
                        else{
                            setError((prev)=>({
                                ...prev,
                                password:""
                            }))
                        }
                    }}
                />
                <p className="text-red-600 text-sm">{error.password}</p> 
            </div>

            <p>Already a user?<Link replace={true} to={"/auth/login"}><span className="text-blue-600 active:text-red-500 underline">Login</span></Link></p>
            <br />

            <button 
                className={`bg-blue-500 pl-5 pr-5 p-2 rounded-md text-white font-bold ${errorExist()?'opacity-50 cursor-not-allowed':''}`}
                disabled={errorExist() || isLoading}
                onClick={onFormSubmit}
            >Submit</button>
            {isLoading?
                <div className="flex justify-center items-center">
                    <img src="/loader.svg" className="w-20 h-20"/>
                </div>:
                null
            }
        </form>
    )
}

export default SignupPage