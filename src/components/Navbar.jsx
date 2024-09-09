
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';


import { Link, useNavigate } from 'react-router-dom';
import { ContextApi } from '../context/ContextApi';
import {useContext} from 'react'


export default function Navbar() {

  const navigate = useNavigate();

  const { cerrarSesion, userRol } = useContext(ContextApi);

  const handleLogout = () => {
    cerrarSesion();
    navigate('/')
};


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             CODECAMP
          </Typography>
          <Link to="/inicio/carrito" style={{ textDecoration: 'none' }}><LocalGroceryStoreIcon/> </Link>
          {userRol === 'Operador' && (
            <Link to="/ordenes" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">
                Órdenes
              </Button>
            </Link>
          )}
          <Button color="inherit" onClick={handleLogout}>Cerrar Sesion</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}