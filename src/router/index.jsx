import Layout from '../layouts/Layout'
import Inicio from '../pages/Inicio'

import AuthLayout from '../layouts/AuthLayout'
import  Login  from "../auth/Login";
import Register from  "../auth/Register";
import CartElements from '../components/carrito/CartElements';
import { createBrowserRouter } from "react-router-dom";
import OrdenDetalles from '../components/orden/OrdenDetalles';
import VistaOrden from '../components/orden/VistaOrden'
import Historial from '../components/historialCompras/Historial'
import DetallesOrden from '../components/orden/DetallesOrden';
import CrudProductos from '../components/productos/CrudProductos'
import CrudCategorias from '../components/categorias/CrudCategorias'




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
                path: 'detalleorden',
                element: <DetallesOrden/>
            },
            {
                path: 'vistaorden',
                element: <VistaOrden/>
            },
            {
               path: 'ordendetalles/:idOrden',
               element: <OrdenDetalles/>     
            },
            {
                path: 'historial',
                element: <Historial/>
            },
            {
                path: 'crudproductos',
                element: <CrudProductos/>
            },
            {
                path: 'crudcategorias',
                element: <CrudCategorias/>
            }

        ]
    }
   
]);