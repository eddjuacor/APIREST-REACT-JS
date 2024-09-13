import { useContext } from 'react';
import { ContextApi } from '../../context/ContextApi';
import { Button, Card, CardContent, CardMedia, Typography, CardActions } from '@mui/material';

const CartContent = () => {
  const { cartItems, setCartItems } = useContext(ContextApi);

   // Maneja la adicion de productos al carrito
   const handleAgregar = (producto) => {
    const existingItem = cartItems.find(item => item.idProductos === producto.idProductos);

    if (existingItem) {
      // Si el producto ya esta en el carrito, incrementa la cantidad
      const updatedCartItems = cartItems.map(item =>
        item.idProductos === producto.idProductos
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      // Si el producto no esta en el carrito, agragalo con cantidad 1
      setCartItems([...cartItems, { ...producto, cantidad: 1 }]);
    }
  };

  const handleRemove = (producto) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.idProductos === producto.idProductos) {
        // Reduce la cantidad si es mayor a 1
        if (item.cantidad > 1) {
          return { ...item, cantidad: item.cantidad - 1 };
        } else {
          // Elimina el producto si la cantidad llega a 0
          return null;
        }
      }
      return item;
    }).filter(item => item !== null); // Filtra los productos nulos (eliminados)
    setCartItems(updatedCartItems);
  };

  return cartItems.map((producto) => (
    <Card sx={{ width: 345, margin: 1, border: 1 }} key={producto.idProductos}>
      <CardMedia
        component="img"
        src={producto.imagen || 'default-image-url'} // Asegúrate de que la imagen esté disponible
        title={producto.nombre}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {producto.nombre} {producto.marca}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Codigo:# {producto.codigo} stock: {producto.stock}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Precio: {producto.precio}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Cantidad: {producto.cantidad}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button size="small" onClick={()=>handleAgregar(producto)}>Agregar</Button>
        <Button size="small" onClick={() => handleRemove(producto)}>Eliminar</Button>
      </CardActions>
    </Card>
  ));
}

export default CartContent;