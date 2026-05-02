import Guitar from "models/Guitar/Guitar";

export const guitarSeed = async () => {
  console.log("Limpiando registros relacionados a guitarras");
  await Guitar.deleteMany({});

  console.log("Insertando datos de guitarras");

  await Guitar.insertMany([
    { name: "Clean Solo" },
    { name: "Distortion Solo" },
  ]);

  console.log("Datos insertados, guitars.seed completado");
};
