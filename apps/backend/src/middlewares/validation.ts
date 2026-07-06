import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Middleware para devolver los errores de validación
export const handleInputErrors = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // validactionResult devuelve un arreglo con los mensajes de errores
    // en objetos
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
