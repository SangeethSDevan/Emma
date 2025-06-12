import { getUserDetails, setUserDetails } from "../utils/helpers"
import Navbar from "../Components/Others/Navbar"
import { useState } from "react"
import api from "../utils/api"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

const EditPage=()=>{
    const navigate=useNavigate()
    const user=getUserDetails()
    const [state,setState]=useState({
        username:user.username,
        name:user.name
    })
    const [isUserTaken,setUserTaken]=useState(false)
    const onHandleSubmit=(e)=>{
        e.preventDefault()
        toast.promise(
            api.put("/api/users/edit",{
                update:state
            }).then((res)=>res.data.data)
            .then((data)=>{
                setUserDetails("user",{
                    email:data.email,
                    username:data.username,
                    name:data.name
                })
            navigate("/",{replace:true})
          }),{
            pending:"Updating profile",
            success:"Profile update successfully",
            error:{
                render({data}){
                    const message=data?.response?.data?.message || "Something went wrong"
                    return message
                }
            }
          }
        )
    }
    const onHandleChange=(e)=>{
        const {name,value}=e.target
        setState((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const isusertaken = () => {
        if (state.username === user.username) {
            setUserTaken(false);
            return;
        }

        api.get(`/api/users/isusertaken?username=${state.username}`)
            .then((res) => setUserTaken(res.data.isTaken))
            .catch((err) => {
                toast.error(err.response?.data?.message ||"Error checking username");
                setUserTaken(true);
            });
    };

    const errorExist=()=>{
        return !!(!state.username || isUserTaken || !state.name)
    }
    return(
        <div  className="h-[100dvh] flex flex-col flex-grow font-outfit items-center">
            <Navbar type={'edit'}/>
            <form className="flex flex-col justify-center h-full items-center">
                <p className="text-xl p-2 font-bold text-gray-500">Hello, You can edit your profile here</p>
                <div className="p-4 rounded-sm">
                    <label htmlFor="name" className=" italic">name : </label>
                    <br />
                    <input 
                        type="text" 
                        value={state.name} 
                        id="name" 
                        name="name" 
                        className="border-1 rounded-sm pl-2 border-gray-400 w-80 md:w-2xl h-10"
                        onChange={onHandleChange}
                    />
                </div>
                <div className="p-4 rounded-sm">   
                    <label htmlFor="email" className="italic">email (non-modifiable) : </label>
                    <br />
                    <input 
                        type="text" 
                        value={user.email} 
                        id="email"
                        name="email" 
                        disabled={true} 
                        className="disabled:opacity-50 cursor-not-allowed border-2 rounded-sm pl-2 border-gray-400 w-80 md:w-2xl h-10"
                    />
                </div>
                <div className="p-4 rounded-sm">
                    <label htmlFor="username" className="italic">username : </label>
                    <br />
                    <input 
                        type="text" 
                        value={state.username} 
                        id="username" 
                        name="username" 
                        className="border-2 rounded-sm pl-2 border-gray-400 w-80 md:w-2xl h-10"
                        onChange={onHandleChange}
                        onBlur={isusertaken}
                    />
                </div>
                <div className="flex items-end flex-col w-full gap-1 mt-1">
                    <button 
                        className="p-2 pl-4 pr-4 bg-blue-500 rounded-sm font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed" 
                        onClick={onHandleSubmit} 
                        disabled={errorExist()}
                    >Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditPage