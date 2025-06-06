import { Link, useLocation } from "react-router-dom"

const ErrorPage=()=>{
    const location=useLocation()
    return (
        <div className="h-[100dvh]  flex flex-col font-outfit justify-center md:items-center p-3">
            <div>
                <p className="text-4xl md:text-3xl font-bold">Hi, its <span className="text-blue-600">Emma.</span></p>
                <p className="md:text-3xl  text-2xl font-bold">But the route <span className="font-mono bg-gray-200 pl-2 pr-2 rounded-md">{location.pathname}</span></p>
                <br />
                <p className="md:text-8xl text-5xl font-bold">is not <span className="text-red-500">ours!</span></p>
                <p className="md:text-2xl text-xl font-bold">Visit the <Link to={"/"} replace={true}><span className="text-blue-600 hover:text-red-600 font-mono">/Home</span></Link> route</p>
            </div>
        </div>
    )
}

export default ErrorPage