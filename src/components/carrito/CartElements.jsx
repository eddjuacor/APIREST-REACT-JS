import { useContext } from 'react';
import { ContextApi } from '../../context/ContextApi';
import { Link } from 'react-router-dom'

import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CardContent from '../carrito/CartContent'
import TotalCart from '../carrito/TotalCart'

const CartElements = () => {

  const {cartItems} = useContext(ContextApi)

  return cartItems.length > 0 ?(
    <Container maxWidth='xl' sx={{ margin: '20px' }}>
      <Link to='/inicio'> <Button variant="contained" color="success">Seguir Agregando</Button></Link>
      <Container maxWidth="lg" >
        <CardContent />
        <TotalCart />
      </Container>
    </Container>
  ): (<Link to='/inicio'><Typography variant='h5'>Agrega articulos a tu carrito</Typography></Link>)
}

export default CartElements

