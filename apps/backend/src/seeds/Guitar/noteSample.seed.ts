import Guitar from "models/Guitar/Guitar";
import NoteSample from "models/Guitar/NoteSample";

export const noteSampleSeed = async () => {
  console.log("Limpiando registros relacionados a notas musicales");
  await NoteSample.deleteMany({});

  console.log("Insertando datos de notas musicales");

  // Obtener todas las guitarras
  const guitars = await Guitar.find();

  // Generar notas por cada guitarra
  const notesToInsert = guitars.flatMap((guitar) => {
    // TODO: MODIFICAR LA URL EN DONDE SE GUARDARAN LAS NOTAS, length ES LA CANTIDAD DE NOTAS
    return Array.from({ length: 5 }).map((_, i) => ({
      noteIndex: i,
      audioUrl: `https://fake-url.com/${guitar.name}/note-${i}.mp3`,
      guitar: guitar._id,
    }));
  });

  // Insertar todos los registros
  await NoteSample.insertMany(notesToInsert);
  console.log("Datos insertados, noteSample.seed completado");
};
