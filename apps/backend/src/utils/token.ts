// Genera un token de 6 dígitos aleatorios
export const generateToken = () =>
    Math.floor(100000 + Math.random() * 900000).toString();
