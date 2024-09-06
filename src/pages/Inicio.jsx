import { useContext, useEffect, useState } from 'react'
import AppiAxios from '../config/axios.js'
import Card from '../components/CardProduct.jsx';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ContextApi } from '../context/ContextApi'


function Inicio() {

  const navigate = useNavigate();

  //trabajar con el state, guardarProductos solo va a guardar el state
  const [productos, guardarProductos] = useState([]);

  //utilizar los valores que pusimos en el context
  const [auth, guardarAuth] = useContext(ContextApi);

  //aqui realizo la consulta a la api
  useEffect(() => {

    //leer token desde el local storage
    const token = localStorage.getItem('authToken') || auth.accessToken;

    //confirmar si hay token
    if (token) {
      const consultarApi = async () => {

       try {
        const productosConsulta = await AppiAxios.get('/productos', {
          headers: {
            authorization: token
          }
        });

        //guardo en el estado lo que me traer la consulta a la api
        guardarProductos(productosConsulta.data)

       } catch (error) {
        //error con la autorizacion
        if(error.response.status == 500){
          navigate('/')  
        }
       }
      }
      consultarApi();
    }else{
      navigate('/inicio')
    }

  }, [])

  return (

    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'Center', mt: 4 }}>
      {productos.map(producto => (
        <Card
          //recibir los valores como prop
          producto={producto}
          key={producto.idProductos}
        />
      ))}
    </Box>

  )
}

export default Inicio
