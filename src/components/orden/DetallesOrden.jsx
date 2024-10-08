import React, { useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Typography, Container, Box, List, ListItem, ListItemText, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../auth/formValidation';
import { Link } from 'react-router-dom';
import { ContextApi } from '../../context/ContextApi';
import AppiAxios from '../../config/axios';

const DetallesOrden = () => {
  const { cartItems, usuario, auth } = useContext(ContextApi);

  // Obtener idUsuario desde el JWT (asumir que tienes una función para decodificar el JWT)
  const getUserIdFromToken = () => {
    // Lógica para extraer el idUsuario del JWT
    // Asegúrate de implementar esta función de acuerdo a cómo almacenas el JWT
    const token = auth.token;
    if (!token) return null;
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar JWT
    return decodedToken.idUsuarios;
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.precio * item.cantidad, 0)
      .toFixed(2);
  };

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      idUsuarios: getUserIdFromToken() || '',
      idEstados: '',
      nombre_completo: '',
      direccion: '',
      telefono: '',
      correo_electronico: '',
      fecha_entrega: '',
      total_orden: calculateTotal(),
    },
  });

  useEffect(() => {
    setValue('total_orden', calculateTotal());
  }, [cartItems, setValue]);

  const postOrdenDetalles = async (ordenDetalle) => {
    try {
      const response = await AppiAxios.post('/ordenDetalles', ordenDetalle, {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      });
      
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar los detalles de la orden:', error.response ? error.response.data : error.message);
    }
  };

  const onSubmit = async (data) => {
    const ordenDetalle = {
      idUsuarios: data.idUsuarios,
      idEstados: data.idEstados,
      fecha_creacion: new Date().toISOString().split('T')[0], 
      nombre_completo: data.nombre_completo,
      direccion: data.direccion,
      telefono: data.telefono,
      correo_electronico: data.correo_electronico,
      fecha_entrega: data.fecha_entrega,
      total_orden: data.total_orden,
      detalles: cartItems.map(item => ({
        idProductos: item.idProductos,
        cantidad: item.cantidad,
        precio: item.precio,
        subtotal: item.precio * item.cantidad
      })),
    };

    await postOrdenDetalles(ordenDetalle);
  };

  return (
    <Container maxWidth="fixed" sx={{ margin: '20px' }}>
      <Link to="/inicio/carrito">
        <Button variant="contained">Regresar a Carrito</Button>
      </Link>
      <Container>
        <Box component="section" sx={{ p: 2, border: '2px dashed grey', mt: '40px' }}>
          <Box sx={{ marginTop: '20px' }} key={usuario?.idUsuarios}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="h6" gutterBottom>
                DETALLES DE LA ORDEN
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="nombre_completo"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Nombre"
                        fullWidth
                        error={!!errors.nombre_completo}
                        helperText={errors.nombre_completo?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="direccion"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Dirección"
                        fullWidth
                        error={!!errors.direccion}
                        helperText={errors.direccion?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="telefono"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Teléfono"
                        fullWidth
                        error={!!errors.telefono}
                        helperText={errors.telefono?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="correo_electronico"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        type="email"
                        fullWidth
                        error={!!errors.correo_electronico}
                        helperText={errors.correo_electronico?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="fecha_entrega"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Fecha de Entrega"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        error={!!errors.fecha_entrega}
                        helperText={errors.fecha_entrega?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="idEstados"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="estado-select-label">Estado</InputLabel>
                        <Select
                          {...field}
                          labelId="estado-select-label"
                          label="Estado"
                        >
                          <MenuItem value={1}>Activo</MenuItem>
                          <MenuItem value={2}>Inactivo</MenuItem>
                        </Select>
                        {errors.idEstados && (
                          <Typography color="error" variant="caption">
                            {errors.idEstados.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="total_orden"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Subtotal"
                        type="number"
                        fullWidth
                        error={!!errors.total_orden}
                        helperText={errors.total_orden?.message}
                        InputProps={{ readOnly: true }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>

              <Box width="xl" sx={{ textAlign: 'center' }}>
                <List sx={{ marginTop: '20px' }}>
                  {cartItems.map((item) => (
                    <ListItem key={item.idProductos}>
                      <ListItemText
                        primary={item.nombre}
                        secondary={`Cantidad: ${item.cantidad} | Precio: Q${item.precio} | Total: Q${item.precio * item.cantidad}`}
                      />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="h6" sx={{ marginTop: '20px' }}>
                  Total: Q{calculateTotal()}
                </Typography>

                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: '20px' }}
                  type="submit"
                >
                  Enviar Orden
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default DetallesOrden;
