import { useContext } from 'react';
import { ContextApi } from '../../context/ContextApi';
import { Button, Card, CardContent, CardMedia, Typography, CardActions } from '@mui/material';

const CartContent = () => {

  const { cartItems, removeFromCart } = useContext(ContextApi)


  return cartItems.map((producto) => {

    const handleRemove = (producto) => {
      removeFromCart(producto.idProductos);
  };

    return (
      <Card sx={{ width: 345, margin: 1, border: 1 }} key={producto.idProductos}>
        <CardMedia
          component="img"
          title={producto.nombre}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {producto.nombre}
            {producto.marca}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Codigo:# {producto.codigo}  stock: {producto.stock}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Precio: {producto.precio}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'Flex', justifyContent: 'Center' }}>
          <Button size="small">Detalles</Button>
          <Button size="small" onClick={()=> handleRemove(producto)} >Eliminar</Button>
        </CardActions>
      </Card>
    )
  })
}

export default CartContent
