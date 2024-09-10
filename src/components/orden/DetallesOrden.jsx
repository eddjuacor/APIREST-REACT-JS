import { Box, Button, Container, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Link } from "react-router-dom"

import { useContext } from 'react';
import { ContextApi } from '../../context/ContextApi';




const DetallesOrden = () => {

  const { cartItems, usuario } = useContext(ContextApi);
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
  };

  return (
    <Container sx={{ margin: '20px' }}>
      <Link to='/inicio/carrito'>
        <Button variant="contained">Regresar a Carrito</Button>
      </Link>

      <Box sx={{ margin: '20px' }}>
        <Typography variant="h4">Detalles de la Orden</Typography>

        {/* Mostrar información del usuario */}
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="h6">Información del Usuario</Typography>
          <Typography variant="body1"><strong>Nombre:</strong> {usuario.nombre_completo || "No disponible"}</Typography>
          <Typography variant="body1"><strong>Correo:</strong> {usuario.correo_electronico || "No disponible"}</Typography>
          <Typography variant="body1"><strong>Telefono:</strong> {usuario.Telefono || "No disponible"}</Typography>
          {/* Añade más campos según sea necesario */}
        </Box>

        {/* Resumen del carrito */}
        <List sx={{ marginTop: '20px' }}>
          {cartItems.map((item) => (
            <ListItem key={item.idProductos}>
              <ListItemText
                primary={item.name} // Asegúrate de que `name` es el campo correcto para el nombre del producto
                secondary={`Cantidad: ${item.quantity} | Precio: Q${item.precio} | Total: Q${item.precio * item.quantity}`}
              />
              <Button variant="outlined" onClick={() => handleRemoveFromCart(item.id)}>
                Eliminar
              </Button>
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" sx={{ marginTop: '20px' }}>Total: Q{calculateTotal()}</Typography>

        <Button variant="contained" color="success" sx={{ marginTop: '20px' }}>
          Finalizar Compra
        </Button>
      </Box>
    </Container>
  );
};

export default DetallesOrden
