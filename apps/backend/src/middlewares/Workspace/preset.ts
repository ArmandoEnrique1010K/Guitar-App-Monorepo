import type { Request, Response, NextFunction } from "express";
import Preset from "models/Workspace/Preset";
import Workspace from "models/Workspace/Workspace";
import { Types } from "mongoose";
import { getAvailablePresetName } from "services/getAvailablePresetName";
import { splitNameAndNumber } from "utils/format";

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Genera un nuevo nombre cuando se trata de crear una nueva configuración
// Ten en cuenta el siguiente orden cuando se trata del nombre:
// Tu escribes -> resultado
// "prueba" -> "prueba"
// "prueba" -> "prueba 1"
// "prueba 3" -> "prueba 3"
// "prueba 3" -> "prueba 4"
// "prueba 1" -> "prueba 2"
// "prueba 1" -> "prueba 5" ...
export async function generateNameForCreate(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        // Nombre enviado por el cliente (desde el body).
        const rawName = req.body.name;

        if (!rawName) {
            return res.status(400).json({ error: "El nombre es obligatorio" });
        }

        // Obtiene los IDs de los parametros dinamicos del endpoint
        // Se establece que workspaceId es solamente de tipo string y que no sea
        // de tipo string o arreglo de string
        const workspaceId = req.params.workspaceId as string;

        const name = await getAvailablePresetName(workspaceId, rawName);

        if (!name) {
            return res.status(400).json({
                error: "Nombre inválido",
            });
        }

        // Se establece en el request el nombre disponible porque ese nombre
        // se va a utilizar en el controlador
        req.presetName = name;
        next();
    } catch (error) {
        res.status(500).json({ error: "Hubo un error" });
    }
}

// Genera un nuevo nombre cuando se trata de editar una configuración existente
// Pero en el caso de no cambiarle el nombre, se mantiene intacto
export async function generateNameForUpdate(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const rawName = req.body.name;

        if (!rawName) {
            return res.status(400).json({ error: "El nombre es obligatorio" });
        }

        // Se saltea el proceso de editar el nombre si no ha cambiado
        // el nombre de la configuración
        if (
            req.preset!.name.trim().toLowerCase() ===
            rawName.trim().toLowerCase()
        ) {
            // Guarda en presetName el mismo valor que rawName
            req.presetName = rawName.trim().toLowerCase();
            return next();
        }

        // Puedes usar el presetId obtenido desde los parametros o desde el request
        const presetId = req.preset!._id.toString();
        // const presetId = req.params.presetId as string;

        // Esto puede ser confuso, el workspaceId no se obtiene de los parametros
        // devuelve undefined
        // const workspaceId = req.params.workspaceId as string;

        // El workspace se toma desde el req.workspace porque desde el middleware presetExists
        // se guarda en req.workspace
        const workspaceId = req.workspace!._id.toString();

        const name = await getAvailablePresetName(
            workspaceId,
            rawName,
            presetId,
        );

        if (!name) {
            return res.status(400).json({
                error: "Nombre inválido",
            });
        }

        req.presetName = name;
        next();
    } catch (error) {
        res.status(500).json({ error: "Hubo un error" });
    }
}

// Verifica si existe una configuración
export async function presetExists(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const { presetId } = req.params;

        // Busca por ID si existe la configuración
        const preset = await Preset.findById(presetId);

        if (!preset) {
            const error = new Error("Configuración no encontrada");
            return res.status(404).json({ error: error.message });
        }

        // Busca el espacio de trabajo por ID del espacio de trabajo asociada a la
        // configuración
        const workspace = await Workspace.findById(preset.workspace.toString());

        if (!workspace) {
            const error = new Error("Espacio de trabajo no encontrado");
            return res.status(404).json({ error: error.message });
        }

        // Guarda la configuración y el espacio de trabajo en el request
        req.preset = preset;
        req.workspace = workspace;

        next();
    } catch (error) {
        res.status(500).json({ error: "Hubo un error" });
    }
}

// Verifica si es el autor de la configuración
export async function isAuthorOfPreset(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        // El mismo usuario que ha iniciado sesion debe ser el mismo usuario que
        // aparece en la propiedad user del espacio de trabajo (workspace)
        // para que pase la validación
        if (req.user?._id.toString() !== req.workspace?.user.toString()) {
            return res.status(400).json({ error: "Acción no válida" });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Hubo un error" });
    }
}
