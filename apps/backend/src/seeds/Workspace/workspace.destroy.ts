import Workspace from "models/Workspace/Workspace";

export const workspaceDestroy = async () => {
    console.log("Destruyendo registros relacionados a workspaces");
    await Workspace.deleteMany({});
};
