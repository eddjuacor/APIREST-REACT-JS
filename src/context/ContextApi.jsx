
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

  //local storage CArrito


  /*--------------------------------------Roles---------------------------------------- */

  const [userRole, setUserRole] = useState('operador');

/**-----------------------------------Usuario----------------------------------------- */

  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AppiAxios.get('/usuarios', {
          headers: { authorization: auth.token }
        });
        
        setUsuario(response.data); 
      } catch (error) {
        console.error("Error al consultar los datos del usuario:", error.response ? error.response.data : error.message);
      }
    };

    if (auth.token) {
      fetchUserData();
    }
  }, [auth.token]);


  /*----------------------------------OrdenDetalles------------------------------------ */

  const [orden, setOrden] = useState([]);
  const fetchOrdenDetalles = async () => {

    try {

      const OrdenDetalles = await AppiAxios.get("/ordenDetalles", {
        headers: {authorization: token}
      })
      setOrden(OrdenDetalles.data)
      console.log(OrdenDetalles.data)
    } catch (error) {
      console.error("Error al consultar ordenDetalles")
    }
  };

  useEffect(()=>{
    if(auth.token){
      fetchOrdenDetalles();
    }
   
  },[auth.token])

  /*-------------------------------------Productos-------------------------------------- */

  // Función para hacer una consulta de productos
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const productosConsulta = await AppiAxios.get('/productos', {
            headers: {
              authorization: token
            }
          });
          setProductos(productosConsulta.data);
        }
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    };

    fetchProductos();
  }, []);

  /*------------------------------Carrito-----------------------------------------------*/
  // Estado del carrito
  const [cartItems, setCartItems] = useState(() => {
    // Cargar el carrito desde localStorage al iniciar el estado
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    // Guarda los artículos del carrito en localStorage cada vez que cambian
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  const addToCart = (product) => {
    // Añade producto al carrito y actualiza el estado
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
        setUserRole,
        orden,
        setOrden,
        productos,
        setProductos,
        usuario,
        setUsuario
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default ApiProvider;
