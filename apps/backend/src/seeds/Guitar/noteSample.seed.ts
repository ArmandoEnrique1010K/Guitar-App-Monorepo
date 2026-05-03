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

  // Generar notas por cada guitarra
  const notesToInsert = guitars.flatMap((guitar) => {
    // TODO: MODIFICAR LA URL EN DONDE SE GUARDARAN LAS NOTAS, length ES LA CANTIDAD DE NOTAS
    return Array.from({ length: 5 }).map((_, i) => ({
      noteIndex: i,
      audioUrl: `https://fake-url.com/${formatWord(guitar.name)}/note-${i}.mp3`,
      guitar: guitar._id,
    }));
  });

  // Insertar todos los registros
  await NoteSample.insertMany(notesToInsert);
  console.log("Datos insertados, noteSample.seed completado");
};
