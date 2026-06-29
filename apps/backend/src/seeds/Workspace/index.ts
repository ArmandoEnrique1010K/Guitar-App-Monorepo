import { connectDB } from "config/db";
import dotenv from "dotenv";
import { presetDestroy } from "./preset.destroy";
import { workspaceDestroy } from "./workspace.destroy";

//* ADVERTENCIA: ESTE DESTROY SE ENCARGA DE ELIMINAR TODOS LOS CUADERNOS Y CONFIGURACIONES DE LOS USUARIOS
// TODO: AÑADIR UNA SEED RELACIONADA A CONFIGURACIONES INICIALES DE PRUEBA QUE SE GENERAN CUANDO SE AÑADE UN USUARIO
const runNotebookSeeds = async () => {
    dotenv.config();

    try {
        await connectDB();

        console.log("🌱 Ejecutando seeds...");

        await presetDestroy();
        await workspaceDestroy();

        console.log("✅ Limpieza completada");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
runNotebookSeeds();
