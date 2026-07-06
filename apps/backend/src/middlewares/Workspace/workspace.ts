import type { Request, Response, NextFunction } from "express";
import Workspace from "models/Workspace/Workspace";

// Verifica si existe un espacio de trabajo
export async function workspaceExists(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const { workspaceId } = req.params;
        const workspace = await Workspace.findById(workspaceId);

        if (!workspace) {
            const error = new Error("Espacio de trabajo no encontrado");
            return res.status(404).json({ error: error.message });
        }

        req.workspace = workspace;
        next();
    } catch (error) {
        res.status(500).json({ error: "Hubo un error" });
    }
}

// Verifica si el usuario es el autor del espacio de trabajo
export async function isAuthorOfWorkspace(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        if (req.user?._id.toString() !== req.workspace?.user._id.toString()) {
            const error = new Error("Acción no válida");
            return res.status(400).json({ error: error.message });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Hubo un error" });
    }
}
