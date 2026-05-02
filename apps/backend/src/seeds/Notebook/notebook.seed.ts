import Notebook from "models/Notebook/Notebook";

export const notebookSeed = async () => {
  console.log("Limpiando registros relacionados a notebooks");
  await Notebook.deleteMany({});
};
