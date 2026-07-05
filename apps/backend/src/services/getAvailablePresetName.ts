import Preset from "models/Workspace/Preset";
import { splitNameAndNumber } from "utils/formatName";

// A diferencia de los utils, los servicios son funciones que se encargan de realizar operaciones más complejas
// y que pueden ser reutilizadas en diferentes partes del código.

// Siempre van a realizar un llamado a la base de datos o a un servicio externo.

// Función auxiliar para escapar caracteres especiales en expresiones regulares
const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Servicio para obtener el nombre disponible de la configuración
export async function getAvailablePresetName(
    workspaceId: string,
    rawName: string,
    excludeId?: string,
): Promise<string | null> {
    // Devuelve un objeto con el nombre y el sufijo numerico que aparece al final del nombre
    const parsed = splitNameAndNumber(rawName);

    if (!parsed) {
        return null;
    }

    const { baseName, number: requestedNumber } = parsed;

    // Escapa caracteres especiales para construir un RegExp seguro.
    const safeName = escapeRegex(baseName);

    // Busca todos los nombres que pertenezcan a la misma familia.
    // Ejemplo:
    // prueba
    // prueba 1
    // prueba 2
    const nameRegex = new RegExp(`^${safeName}(?: (\\d+))?$`, "i");

    // Lista todas las configuraciones existentes por espacio de trabajo y nombre
    // Aunque si excludeId fuera undefined, esta forma si funcionaria cuando se trata
    // de crear un nuevo nombre de configuración

    // const existingConfigs = await Preset.find({
    //     workspace: workspaceId,
    //     _id: { $ne: excludeId },
    //     name: {
    //         $regex: nameRegex,
    //     },
    // }).select("name");

    // Pero para optimizar la consulta se realiza el siguiente filtro
    const filter: Record<string, unknown> = {
        workspace: workspaceId,
        name: nameRegex,
    };

    if (excludeId) {
        filter._id = { $ne: excludeId };
    }

    const existingConfigs = await Preset.find(filter).select("name");

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
        return requestedNumber === 0
            ? baseName
            : `${baseName} ${requestedNumber}`;
    }

    // Busca el siguiente número disponible.
    // Si el usuario escribió solo el nombre base,
    // la búsqueda comienza desde 1.
    let nextNumber = Math.max(requestedNumber, 1);

    while (usedNumbers.has(nextNumber)) {
        nextNumber++;
    }
    return `${baseName} ${nextNumber}`;
}
