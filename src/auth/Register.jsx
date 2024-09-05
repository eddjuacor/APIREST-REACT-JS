import  { useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function Login() {
 
  const [credenciales, guardarCredenciales] = useState({});

  const registrarse = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await AppiAxios.post('/usuarios', credenciales)
      console.log(respuesta)
    } catch (error) {
      console.log(error)
    }


  };
  

  const leerDatosRegistro = (e) => {
    guardarCredenciales({
      ...credenciales,
      [e.target.name] : e.target.value
    })
   }

  

  return (
    <Container component="main" maxWidth="xs" sx={{ pt: 10}} >
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
         Registrate
        </Typography>
        <Box component="form" onSubmit={registrarse} sx={{ mt: 1 }}>
          <TextField
           /*-----------email------------*/
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="correo_electronico"
            autoComplete="email"
            autoFocus
            onChange={leerDatosRegistro}

          />
            
          <TextField
          /*-----------nombre------------*/
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="Nombre"
            name="nombre_completo"
            autoComplete="txtNombre"
            autoFocus
            onChange={leerDatosRegistro}
            
          />  

         <TextField
          /*-----------numero------------*/
            margin="normal"
            required
            fullWidth
            id="telefono"
            label="Telefono"
            name="telefono"
            autoComplete="txtTelefono"
            autoFocus
            onChange={leerDatosRegistro}
        
          />  

         <Box sx={{ display: 'flex', justifyContent: "space-between" ,  mt:1}}>
         <TextField
         /*-----------fecha de nacimiento------------*/
          
            id="date"
            autoComplete='txtFecha Nacimiento'
            type="date"
            name="fecha_nacimiento"
            onChange={leerDatosRegistro}
         /> 


         <TextField
         /*-----------Estado------------*/
          
            id="estado"
            label = "Estado"
            autoComplete='estado'
            type="numer"
            name= "idEstado"
            onChange={leerDatosRegistro}
         /> 

        <TextField
         /*-----------Rol------------*/
          
            id="rol"
            label = "Rol"
            autoComplete='rol'
            type="numer"
            name= "idRol"
            onChange={leerDatosRegistro}
         /> 

        </Box>
        

          <TextField
          /*-----------password------------*/
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={leerDatosRegistro}
           
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