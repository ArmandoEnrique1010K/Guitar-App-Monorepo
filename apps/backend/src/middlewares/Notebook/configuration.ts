import type { Request, Response, NextFunction } from "express";
import Configuration from "models/Notebook/Configuration";
import Notebook from "models/Notebook/Notebook";

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

    const notebookId = req.params.notebookId;

    const existingConfigs = await Configuration.find({
      notebook: notebookId,
      name: { $regex: `^${safeName}( \\d+)?$`, $options: "i" },
    }).select("name");

    const existingNames = existingConfigs.map((c) => c.name.toLowerCase());
    if (!existingNames.includes(baseName.toLowerCase())) {
      req.configurationName = baseName;
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

    req.configurationName = `${baseName} ${nextNumber}`;

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

    const notebookId = req.configuration!.notebook;

    // Excluirse a sí mismo SOLO en update
    // Excluir el registro que tenga el mismo ID que la configuración
    if (req.configuration!.name === rawName) {
      req.configurationName = rawName;
      return next();
    }

    // Buscar configuraciones con nombres similares
    const existingConfigs = await Configuration.find({
      notebook: notebookId,
      _id: { $ne: req.configuration!._id }, // 🔥 clave
      name: { $regex: `^${safeName}( \\d+)?$`, $options: "i" },
    }).select("name");

    // Construir conjunto de nombres existentes
    const existingNames = existingConfigs.map((c) => c.name.toLowerCase());

    // Caso base disponible
    if (!existingNames.includes(baseName.toLowerCase())) {
      req.configurationName = baseName;
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
    req.configurationName = `${baseName} ${nextNumber}`;

    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}

export async function configurationExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { configurationId } = req.params;

    const configuration = await Configuration.findById(configurationId);
    if (!configuration) {
      const error = new Error("Configuración no encontrada");
      return res.status(404).json({ error: error.message });
    }

    const notebook = await Notebook.findById(configuration.notebook);
    if (!notebook) {
      const error = new Error("Cuaderno no encontrado");
      return res.status(404).json({ error: error.message });
    }

    req.configuration = configuration;
    // AQUI DEBE GUARDAR EL AUTOR DEL NOTEBOOK
    req.notebook = notebook;

    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}

export async function isAuthorOfConfiguration(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (req.user?._id.toString() !== req.notebook?.user.toString()) {
      return res.status(400).json({ error: "Acción no válida" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
