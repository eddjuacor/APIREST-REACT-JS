import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppiAxios from '../config/axios'

import {
  Button,
  TextField,
  Paper,
  Typography,
  Container,
  Box,
  MenuItem

} from '@mui/material';

const roles = [
  { idRol: '1', label: 'Admin' },
  { idRol: '2', label: 'Usuario' },
  // Aqui puedo agregar mas roles
];

const estados = [
  { idEstados: '1', label: 'Activo' },
  { idEstados: '2', label: 'Inactivo' },
  // aqui puedo agregar mas estados
];


export default function Register() {

  const navigate = useNavigate();

  //al momento que el cliente cree un usuario vamos a recoger estos datos y vamos a haacer la validacion

  const [formData, setFormData] = useState({
    idRol: '',
    idEstados: '',
    correo_electronico: '',
    nombre_completo: '',
    telefono: '',
    fecha_nacimiento: '',
    password: ''
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
      const respuesta = await AppiAxios.post('/usuarios', formData)
      console.log(respuesta)
      //si las credenciales son correctas ir a la pagina de inicio, nos vamos al login
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <Container component="main" maxWidth="xs" sx={{ pt: 8 }} >
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Registrate
        </Typography>
        <Box component="form" onSubmit={crearRegistro} sx={{ mt: 1 }}>
          <TextField
            /*-----------email------------*/
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
            /*-----------nombre------------*/
            label="Nombre"
            margin="normal"
            required
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            /*-----------numero------------*/
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
              /*-----------fecha de nacimiento------------*/
              label="Nacimiento"
              margin="normal"
              required
              name="fecha_nacimiento"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
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
            /*-----------password------------*/
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
        <Link to="/" underline='none'>¿Ya tienes cuenta? Inicia Sesion</Link>
      </Paper>

    </Container>
  );
}