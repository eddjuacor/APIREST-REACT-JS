import  {  useState } from 'react';
import { Link } from 'react-router-dom';
import AppiAxios from '../config/axios'
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  TextField, 
  Paper, 
  Typography, 
  Container, 
  Box, 
} from '@mui/material';

export default function Login() {
 const [credenciales, guardarCredenciales] = useState({});

 const navigate = useNavigate();


//iniciar sesion en el servidor
const iniciarSesion = async e => {
  e.preventDefault();

  try {
    const respuesta = await AppiAxios.post('/login', credenciales)
    
    //almacenar el token en localstorage
    const {accessToken} = respuesta.data;
    localStorage.setItem('accessToken', accessToken);
    

    //si las credenciales son correctas ir a la pagina de inicio
    navigate('/')
    console.log(respuesta)

  } catch (error) {
    console.log(error)
  }
}

 const leerDatos = (e) => {
  guardarCredenciales({
    ...credenciales,
    [e.target.name] : e.target.value
  })
 }



  return ( 
    <Container component="main" maxWidth="xs" sx={{ pt: 18}} >
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={iniciarSesion} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="correo_electronico"
            autoComplete="email"
            autoFocus
            onChange={leerDatos}
            
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={leerDatos}
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
        <Link to='/auth/register' underline='none'>¿No tienes cuenta? Crea Una.</Link>
      </Paper>
    </Container>
  );
}