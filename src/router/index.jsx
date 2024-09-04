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
                element: <Inicio/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children:[
            {
                path: '/auth/login',
                element: <Login/>
            },
            {
                path: '/auth/register',
                element: <Register/>
            }
        ]
    }
   
]);