import colors from "colors";
import Workspace from "models/Workspace/Workspace";

export const workspaceSeed = async () => {
    console.log(
        colors.red(
            "Eliminando registros relacionados a espacios de trabajo...",
        ),
    );
    await Workspace.deleteMany({});
};
