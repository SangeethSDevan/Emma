import { useEffect, useState } from "react"
import api from "../utils/api"
import Message from "../Components/Chats/Message"
import Navbar from "../Components/Others/Navbar"

const PinPage = () => {
    const [pins, setPins] = useState([]);
    const [loading,setIsLoading]=useState(true)
    const getPins=()=>{
        api.get("/api/pins/getpins")
            .then((res) => res.data?.data)
            .then((pins) => setPins(pins || []))
            .then(()=>setIsLoading(false))
    }

    useEffect(() => {
        getPins()
    }, []);

    return (
        <div className="h-[100dvh] flex flex-col font-outfit">
            <Navbar type={"edit"} />
            <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-2">
                {pins.length>0?
                    pins.map((pin, index) => (
                    <Message key={index} type={"pin"} chat={pin} getPins={getPins}/>
                    )):(
                        !loading?
                        <div className="flex flex-col justify-center items-center h-[80dvh]">
                            <p>No pins exist.</p>
                            <p className="bg-gray-200 pl-4 pr-4 rounded-md">Double tap on reponses to pin it</p>
                        </div>:
                        <div className="w-full h-full justify-center items-center p-2 flex flex-col">
                            <img src="/historyLoader.svg" alt="Loading" />
                            <p className="font-outfit font-bold text-center text-blue-950">Please wait while fetching your pinned messages</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default PinPage;
