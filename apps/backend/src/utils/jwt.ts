import jwt from "jsonwebtoken";

type UserPayload = {
    id: string;
};

// Genera un JWT basado en el ID del usuario
export const generateJWT = (payload: UserPayload) => {
    // La variable de entorno JWT_SECRET contiene una palabra secreta
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        // El token expira en 7 días
        expiresIn: "7d",
    });
    return token;
};
