import React, { useEffect, useState } from 'react';
import AppiAxios from '../../config/axios'; // Importa tu configuración axios

const Historial = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [userId, setUserId] = useState(null); // Guardará el ID del usuario registrado



  useEffect(() => {
    if (userId) {
      const fetchOrdenes = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const response = await AppiAxios.get(`/ordenesporusuario/${idUsuarios}`,{
            headers: {
          'authorization': `Bearer ${token}`
        }
          }); // Ajusta la ruta según tu configuración
          
          const data = response.data;

          // Verifica el formato y convierte el JSON si es necesario
          const key = Object.keys(data)[0];
          const ordenesJSON = JSON.parse(data[key]);

          // Filtra las órdenes por el ID del usuario
          const filteredOrdenes = ordenesJSON.filter(orden => orden.idUsuarios === userId);
          setOrdenes(filteredOrdenes);
        } catch (error) {
          console.error('Error al obtener las órdenes:', error);
        }
      };

      fetchOrdenes();
    }
  }, [userId]);

  return (
    <div>
      <h2>Historial de Compras</h2>
      {ordenes.length === 0 ? (
        <p>No tienes órdenes.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID Orden</th>
              <th>Nombre Completo</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo Electrónico</th>
              <th>Total</th>
              <th>Fecha de Creación</th>
              <th>Fecha de Entrega</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.idOrden}>
                <td>{orden.idOrden}</td>
                <td>{orden.nombre_completo}</td>
                <td>{orden.direccion}</td>
                <td>{orden.telefono}</td>
                <td>{orden.correo_electronico}</td>
                <td>{orden.total_orden}</td>
                <td>{orden.fecha_creacion}</td>
                <td>{orden.fecha_entrega}</td>
                <td>
                  <ul>
                    {orden.detalles.map((detalle, index) => (
                      <li key={index}>
                        Producto ID: {detalle.idProductos}, Cantidad: {detalle.cantidad}, Precio: {detalle.precio}, Subtotal: {detalle.subtotal}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Historial;
