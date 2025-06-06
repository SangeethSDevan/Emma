import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider}from 'react-router-dom'
import './index.css'
import AuthLayout from './Components/Authorisation/AuthLayout.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import SignupPage from './Pages/SignupPage.jsx'
import ErrorPage from './Pages/ErrorPage.jsx'
import ChatPage from './Pages/ChatPage.jsx'
import Protected from './Components/Authorisation/Protected.jsx'
import EditPage from './Pages/EditPage.jsx'
import {ToastContainer} from "react-toastify"


const router=createBrowserRouter([
  {
    path:"/",
    element:<Protected>
      <ChatPage/>
    </Protected>
  },
  {
    path:"/auth",
    element:<AuthLayout/>,
    children:[
      {
        path:"login",
        element:<LoginPage/>
      },
      {
        path:"signup",
        element:<SignupPage/>
      }
    ]
  },
  {
    path:"/chat/:chatid",
    element:<Protected>
      <ChatPage/>
    </Protected>
  },
  {
    path:"/editProfile",
    element:<Protected>
      <EditPage/>
    </Protected>
  },
  {
    path:"*",
    element:<ErrorPage/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer position='top-right' autoClose={3000} theme='light'/>
  </StrictMode>
)
