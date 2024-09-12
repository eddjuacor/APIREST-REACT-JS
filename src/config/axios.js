import axios from "axios"

const AppiAxios = axios.create({
    baseURL : 'http://localhost:3000'
})


// Interceptor para añadir el token a las solicitudes
AppiAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AppiAxios