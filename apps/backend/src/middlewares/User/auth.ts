import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "models/User/User";

// Los middlewares son funciones que se ejecutan antes de que se ejecute el controlador
// Si algo sale mal en el middleware, se retorna un error y se detiene la ejecución

// Middleware para autenticar al usuario
export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // Obtiene el token desde la cookie 'token'
    const token = req.cookies.token;

    if (!token) {
        const error = new Error("No Autorizado");
        return res.status(401).json({ error: error.message });
    }

    try {
        // el metodo verify de jwt verifica que el token sea valido
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        // Si el token es valido, verifica que tenga un id
        if (typeof decoded === "object" && decoded.id) {
            // Busca al usuario en la base de datos y solamente selecciona
            // las propiedades _id, name y email
            const user = await User.findById(decoded.id).select(
                "_id name email",
            );

            if (!user) {
                return res.status(401).json({ error: "Token inválido" });
            }

            // Guarda al usuario autenticado en el request
            req.user = user;

            return next();
        }
    } catch (error) {
        res.status(500).json({ error: "Token inválido" });
    }
};
