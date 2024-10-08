import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Link, useNavigate } from 'react-router-dom';
import { ContextApi } from '../context/ContextApi';
import { useContext } from 'react';

export default function Navbar() {

  const navigate = useNavigate();
  const { cerrarSesion, getIdRol } = useContext(ContextApi);

  const userRol = getIdRol();

  const handleLogout = () => {
    cerrarSesion();
    navigate('/');
  };


  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button color="inherit">
                <Link to='/inicio' style={{ textDecoration: 'none', color: 'inherit' }}>CODECAMP</Link>
              </Button>
  
              {/* Mostrar el botón de "Mis compras" si el rol no es "Operador" */}
              {userRol !== 'Operador' && (
                <Button color="inherit">
                  <Link to='/inicio/historial' style={{ textDecoration: 'none', color: 'inherit' }}>Mis compras</Link>
                </Button>
              )}
  
              {userRol !== 'Operador' && (
                <Button color="inherit">
                  <Link to='/inicio/crudproductos' style={{ textDecoration: 'none', color: 'inherit' }}>Productos</Link>
                </Button>
              )}
  
              {userRol !== 'Operador' && (
                <Button color="inherit">
                  <Link to='/inicio/crudcategorias' style={{ textDecoration: 'none', color: 'inherit' }}>Categorías</Link>
                </Button>
              )}
            </Typography>
  
            {/* Mostrar el botón de "Carrito" si el rol no es "Cliente" */}
            {userRol !== 'Cliente' && (
              <Button color="inherit">
                <Link to="/inicio/carrito" style={{ color: 'white' }}>
                  <LocalGroceryStoreIcon />
                </Link>
              </Button>
            )}
  
            {/* Mostrar el botón de "Órdenes" si el rol no es "Cliente" */}
            {userRol !== 'Cliente' && (
              <Button color="inherit">
                <Link to="/inicio/vistaorden" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Órdenes
                </Link>
              </Button>
            )}
  
            <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );

}