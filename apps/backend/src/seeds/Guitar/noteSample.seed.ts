import colors from "colors";
import Guitar from "models/Guitar/Guitar";
import NoteSample from "models/Guitar/NoteSample";
import { formatTwoDigits, formatLowerCamelCase } from "utils/format";

export const noteSampleSeed = async () => {
    console.log(
        colors.red("Eliminando registros relacionados a notas musicales..."),
    );
    await NoteSample.deleteMany({});

    console.log(colors.yellow("Insertando datos de notas musicales..."));

    // Obtener todas las guitarras
    const guitars = await Guitar.find();

    // Generar notas para cada guitarra
    const notesToInsert = guitars.flatMap((guitar) => {
        // Devuelve un arreglo de 47 elementos, cada uno con el índice de la nota
        return Array.from({ length: 47 }).map((_, i) => ({
            noteIndex: i,
            // Se requiere una variable de entorno para la URL de los archivos de audio
            audioUrl: `${process.env.FILES_URL}/${formatLowerCamelCase(guitar.name)}/${formatTwoDigits(i.toString())}.mp3`,
            guitar: guitar._id,
        }));
    });

    // Insertar todos los registros
    await NoteSample.insertMany(notesToInsert);
    console.log(
        colors.green("Datos insertados, se ha ejecutado noteSample.seed"),
    );
};
