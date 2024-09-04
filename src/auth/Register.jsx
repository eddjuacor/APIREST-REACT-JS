import  { useState } from 'react';
import { Link } from 'react-router-dom';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [currency, setCurrency] = useState('Cliente');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (email === '') {
      setEmailError(true);
    }
    if (password === '') {
      setPasswordError(true);
    }

    if (email && password) {
      console.log('Email:', email);
      console.log('Password:', password);
      // Aquí iría la lógica para enviar los datos al servidor
    }
  };




  const currencies = [
    {
      value: 'Admin',
      label: 'Admin',
    },
    {
      value: 'Usuario',
      label: 'Usuario',
    },
    {
      value: 'Cliente',
      label: 'Cliente',
    },
  ];
  
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  

  return (
    <Container component="main" maxWidth="xs" sx={{ pt: 10}} >
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
         Registrate
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
           /*-----------email------------*/
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "El correo electrónico es requerido" : ""}
          />
            
          <TextField
          /*-----------nombre------------*/
            margin="normal"
            required
            fullWidth
            id="text"
            label="Nombre"
            name="txtNombre"
            autoComplete="txtNombre"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "El correo electrónico es requerido" : ""}
          />  

         <TextField
          /*-----------numero------------*/
            margin="normal"
            required
            fullWidth
            id="text"
            label="Telefono"
            name="txtTelefono"
            autoComplete="txtTelefono"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "El correo electrónico es requerido" : ""}
          />  

         <Box sx={{ display: 'flex', justifyContent: "space-between" ,  mt:1}}>
         <TextField
         /*-----------fecha de nacimiento------------*/
          
            id="date"
            autoComplete='txtFecha Nacimiento'
            type="date"
         /> 

         <TextField
          id="standard-select-currency"
          select
          label="Rol"
          value={currency}
          onChange={handleChange}
         >
           {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
          ))}
        </TextField>

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError ? "La contraseña es requerida" : ""}
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
        <Link to="/auth/login" underline='none'>¿Ya tienes cuenta? Inicia Sesion</Link>
      </Paper>
     
    </Container>
  );
}