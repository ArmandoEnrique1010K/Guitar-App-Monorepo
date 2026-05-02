import Notebook from "models/Notebook/Notebook";

export const configurationSeed = async () => {
  console.log("Limpiando registros relacionados a configuraciones");
  await Notebook.deleteMany({});
};
