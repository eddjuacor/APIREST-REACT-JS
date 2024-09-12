import { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formValidation } from './formValidation';
import { Link, useNavigate } from 'react-router-dom';
import AppiAxios from '../config/axios';
import { ContextApi } from '../context/ContextApi';
import { Button, TextField, Paper, Typography, Container, Box } from '@mui/material';

export default function Login() {
  // Configura react-hook-form con yup
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(formValidation),
  });

  // Configuración para redirección
  const navigate = useNavigate();

  // Aut y token desde el context
  const {auth, guardarAuth} = useContext(ContextApi);

  // Función para iniciar sesión en el servidor
  const iniciarSesion = async (data) => {
    console.log(data)
    try {
      const respuesta = await AppiAxios.post('/login', data);

      console.log(respuesta)
      
      // Almacenar el token en localStorage
      const { accessToken } = respuesta.data;
      localStorage.setItem('authToken', accessToken);

      guardarAuth({
        accessToken,
        auth: true,
      });

      // Redirigir a la página de inicio
      navigate('/inicio');
      console.log(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ pt: 18 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit(iniciarSesion)} sx={{ mt: 1 }}>
          <Controller
            name="correo_electronico"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Correo Electrónico"
                variant="outlined"
                fullWidth
                error={Boolean(errors.correo_electronico)}
                helperText={errors.correo_electronico?.message}
                margin="normal"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                margin="normal"
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>
        </Box>
        <Link to="/register" underline="none">
          ¿No tienes cuenta? Crea Una.
        </Link>
      </Paper>
    </Container>
  );
}