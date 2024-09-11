import { useContext } from 'react';
import { ContextApi } from '../../context/ContextApi';
import { Typography } from '@mui/material';


const TotalCart = () => {

  const {cartItems} = useContext(ContextApi)

  //calculando el total
  const total = cartItems.reduce((acum, item) => acum + item.precio * item.cantidad, 0)

  const redondearTotal = total.toFixed(2);
 
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '1rem' }}>
      Total a Pagar: Q.{redondearTotal}
    </Typography>
  )
}

export default TotalCart
