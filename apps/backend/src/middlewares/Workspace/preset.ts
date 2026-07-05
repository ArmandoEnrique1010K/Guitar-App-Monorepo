import type { Request, Response, NextFunction } from "express";
import Preset from "models/Workspace/Preset";
import Workspace from "models/Workspace/Workspace";
import { splitNameAndNumber } from "utils/formatName";

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

        // Devuelve un objeto con el nombre y el sufijo numerico que aparece al final del nombre
        const parsed = splitNameAndNumber(rawName);

        if (!parsed) {
            return res.status(400).json({ error: "Nombre inválido" });
        }

        const { baseName, number: requestedNumber } = parsed;

        // Escapa caracteres especiales para construir un RegExp seguro.
        const safeName = escapeRegex(baseName);

        // Obtiene los IDs de los parametros dinamicos del endpoint
        const workspaceId = req.params.workspaceId;

        // Busca todos los nombres que pertenezcan a la misma familia.
        // Ejemplo:
        // prueba
        // prueba 1
        // prueba 2
        const nameRegex = new RegExp(`^${safeName}(?: (\\d+))?$`, "i");

        // Lista todas las configuraciones existentes por espacio de trabajo y nombre
        const existingConfigs = await Preset.find({
            workspace: workspaceId,
            name: {
                $regex: nameRegex,
            },
        }).select("name");

        // Guarda todos los sufijos numéricos ya utilizados.
        // El nombre base sin número se representa como 0.
        //
        // Ejemplo:
        // prueba      -> 0
        // prueba 1    -> 1
        // prueba 2    -> 2
        const usedNumbers = new Set<number>();

        for (const { name } of existingConfigs) {
            const match = name.match(nameRegex);

            if (!match) continue;

            usedNumbers.add(match[1] ? Number(match[1]) : 0);
        }

        // Si el número solicitado aún no existe, se conserva el nombre.
        if (!usedNumbers.has(requestedNumber)) {
            req.presetName =
                requestedNumber === 0
                    ? baseName
                    : `${baseName} ${requestedNumber}`;

            return next();
        }

        // Busca el siguiente número disponible.
        // Si el usuario escribió solo el nombre base,
        // la búsqueda comienza desde 1.
        let nextNumber = Math.max(requestedNumber, 1);

        while (usedNumbers.has(nextNumber)) {
            nextNumber++;
        }
        req.presetName = `${baseName} ${nextNumber}`;

        next();
    } catch (error) {
        res.status(500).json({ error: "Hubo un error" });
    }
}

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

        // Excluirse a sí mismo SOLO en update
        // Excluir el registro que tenga el mismo ID que la configuración
        if (
            req.preset!.name.trim().toLowerCase() ===
            rawName.trim().toLowerCase()
        ) {
            return next();
        }

        const parsed = splitNameAndNumber(rawName);
        if (!parsed) {
            return res.status(400).json({ error: "Nombre inválido" });
        }

        const { baseName, number: requestedNumber } = parsed;

        const safeName = escapeRegex(baseName);

        const workspaceId = req.params.workspaceId;

        const nameRegex = new RegExp(`^${safeName}(?: (\\d+))?$`, "i");
        const existingConfigs = await Preset.find({
            workspace: workspaceId,
            _id: { $ne: req.preset!._id },
            name: {
                $regex: nameRegex,
            },
        }).select("name");

        // Si el número solicitado aún no existe, se conserva el nombre.
        const usedNumbers = new Set<number>();

        for (const { name } of existingConfigs) {
            const match = name.match(nameRegex);

            if (!match) continue;

            usedNumbers.add(match[1] ? Number(match[1]) : 0);
        }

        if (!usedNumbers.has(requestedNumber)) {
            req.presetName =
                requestedNumber === 0
                    ? baseName
                    : `${baseName} ${requestedNumber}`;

            return next();
        }

        let nextNumber = Math.max(requestedNumber, 1);

        while (usedNumbers.has(nextNumber)) {
            nextNumber++;
        }
        req.presetName = `${baseName} ${nextNumber}`;

        next();
    } catch (error) {
        res.status(500).json({ error: "Hubo un error" });
    }
}

export async function presetExists(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        // console.log("params:", req.params);

        const { presetId } = req.params;
        // console.log(presetId);

        const preset = await Preset.findById(presetId);
        if (!preset) {
            const error = new Error("Configuración no encontrada");
            return res.status(404).json({ error: error.message });
        }

        const workspace = await Workspace.findById(preset.workspace);
        if (!workspace) {
            const error = new Error("Espacio de trabajo no encontrado");
            return res.status(404).json({ error: error.message });
        }

        req.preset = preset;
        // AQUI DEBE GUARDAR EL AUTOR DEL NOTEBOOK
        req.workspace = workspace;

        next();
    } catch (error) {
        res.status(500).json({ error: "Hubo un error" });
    }
}

export async function isAuthorOfPreset(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        if (req.user?._id.toString() !== req.workspace?.user.toString()) {
            return res.status(400).json({ error: "Acción no válida" });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Hubo un error" });
    }
}
