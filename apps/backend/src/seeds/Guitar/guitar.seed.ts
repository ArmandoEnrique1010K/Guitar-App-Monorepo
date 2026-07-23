import colors from "colors";
import Guitar from "models/Guitar/Guitar";

// Semilla para insertar datos de guitarras
export const guitarSeed = async () => {
    // Primero debe limpiar los registros relacionados a guitarras para
    // luego insertar los nuevos datos
    console.log(colors.red("Eliminando registros relacionados a guitarras..."));
    await Guitar.deleteMany({});

    console.log(colors.yellow("Insertando datos de guitarras..."));
    await Guitar.insertMany([
        { name: "Clean Solo" },
        { name: "Distortion Solo" },
        { name: "Arm The Homeless" },
    ]);

    console.log(colors.green("Datos insertados, se ha ejecutado guitars.seed"));
};
