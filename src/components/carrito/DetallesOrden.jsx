import { Box, Button } from "@mui/material"
import { Link } from "react-router-dom"


const DetallesOrden = () => {
  return (
    <Box sx={{margin: '20px'}}>
        <Link to = '/inicio/carrito'><Button variant="contained">Regrasar a Carrito</Button></Link>
        <h1>Detalles de la Orden</h1>
 
    </Box>
  )
}

export default DetallesOrden
