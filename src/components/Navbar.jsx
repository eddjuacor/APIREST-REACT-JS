import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ContextApi } from '../context/ContextApi'

export default function Navbar() {

  const navigate = useNavigate();

  const [auth, guardarAuth] = useContext(ContextApi);

  // si el auth es false el token se va a eliminar
  const cerrarSesion = () => {
    guardarAuth({
      accessToken: '',
      auth: false
    })

    localStorage.setItem('accessToken', '');

    //redireccionar
    navigate('/')
  }

  console.log(auth)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             CODECAMP
          </Typography>
          <Button color="inherit" onClick={cerrarSesion}>Cerrar Sesion</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}