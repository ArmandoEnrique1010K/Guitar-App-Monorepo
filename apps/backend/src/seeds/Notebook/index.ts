import { connectDB } from "config/db";
import dotenv from "dotenv";
import { configurationSeed } from "./configuration.seed";
import { notebookSeed } from "./notebook.seed";

//* ADVERTENCIA: ESTE SEED SE ENCARGA DE ELIMINAR TODOS LOS CUADERNOS Y CONFIGURACIONES DE LOS USUARIOS
// TODO: AÑADIR UNA SEED RELACIONADA A EFECTOS
const runNotebookSeeds = async () => {
  dotenv.config();

  try {
    await connectDB();

    console.log("🌱 Ejecutando seeds...");

    await configurationSeed();
    await notebookSeed();

    console.log("✅ Limpieza completada");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
runNotebookSeeds();
