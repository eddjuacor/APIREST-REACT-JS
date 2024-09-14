import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import AppiAxios from '../../config/axios.js';
import { useNavigate } from 'react-router-dom';


const ProductForm = () => {
  const [product, setProduct] = useState({
    idCategoriaProductos: '',
    idUsuarios: '',
    nombre: '',
    marca: '',
    codigo: '',
    stock: '',
    idEstados: '',
    precio: '',
  });
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData();
      formData.append('idCategoriaProductos', product.idCategoriaProductos);
      formData.append('idUsuarios', product.idUsuarios);
      formData.append('nombre', product.nombre);
      formData.append('marca', product.marca);
      formData.append('codigo', product.codigo);
      formData.append('stock', product.stock);
      formData.append('idEstados', product.idEstados);
      formData.append('precio', product.precio);
      if (foto) {
        formData.append('foto', foto);
      }
      const token = localStorage.getItem('authToken');
      await AppiAxios.post('/productos', formData, {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      });
      navigate('/inicio'); // Redirige a la lista de productos después de agregar uno nuevo
    } catch (err) {
      console.error(err);
      setError('Error al agregar el producto. Inténtalo de nuevo.');
    }
  };

  return (
    <Container maxWidth='sx'>
      <Typography variant="h4" gutterBottom>
        Agregar Producto
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Categoría"
          name="idCategoriaProductos"
          value={product.idCategoriaProductos}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />
        <TextField
          label="Usuario"
          name="idUsuarios"
          value={product.idUsuarios}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />
        <TextField
          label="Nombre"
          name="nombre"
          value={product.nombre}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Marca"
          name="marca"
          value={product.marca}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Código"
          name="codigo"
          value={product.codigo}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Stock"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />
        <TextField
          label="Estado"
          name="idEstados"
          value={product.idEstados}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />
        <TextField
          label="Precio"
          name="precio"
          value={product.precio}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          step="0.01"
          required
        />
        <input
          type="file"
          name="foto"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Agregar Producto
        </Button>
      </form>
    </Container>
  );
};

export default ProductForm;