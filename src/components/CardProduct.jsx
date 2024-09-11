import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import foto from '../assets/img/s21.jpg';
import { useContext } from 'react';
import { ContextApi } from '../context/ContextApi';

export default function CardProduct({ producto }) {
  // Desestructuración de producto
  const { nombre, marca, codigo, stock, precio } = producto;

  const { cartItems, setCartItems } = useContext(ContextApi);

  const addItemsCart = () => {
    // Verifica si el producto ya está en el carrito
    const existingItem = cartItems.find(item => item.codigo === codigo);

    if (existingItem) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      const updatedCartItems = cartItems.map(item =>
        item.codigo === codigo
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      // Si el producto no está en el carrito, agrégalo con cantidad 1
      setCartItems([...cartItems, { ...producto, cantidad: 1 }]);
    }
  };

  return (
    <Card sx={{ width: 345, margin: 1, border: 1 }}>
      <CardMedia
        component="img"
        image={foto}
        title={nombre}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nombre} {marca}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Codigo:# {codigo} stock: {stock}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Precio: {precio}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button size="small">Detalles</Button>
        <Button size="small" onClick={addItemsCart}>Agregar a Carrito</Button>
      </CardActions>
    </Card>
  );
}