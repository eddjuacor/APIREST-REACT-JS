import Layout from '../layouts/Layout'
import Inicio from '../pages/Inicio'

import AuthLayout from '../layouts/AuthLayout'
import  Login  from "../auth/Login";
import Register from  "../auth/Register";
import CartElements from '../components/carrito/CartElements';
import { createBrowserRouter } from "react-router-dom";
import OrdenDetalles from '../components/orden/OrdenDetalles';
import VistaOrden from '../components/orden/VistaOrden'

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
            },
            {
                path: 'carrito', 
                element: <CartElements />
            },
            {
                path: 'vistaorden',
                element: <VistaOrden/>
            },
            {
               path: 'ordendetalles/:idOrden',
               element: <OrdenDetalles/>     
            }

        ]
    }
   
]);