import { CorsOptions } from "cors";

// Config contiene archivos de configuración del servidor como los CORS
// (Cross Origin Resource Sharing) y la conexión a la base de datos

// Configuración de CORS
// Permite únicamente solicitudes provenientes de los orígenes definidos
// en la lista blanca (whitelist).
export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        // Lista de orígenes permitidos
        const whitelist = [process.env.FRONTEND_URL];

        // Permite solicitudes sin origen (origin = undefined) cuando
        // la API se ejecuta con el parámetro --api.
        // Esto facilita realizar pruebas locales utilizando herramientas
        // como Postman, Insomnia o scripts de Node.js.
        if (process.argv.includes("--api")) {
            whitelist.push(undefined);
        }

        // Permite la solicitud si el origen se encuentra dentro de la
        // lista blanca.
        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Error de CORS"));
        }
    },

    // Permite enviar y recibir cookies, encabezados de autenticación
    // u otras credenciales entre el cliente y el servidor.
    credentials: true,
};
