import { useContext } from 'react';
import { ContextApi } from '../../context/ContextApi';
import { Link } from 'react-router-dom';

import { Container, Typography, Button, Box } from '@mui/material';
import CardContent from '../carrito/CartContent';
import TotalCart from '../carrito/TotalCart';

const CartElements = () => {
  const { cartItems, clearCart } = useContext(ContextApi);

  const handleClearCart = () => {
    clearCart(); 
  };

  return cartItems.length > 0 ? (
    <Container maxWidth='xl' sx={{ margin: '20px' }}>
      <Box sx={{ marginBottom: '20px' }}>
        <Link to='/inicio'>
          <Button variant="contained" color="success" sx={{ marginRight: '10px' }}>
            Seguir Agregando
          </Button>
        </Link>
      </Box>
      <Container maxWidth="lg">
        <CardContent />
        <TotalCart />
        <Box sx={{ marginTop: '20px' }}>
          <Link to='/inicio/detalleOrden'>
            <Button variant="contained" color="primary">
              Comprar
            </Button>
          </Link>
          <Button variant="contained" color="error" onClick={handleClearCart}>
             Eliminar
           </Button>
        </Box>
      </Container>
    </Container>
  ) : (
    <Link to='/inicio'>
      <Typography variant='h5'>Agrega artículos a tu carrito</Typography>
    </Link>
  );
};

export default CartElements;