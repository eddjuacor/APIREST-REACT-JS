import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import foto from '../assets/img/s21.jpg'
import { useContext } from 'react';
import { ContextApi } from '../context/ContextApi';

export default function CardProduct({producto}) {

  //desestructuracion de productos, extrare valores
  const{ nombre, marca, codigo, stock, precio} = producto

  const {addToCart, cartItems, setCartItems} = useContext(ContextApi);

  const addItemsCart = (producto)=>{
    addToCart({ nombre, marca, codigo, stock, precio });
    setCartItems([
      ...cartItems,
      producto
    ])

    console.log(producto);
  }
  
  return (
    <Card sx={{ width: 345, margin: 1, border: 1}}>
      <CardMedia
        component="img"
        image={foto}
        title={nombre}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nombre}
          {marca}
        </Typography>
        <Typography variant="body2" sx={{  color: 'text.secondary' }}>
          Codigo:# {codigo}  stock: {stock}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Precio: {precio}
        </Typography>
      </CardContent>
      <CardActions sx={{display: 'Flex', justifyContent: 'Center'}}>
        <Button size="small">Detalles</Button>
        <Button size="small" onClick={()=>addItemsCart(producto)}>Agregar a Carrito</Button>
      </CardActions>
    </Card>
  );
}