import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppiAxios from '../config/axios';
import { Button, TextField, Paper, Typography, Container, Box, MenuItem } from '@mui/material';

const roles = [
  { idRol: '2', label: 'Operador' },
  { idRol: '3', label: 'Cliente' }
];

const estados = [
  { idEstados: '1', label: 'Activo' },
  { idEstados: '2', label: 'Inactivo' }
];

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idEstados: '',
    idRol: '',
    correo_electronico: '',
    nombre_completo: '',
    password: '',
    telefono: '',
    fecha_nacimiento: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const crearRegistro = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await AppiAxios.post('/usuarios', formData);
      console.log(respuesta);
      navigate('/');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ pt: 8 }}>
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Regístrate
        </Typography>
        <Box component="form" onSubmit={crearRegistro} sx={{ mt: 1 }}>
          <TextField
            label="Email"
            margin="normal"
            required
            name="correo_electronico"
            type="email"
            value={formData.correo_electronico}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Nombre"
            margin="normal"
            required
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Teléfono"
            margin="normal"
            required
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            fullWidth
          />

          <Box sx={{ display: 'flex', justifyContent: "space-between", mt: 1 }}>
            <TextField
              label="Fecha de Nacimiento"
              margin="normal"
              required
              name="fecha_nacimiento"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              select
              label="Rol"
              margin="normal"
              required
              name="idRol"
              value={formData.idRol}
              onChange={handleChange}
              fullWidth
            >
              {roles.map((role) => (
                <MenuItem key={role.idRol} value={role.idRol}>
                  {role.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Estado"
              margin="normal"
              required
              name="idEstados"
              value={formData.idEstados}
              onChange={handleChange}
              fullWidth
            >
              {estados.map((estado) => (
                <MenuItem key={estado.idEstados} value={estado.idEstados}>
                  {estado.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <TextField
            label="Contraseña"
            margin="normal"
            required
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
        </Box>
        <Link to="/" underline='none'>¿Ya tienes cuenta? Inicia sesión</Link>
      </Paper>
    </Container>
  );
}