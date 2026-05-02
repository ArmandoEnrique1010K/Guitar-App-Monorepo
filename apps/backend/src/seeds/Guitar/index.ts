import { connectDB } from "config/db";
import { guitarSeed } from "./guitar.seed";
import dotenv from "dotenv";
import { noteSampleSeed } from "./noteSample.seed";

const runGuitarSeeds = async () => {
  // No olvidar que si se ejecuta los seeds, debes importar las variables de entorno porque esta ahi la URL de conexion a la base de datos
  dotenv.config();

  try {
    await connectDB();

    console.log("🌱 Ejecutando seeds...");

    await guitarSeed();
    await noteSampleSeed();

    console.log("✅ Seeds completados");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
runGuitarSeeds();
