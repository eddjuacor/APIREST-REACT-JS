import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]); // Inicializa como un array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrdenes = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('/ordenesporusuario', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        console.log('Datos recibidos:', response.data); // Verifica la estructura de los datos

        // Asegúrate de que response.data sea un array
        if (Array.isArray(response.data)) {
          setOrdenes(response.data);
        } else {
          throw new Error('La respuesta del servidor no es un array.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Órdenes</Typography>
      <TableContainer component={Paper} sx={{ mt: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Usuario</TableCell>
              <TableCell>ID Orden</TableCell>
              <TableCell>Fecha Creación</TableCell>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Correo Electrónico</TableCell>
              <TableCell>Fecha Entrega</TableCell>
              <TableCell>Total Orden</TableCell>
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
                  <TableCell>{orden.idUsuarios}</TableCell>
                  <TableCell>{orden.idOrden}</TableCell>
                  <TableCell>{orden.fecha_creacion}</TableCell>
                  <TableCell>{orden.nombre_completo}</TableCell>
                  <TableCell>{orden.direccion}</TableCell>
                  <TableCell>{orden.telefono}</TableCell>
                  <TableCell>{orden.correo_electronico}</TableCell>
                  <TableCell>{orden.fecha_entrega}</TableCell>
                  <TableCell>Q.{orden.total_orden}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Ordenes;