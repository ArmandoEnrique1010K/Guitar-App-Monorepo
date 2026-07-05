import colors from "colors";
import Preset from "models/Workspace/Preset";

export const presetSeed = async () => {
    console.log(
        colors.red("Eliminando registros relacionados a configuraciones..."),
    );
    await Preset.deleteMany({});
};
