import Layout from '../layouts/Layout'
import Inicio from '../pages/Inicio'

import AuthLayout from '../layouts/AuthLayout'
import  Login  from "../auth/Login";
import Register from  "../auth/Register";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children:[
            {
                index: true,
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            }
            
        ]
    },
    {
        path: '/inicio',
        element: <AuthLayout/>,
        children:[
            {
                index: true,
                element: <Inicio/>
            }
        ]
    }
   
]);