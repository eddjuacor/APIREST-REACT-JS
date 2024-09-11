import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../auth/formValidation";

import { Link } from "react-router-dom";

import { useContext } from "react";
import { ContextApi } from "../../context/ContextApi";

const DetallesOrden = () => {

//context
const { cartItems, usuario, setUsuario } = useContext(ContextApi); 
console.log(usuario)


const calculateTotal = () => {
  return cartItems
    .reduce((total, item) => total + item.precio * item.cantidad, 0)
    .toFixed(2);
};

 // Configuración del formulario
 const {
  control,
  handleSubmit,
  formState: { errors },
  setValue,
} = useForm({
  resolver: yupResolver(schema),
  defaultValues: {
    nombre_completo: "",
    direccion: "",
    telefono: "",
    correo_electronico: "",
    fecha_entrega: "",
    total_orden: calculateTotal(), // Inicializa con el valor calculado
  },
});

  // Actualizar valores del formulario cuando cambie el usuario
  useEffect(() => {
    if (usuario) {
      setValue("nombre_completo", usuario.nombre_completo || "");
      setValue("direccion", usuario.direccion || "");
      setValue("telefono", usuario.telefono || "");
      setValue("correo_electronico", usuario.correo_electronico || "");
    }
  }, [usuario, setValue]);


  // Efecto para actualizar el valor del total cuando cambie el carrito
  useEffect(() => {
    setValue("total_orden", calculateTotal());
  }, [cartItems, setValue]);


  const onSubmit = (data) => {
    console.log(data);
  };


  return (
    
    <Container  maxWidth="fixed" sx={{ margin: "20px" }}>
      <Link to="/inicio/carrito">
        <Button variant="contained">Regresar a Carrito</Button>
      </Link>
      <Container>
        <Box  component="section" sx={{ p: 2, border: '2px dashed grey', mt:'40px' }}>
          <Box sx={{ marginTop: "20px" }} key={usuario.idUsuarios}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="h6" gutterBottom>
               DETALLES DE LA ORDEN
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="nombre_completo"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Nombre"
                        fullWidth
                        error={!!errors.nombre}
                        helperText={errors.nombre?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="direccion"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Dirección"
                        fullWidth
                        error={!!errors.direccion}
                        helperText={errors.direccion?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="telefono"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Teléfono"
                        fullWidth
                        error={!!errors.telefono}
                        helperText={errors.telefono?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="correo_electronico"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        type="email"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="fecha_entrega"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Fecha de Entrega"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        error={!!errors.fechaEntrega}
                        helperText={errors.fechaEntrega?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="total_orden"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Subtotal"
                        type="number"
                        fullWidth
                        error={!!errors.subtotal}
                        helperText={errors.subtotal?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </form>
          </Box>

          <Box width='xl' sx={{textAlign:'Center'}}>
            <List sx={{ marginTop: "20px" }}>
              {cartItems.map((item) => (
                <ListItem key={item.idProductos}>
                  <ListItemText
                    primary={item.nombre}
                    secondary={`Cantidad: ${item.cantidad} | Precio: Q${
                      item.precio
                    } | Total: Q${item.precio * item.cantidad}`}
                  />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6" sx={{ marginTop: "20px" }}>
              Total: Q{calculateTotal()}
            </Typography>

            <Button
              variant="contained"
              color="success"
              sx={{ marginTop: "20px" }}
            >
              Realizar Compra
            </Button>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default DetallesOrden;
