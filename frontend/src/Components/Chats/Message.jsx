import ReactMarkdown from "react-markdown"
const Message=({
    role,
    message,
})=>{
    return(
        role=="user"?
        <div className="flex flex-row justify-end">
            <p className="p-3 bg-gray-600 text-white rounded-2xl max-w-xs md:max-w-md lg:max-w-2xl">{message}</p>
        </div>:
        <div className="flex flex-col justify-start p-6 w-full max-w-6xl">
            <ReactMarkdown>{message}</ReactMarkdown>
        </div>
    )
}

export default Message