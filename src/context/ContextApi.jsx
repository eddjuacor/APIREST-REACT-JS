/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import AppiAxios from "../config/axios.js"; // Asegúrate de tener este archivo correctamente configurado

// Crear el contexto
export const ContextApi = createContext();

// Proveedor del contexto
const ApiProvider = ({ children }) => {
  // Estado de autenticación
  const [auth, guardarAuth] = useState({
    token: localStorage.getItem("authToken") || "",
    auth: !!localStorage.getItem("authToken"),
  });

  /*--------------------------------------Roles---------------------------------------- */

  const [userRole, setUserRole] = useState('operador');


  /*-------------------------------------Productos-------------------------------------- */

  // Función para hacer una consulta de productos
  const fetchProducts = async () => {
    const token = localStorage.getItem("authToken") || auth.token;
    if (token) {
      try {
        const response = await AppiAxios.get("/productos", {
          headers: { authorization: token },
        });
        // Puedes manejar los productos aquí si es necesario
      } catch (error) {
        console.error("Error al consultar productos:", error);
        if (error.response?.status === 500) {
          // Manejar el error de acuerdo a tu lógica
        }
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [auth.token]);

  /*------------------------------Carrito-----------------------------------------------*/
  // Estado del carrito
  const [cartItems, setCartItems] = useState(() => {
    // Cargar el carrito desde localStorage al iniciar el estado
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  // Función para añadir productos al carrito
  const addToCart = (producto) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === producto.id);
      let newItems;
      if (existingProduct) {
        newItems = prevItems.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { ...producto, quantity: 1 }];
      }

      // Guardar el carrito en localStorage
      localStorage.setItem("cartItems", JSON.stringify(newItems));
      return newItems;
    });
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (idProductos) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter(
        (item) => item.idProductos !== idProductos
      );
      // Guardar el carrito actualizado en localStorage
      localStorage.setItem("cartItems", JSON.stringify(newItems));
      return newItems;
    });
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  /*-------------------------------Cerrar Sesion-------------------------------------- */

  // Función para cerrar sesión
  const cerrarSesion = () => {
    // Limpiar el token en el localStorage
    localStorage.removeItem("authToken");

    // Actualizar el estado de autenticación
    guardarAuth({
      token: "",
      auth: false,
    });

    // Limpiar el estado del carrito (opcional)
    setCartItems([]);
  };

  return (
    <ContextApi.Provider
      value={{
        auth,
        guardarAuth,
        cartItems,
        setCartItems,
        addToCart,
        cerrarSesion,
        removeFromCart,
        clearCart,
        userRole,
        setUserRole
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default ApiProvider;
