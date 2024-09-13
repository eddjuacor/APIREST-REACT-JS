import { useEffect, useState } from 'react'
import AppiAxios from '../../config/axios'; // Ajusta la ruta según tu proyecto


const OrdenesPorUsuario = () => {
    const [orden, setOrden]= useState([])

    useEffect(()=>{
      AppiAxios.get('/ordenDetalles').then((response)=>{
        setOrden(response.data)
        console.log(response.data)
      })
    },[])

    if(!orden) return null;
};

export default OrdenesPorUsuario;