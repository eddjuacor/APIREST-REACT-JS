import { createContext, useState, useEffect } from "react";
import AppiAxios from "../config/axios.js"; 

// Crear el contexto
export const ContextApi = createContext();

// Proveedor del contexto
const ApiProvider = ({ children }) => {
  // Estado de autenticación
  const [auth, guardarAuth] = useState({
    token: localStorage.getItem("authToken") || "",
    auth: !!localStorage.getItem("authToken"),
  });

  /**-----------------------------------Usuario----------------------------------------- */
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.token) {
          const response = await AppiAxios.get('/usuarios', {
            headers: { authorization: `Bearer ${auth.token}` }
          });
          setUsuario(response.data); 
        }
      } catch (error) {
        console.error("Error al consultar los datos del usuario:", error.response ? error.response.data : error.message);
      }
    };

    fetchUserData();
  }, [auth.token]);

  /*----------------------------------OrdenDetalles------------------------------------ */
  const [orden, setOrden] = useState([]);

  useEffect(() => {
    const fetchOrden = async () => {
      try {
        if (auth.token) {
          const response = await AppiAxios.get('/ordenDetalles', {
            headers: {
              authorization: `Bearer ${auth.token}`,
            },
          });
          console.log('Respuesta del servidor:', response.data);
          if (Array.isArray(response.data)) {
            setOrden(response.data);
          }
        }
      } catch (error) {
        console.log(error)
      } 
    };

    fetchOrden();
  }, [auth.token]);

  /*-------------------------------------Productos-------------------------------------- */
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (auth.token) {
          const productosConsulta = await AppiAxios.get('/productos', {
            headers: {
              authorization: `Bearer ${auth.token}`
            }
          });
          setProductos(productosConsulta.data);
   
        }
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    };

    fetchProductos();
  }, [auth.token]);

  /*------------------------------Carrito-----------------------------------------------*/
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.idProductos === product.idProductos);
      if (existingItem) {
        return prevItems.map(item =>
          item.idProductos === product.idProductos
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (idProductos) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter(
        (item) => item.idProductos !== idProductos
      );
      localStorage.setItem("cartItems", JSON.stringify(newItems));
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  /*-------------------------------Cerrar Sesion-------------------------------------- */
  const cerrarSesion = () => {
    localStorage.removeItem("authToken");
    guardarAuth({
      token: "",
      auth: false,
    });
    setCartItems([]);
  };

  /*-------------------------------Iniciar Sesion-------------------------------------- */
  const iniciarSesion = (token) => {
    localStorage.setItem("authToken", token);
    guardarAuth({
      token,
      auth: true,
    });
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
        orden,
        setOrden,
        productos,
        setProductos,
        usuario,
        setUsuario,
        iniciarSesion, // Añadido para manejar el inicio de sesión
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default ApiProvider;