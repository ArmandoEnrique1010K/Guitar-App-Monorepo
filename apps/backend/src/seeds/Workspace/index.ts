import dotenv from "dotenv";
import colors from "colors";
import { connectDB } from "config/db";
import { presetSeed } from "./preset.seed";
import { workspaceSeed } from "./workspace.seed";

const runWorkspaceSeeds = async () => {
    dotenv.config();

    try {
        await connectDB();

        console.log(colors.blue("Ejecutando seeds de espacios de trabajo..."));

        // Ambos seeds elimina todos los registros insertados
        await workspaceSeed();
        await presetSeed();

        console.log(
            colors.green(
                "Seeds de espacios de trabajo ejecutados correctamente",
            ),
        );
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runWorkspaceSeeds();
