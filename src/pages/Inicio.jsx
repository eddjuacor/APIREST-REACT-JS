import { useEffect, useState } from 'react'
import AppiAxios from '../config/axios.js'
import  Card  from '../components/CardProduct.jsx';
import { Box } from '@mui/material';



function Inicio () {

  //trabajar con el state, guardarProductos solo va a guardar el state
  const [productos, guardarProductos] = useState([]);

  //aqui realizo la consulta a la api
  const consultarApi = async () => {
    

    

    const productosConsulta = await AppiAxios.get('/productos', {
      headers:{
        authorization:``
      }
    })
    
    //guardo en el estado lo que me traer la consulta a la api
    guardarProductos(productosConsulta.data)
  }
  
  //se efect para que se carge la consulta a la api
  useEffect(()=>{
    consultarApi();
  },[])

  return (
  
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'Center', mt: 4}}>
        {productos.map(producto => (
          <Card
          //recibir los valores como prop
            producto = {producto}
            key={producto.idProductos}
          />
        ))}
      </Box>
 
  )
}

export default Inicio
