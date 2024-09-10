import Card from '../components/CardProduct.jsx';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { ContextApi } from '../context/ContextApi';




function Inicio() {
  
  const { productos } = useContext(ContextApi);

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
