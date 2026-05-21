import Guitar from "models/Guitar/Guitar";
import NoteSample from "models/Guitar/NoteSample";

export const noteSampleSeed = async () => {
    console.log("Limpiando registros relacionados a notas musicales");
    await NoteSample.deleteMany({});

    console.log("Insertando datos de notas musicales");

    // Obtener todas las guitarras
    const guitars = await Guitar.find();

    // Formatear el nombre de la guitarra para que quede de la siguiente forma:
    // Clean Solo -> cleanSolo

    const formatWord = (word: string): string => {
        const words = word.split(" ");
        return words
            .map((word, index) => {
                if (index === 0) {
                    return word.toLowerCase();
                } else {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }
            })
            .join("");
    };

    // Formatear el nombre del archivo para que quede de la siguiente forma:
    // 0 -> 00
    // 9 -> 09
    // 10 -> 10
    // 46 -> 46
    const formatFile = (file: string): string => {
        return file.padStart(2, "0");
    };

    // Generar notas por cada guitarra
    const notesToInsert = guitars.flatMap((guitar) => {
        // length ES LA CANTIDAD DE NOTAS
        return Array.from({ length: 47 }).map((_, i) => ({
            noteIndex: i,
            // audioUrl: `https://fake-url.com/${formatWord(guitar.name)}/note-${i}.mp3`,
            audioUrl: `${process.env.FILES_URL}/${formatWord(guitar.name)}/${formatFile(i.toString())}.mp3`,
            guitar: guitar._id,
        }));
    });

    // Insertar todos los registros
    await NoteSample.insertMany(notesToInsert);
    console.log("Datos insertados, noteSample.seed completado");
};
