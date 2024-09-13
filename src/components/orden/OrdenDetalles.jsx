import { useEffect, useState } from 'react';
import { Typography, Paper, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import AppiAxios from '../../config/axios'; // Ajusta la ruta según tu proyecto

const OrdenDetalles = () => {
  const { idOrden } = useParams();
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrdenDetalles = async () => {
      try {
        const response = await AppiAxios.get(`/ordenDetalles/${idOrden}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        // Verificar la estructura de la respuesta
        console.log('Detalles recibidos:', response.data);

        // Intentar combinar y limpiar los datos JSON
        let combinedJson = '';

        // Si la respuesta contiene un array de objetos con fragmentos JSON
        if (Array.isArray(response.data)) {
          combinedJson = response.data.map(item => item['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']).join('');
        } else {
          throw new Error('Los datos no están en el formato esperado.');
        }

        // Analizar la cadena JSON
        const data = JSON.parse(combinedJson);
        console.log(data)

        // Verificar si los datos son un objeto
        if (data && typeof data === 'object') {
          setOrden(data);
        } else {
          throw new Error('Datos no están en formato de objeto.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenDetalles();
  }, [idOrden]);

  // Función para marcar la orden como entregada
  const handleEntregar = async () => {
    try {
      await AppiAxios.put(`/ordenDetalles/${idOrden}/entregar`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      navigate('/inicio/vistaorden'); // Navegar a la vista de órdenes después de actualizar
    } catch (err) {
      setError(err.message); // Manejar errores
    }
  };

  // Función para rechazar la orden
  const handleRechazar = async () => {
    try {
      await AppiAxios.put(`/ordenDetalles/${idOrden}/rechazar`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      navigate('/inicio/vistaorden'); // Navegar a la vista de órdenes después de actualizar
    } catch (err) {
      setError(err.message); // Manejar errores
    }
  };

  if (loading) return <CircularProgress />; // Indicador de carga
  if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>; // Mostrar errores

  return (
    <Paper sx={{ padding: '20px', margin: '20px' }}>
      <Button variant="contained" color="secondary" onClick={() => navigate('/inicio/vistaorden') } sx={{mb:'25px'}} >
        Volver a Ordenes
      </Button>
      <Typography variant="h4">Detalles de la Orden {orden.idOrden}</Typography>
      <Typography variant="h6">Fecha de Creación: {orden.fecha_creacion}</Typography>
      <Typography variant="h6">Nombre Completo: {orden.nombre_completo}</Typography>
      <Typography variant="h6">Dirección: {orden.direccion}</Typography>
      <Typography variant="h6">Teléfono: {orden.telefono}</Typography>
      <Typography variant="h6">Correo: {orden.correo_electronico}</Typography>
      <Typography variant="h6">Fecha de Entrega: {orden.fecha_entrega}</Typography>
      <Typography variant="h6">Total Orden: Q.{orden.total_orden}</Typography>
      <Typography variant="h6">Detalles:</Typography>
      {orden.detalles && orden.detalles.length > 0 ? (
        <List>
          {orden.detalles.map((detalle, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Producto ID: ${detalle.idProductos}`}
                secondary={`Cantidad: ${detalle.cantidad} | Precio: ${detalle.precio} | Subtotal: ${detalle.subtotal}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No hay detalles disponibles.</Typography>
      )}
    
      <Button variant="contained" color="success" onClick={handleEntregar} sx={{ mt:'25px'}}>
        Entregar
      </Button>
      <Button variant="contained" color="error" onClick={handleRechazar} sx={{ mt:'25px', ml:'8px'}} >
        Rechazar 
      </Button>
    </Paper>
  );
};

export default OrdenDetalles;
