import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Paper, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import AppiAxios from '../../config/axios';

const OrderDetails = () => {
  const { idOrden } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await AppiAxios.get(`/ordenDetalles/${idOrden}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        let combinedJson = '';

        if (Array.isArray(response.data)) {
          combinedJson = response.data.map(item => item['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']).join('');
        } else {
          throw new Error('Los datos no están en el formato esperado.');
        }

        const data = JSON.parse(combinedJson);

        if (Array.isArray(data) && data.length > 0) {
          setOrderData(data[0]); // Asume que solo hay un objeto de orden en el array
        } else {
          throw new Error('Datos no están en formato de array.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [idOrden]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Detalles de la Orden
      </Typography>

      {orderData ? (
        <>
        <Button variant="contained" color="secondary" onClick={() => navigate('/inicio/vistaorden') } sx={{mb:'25px'}} >
        Volver a Ordenes
        </Button>
          <Typography><strong>ID Orden:</strong> {orderData.idOrden}</Typography>
          <Typography><strong>Nombre Completo:</strong> {orderData.nombre_completo}</Typography>
          <Typography><strong>Dirección:</strong> {orderData.direccion}</Typography>
          <Typography><strong>Teléfono:</strong> {orderData.telefono}</Typography>
          <Typography><strong>Correo Electrónico:</strong> {orderData.correo_electronico}</Typography>
          <Typography><strong>Fecha de Entrega:</strong> {orderData.fecha_entrega}</Typography>
          <Typography><strong>Total de Orden:</strong> {orderData.total_orden}</Typography>

          <Typography variant="h6" style={{ marginTop: 20 }}>Detalles de los Productos</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID Producto</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData.detalles.map((detalle, index) => (
                  <TableRow key={index}>
                    <TableCell>{detalle.idProductos}</TableCell>
                    <TableCell>{detalle.cantidad}</TableCell>
                    <TableCell>{detalle.precio}</TableCell>
                    <TableCell>{detalle.subtotal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography>No se encontraron detalles para esta orden.</Typography>
      )}

      <Button variant="contained" color="success"  sx={{ mt:'25px'}}>
        Entregar
      </Button>
      <Button variant="contained" color="error"  sx={{ mt:'25px', ml:'8px'}} >
        Rechazar 
      </Button>
    </Paper>
  );
};

export default OrderDetails;