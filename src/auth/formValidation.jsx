import * as yup from 'yup';

export const formValidation = yup.object({
  correo_electronico: yup
    .string()
    .email('Validar correo electronico')
    .required('correo es requerido'),
  password: yup
    .string()
    .min(6, 'Password debe ser mayor a 6 caracteres')
    .required('Password es requerido'),
});


//validacion OrdenDetalles
export const schema = yup.object({
  nombre_completo: yup.string().required('El nombre es requerido'),
  direccion: yup.string().required('La dirección es requerida'),
  telefono: yup.string().required('El teléfono es requerido').matches(/^[0-9]{11}$/, 'El teléfono debe tener 10 dígitos'),
  correo_electronico: yup.string().email('Correo electrónico inválido').required('El email es requerido'),
  fecha_entrega: yup.date().required('La fecha de entrega es requerida').nullable(),
  subtotal: yup.number('El subtotal es requerido').positive('El subtotal debe ser un número positivo'),
});