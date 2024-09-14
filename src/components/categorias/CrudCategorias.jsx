import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Typography, FormHelperText } from '@mui/material';
import ListaCategoriaProductos from '../categorias/ListaCategoriaProductos'
import AppiAxios from '../../config/axios';

// Definición del esquema de validación con Yup
const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es requerido'),
  idEstados: Yup.number().required('El estado es requerido').oneOf([0, 1], 'Estado inválido')
});

export default function CategoryForm() {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      nombre: '',
      idEstados: 1
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('authToken');
      await AppiAxios.post('/Categoriaproductos', data, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      reset(); // Limpiar formulario después de enviar
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };


  return (
    <Container maxWidth="">
     
      
    <Container sx={{display:'Flex'}}>
    
      <Container sx={{ alignItems:'Center'}}>
      <Typography variant="h4" gutterBottom>
        Crear Categoría de Productos
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="nombre"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.nombre}
              helperText={errors.nombre ? errors.nombre.message : ''}
            />
          )}
        />
        <FormControl fullWidth margin="normal" error={!!errors.idEstados}>
          <InputLabel id="estado-label">Estado</InputLabel>
          <Controller
            name="idEstados"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="estado-label"
                label="Estado"
              >
                <MenuItem value={1}>Activo</MenuItem>
                <MenuItem value={2}>Inactivo</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{errors.idEstados ? errors.idEstados.message : ''}</FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Crear Categoría
        </Button>
      </form>
      </Container>      
      <Container>
        <ListaCategoriaProductos/>
      </Container>      

      </Container> 
    </Container>
  );
}
