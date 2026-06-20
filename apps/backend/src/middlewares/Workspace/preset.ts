import type { Request, Response, NextFunction } from "express";
import Preset from "models/Workspace/Preset";
import Workspace from "models/Workspace/Workspace";

export async function generateNameForCreate(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        // Nombre tomado desde el body
        const rawName = req.body.name;

        if (!rawName) {
            return res.status(400).json({ error: "El nombre es obligatorio" });
        }

        // Normalizar nombre base (clave)
        const normalizeBaseName = (name: string) =>
            name.trim().replace(/ \d+$/, "");

        const baseName = normalizeBaseName(rawName);

        // Evita problema con nombrs de simbolos (regex)
        const escapeRegex = (str: string) =>
            str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const safeName = escapeRegex(baseName);

        const presetId = req.params.presetId;

        const existingConfigs = await Preset.find({
            preset: presetId,
            name: { $regex: `^${safeName}( \\d+)?$`, $options: "i" },
        }).select("name");

        const existingNames = existingConfigs.map((c) => c.name.toLowerCase());
        if (!existingNames.includes(baseName.toLowerCase())) {
            req.presetName = baseName;
            return next();
        }

        const numbers = existingConfigs.map((config) => {
            const match = config.name.match(/(\d+)$/);
            return match ? parseInt(match[1], 10) : 1;
        });

        const numbersSet = new Set(numbers);

        let nextNumber = 1;
        while (numbersSet.has(nextNumber)) {
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

        const normalizeBaseName = (name: string) =>
            name.trim().replace(/ \d+$/, "");

        const baseName = normalizeBaseName(rawName);

        const escapeRegex = (str: string) =>
            str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const safeName = escapeRegex(baseName);

        const workspaceId = req.preset!.workspace;

        // Excluirse a sí mismo SOLO en update
        // Excluir el registro que tenga el mismo ID que la configuración
        if (req.preset!.name === rawName) {
            req.presetName = rawName;
            return next();
        }

        // Buscar configuraciones con nombres similares
        const existingConfigs = await Preset.find({
            workspace: workspaceId,
            _id: { $ne: req.preset!._id }, // 🔥 clave
            name: { $regex: `^${safeName}( \\d+)?$`, $options: "i" },
        }).select("name");

        // Construir conjunto de nombres existentes
        const existingNames = existingConfigs.map((c) => c.name.toLowerCase());

        // Caso base disponible
        if (!existingNames.includes(baseName.toLowerCase())) {
            req.presetName = baseName;
            return next();
        }

        // Extraer números existentes
        const numbers = existingConfigs.map((config) => {
            const match = config.name.match(/(\d+)$/);
            return match ? parseInt(match[1], 10) : 1;
        });

        // Obtener el siguiente número
        const numbersSet = new Set(numbers);

        let nextNumber = 1;
        while (numbersSet.has(nextNumber)) {
            nextNumber++;
        }

        // Generar nombre final SIEMPRE desde baseName
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
