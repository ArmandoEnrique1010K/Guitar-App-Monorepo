import Preset from "models/Workspace/Preset";

export const presetDestroy = async () => {
    console.log("Destruyendo registros relacionados a presets");
    await Preset.deleteMany({});
};
