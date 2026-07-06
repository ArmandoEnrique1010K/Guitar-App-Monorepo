import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";

// Establece la conexión con la base de datos MongoDB.

// Si la conexión falla, la aplicación finaliza su ejecución
// para evitar funcionar sin acceso a la base de datos.
export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(
            process.env.DATABASE_URL!,
        );

        // Muestra la dirección del servidor de MongoDB al conectarse correctamente.
        console.log(
            colors.green(
                `MongoDB Conectado: ${connection.host}:${connection.port}`,
            ),
        );
    } catch (error) {
        console.log(colors.red("Error al conectar a MongoDB"));
        console.log(error);

        // Finaliza el proceso con código de error.
        exit(1);
    }
};
