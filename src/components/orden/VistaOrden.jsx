import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppiAxios from '../../config/axios';

const Ordene = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrdenes = async () => {
   
      try {
        const response = await AppiAxios.get('/ordenDetalles', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        console.log('Datos recibidos:', response.data);

 
        let combinedJson = '';

  
        if (Array.isArray(response.data)) {
          combinedJson = response.data.map(item => item['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']).join('');
        } else {
          throw new Error('Los datos no están en el formato esperado.');
        }


        const data = JSON.parse(combinedJson);


        if (Array.isArray(data)) {
          setOrdenes(data);
        } else {
          throw new Error('Datos no están en formato de array.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, []);

  const handleVerDetalles = (idOrden) => {
    console.log('Navegando a detalles para idOrden:', idOrden);
    
    navigate(`/inicio/ordendetalles/${idOrden}`);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;

  return (
    <TableContainer component={Paper} sx={{ mt: '30px', padding: '50px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID ORDEN</TableCell>
            <TableCell>FECHA CREACION</TableCell>
            <TableCell>NOMBRE COMPLETO</TableCell>
            <TableCell>DIRECCION</TableCell>
            <TableCell>TELEFONO</TableCell>
            <TableCell>CORREO</TableCell>
            <TableCell>FECHA ENTREGA</TableCell>
            <TableCell>TOTAL ORDEN</TableCell>
            <TableCell>DETALLES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordenes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9}>No hay órdenes disponibles.</TableCell>
            </TableRow>
          ) : (
            ordenes.map((orden) => (
              <TableRow key={orden.idOrden}>
                <TableCell>{orden.idOrden}</TableCell>
                <TableCell>{orden.fecha_creacion}</TableCell>
                <TableCell>{orden.nombre_completo}</TableCell>
                <TableCell>{orden.direccion}</TableCell>
                <TableCell>{orden.telefono}</TableCell>
                <TableCell>{orden.correo_electronico}</TableCell>
                <TableCell>{orden.fecha_entrega}</TableCell>
                <TableCell>Q.{orden.total_orden}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleVerDetalles(orden.idOrden)}
                  >
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Ordene;