import bcrypt from "bcrypt";

// Hash de la contraseña
export const hashPassword = async (password: string) => {
    // Bcrypt tiene un método genSalt que permite establecer el número
    // de veces o saltos que se va a formatear una contraseña
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Verificar la contraseña si coincide con el hash
export const checkPassword = async (
    enteredPassword: string,
    storedHash: string,
) => {
    return await bcrypt.compare(enteredPassword, storedHash);
};
