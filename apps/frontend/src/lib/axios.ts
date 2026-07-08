import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Verifica que la URL base de la API haya sido definida en las
// variables de entorno antes de iniciar la aplicación.
if (!API_URL) {
    throw new Error('VITE_API_URL no está definida');
}

// Instancia global de Axios utilizada para realizar todas las
// peticiones HTTP al backend de la aplicación.

// withCredentials: permite enviar y recibir automáticamente las
// cookies utilizadas para la autenticación de los usuarios.
export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Interceptor para centralizar el procesamiento de las respuestas
// HTTP. Actualmente solo reenvía el error, pero permite incorporar
// en un único lugar lógica como:
//
// - Renovación automática del token.
// - Manejo global de errores.
// - Redirección ante respuestas 401 o 403.
// - Registro (logging) de peticiones.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    },
);
