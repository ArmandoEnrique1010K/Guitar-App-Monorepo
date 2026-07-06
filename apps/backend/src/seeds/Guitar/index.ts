import dotenv from "dotenv";
import colors from "colors";
import { connectDB } from "config/db";
import { guitarSeed } from "./guitar.seed";
import { noteSampleSeed } from "./noteSample.seed";

const runGuitarSeeds = async () => {
    // Se utiliza dotenv para que funcione la URL de conexión a la base de datos
    // en el seed, porque el seed se ejecuta directamente con ts-node
    dotenv.config();

    try {
        await connectDB();

        console.log(colors.blue("Ejecutando seeds de guitarras..."));

        // Como las bases de datos no relacionales no dependen de claves
        // foráneas, se pueden insertar los datos en cualquier orden

        // Pero se tiene en cuenta que primero se insertan las guitarras
        // porque las notas musicales dependen de ellas
        await guitarSeed();
        await noteSampleSeed();

        console.log(
            colors.green("Seeds de guitarras ejecutados correctamente"),
        );

        // Se termina el proceso de ejecución
        process.exit(0);
    } catch (error) {
        console.error(error);
        // Se termina el proceso de ejecución con error
        process.exit(1);
    }
};

// La función se ejecuta automáticamente
runGuitarSeeds();
