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