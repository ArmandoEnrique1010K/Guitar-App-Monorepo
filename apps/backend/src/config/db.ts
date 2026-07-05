import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(
            process.env.DATABASE_URL!,
        );

        console.log(
            colors.green(
                `MongoDB Conectado: ${connection.host}:${connection.port}`,
            ),
        );
    } catch (error) {
        console.log(colors.red("Error al conectar a MongoDB"));
        console.log(error);

        exit(1);
    }
};
