import type { Request, Response } from "express";
import User from "models/User/User";
import { checkPassword, hashPassword } from "utils/auth";

export class ProfileController {
    // Obtiene el usuario desde el request
    // Se tiene en cuenta que desde el middleware authenticate se guarda el
    // usuario en el request
    static getCurrentUser = async (req: Request, res: Response) => {
        try {
            res.status(200).json(req.user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Actualizar perfil del usuario
    static updateProfile = async (req: Request, res: Response) => {
        try {
            const { name, email } = req.body;

            // Si el usuario ya existe y no es el mismo que el actual
            const userExists = await User.findOne({ email });
            if (
                userExists &&
                userExists.id.toString() !== req.user?._id.toString()
            ) {
                const error = new Error("Ese email ya esta registrado");
                return res.status(409).json({ error: error.message });
            }
            if (!req.user) {
                return res
                    .status(401)
                    .json({ error: "Usuario no autenticado" });
            }

            // Actualiza los datos del usuario
            req.user.name = name;
            req.user.email = email;

            await req.user.save();
            res.status(200).send("Perfil actualizado correctamente");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Actualizar contraseña del usuario
    static updatePassword = async (req: Request, res: Response) => {
        try {
            const { current_password, password } = req.body;

            const user = await User.findById(req.user?._id);

            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            // Verifica que la contraseña actual sea correcta.
            const isPasswordCorrect = await checkPassword(
                current_password,
                user.password,
            );

            if (!isPasswordCorrect) {
                const error = new Error("La contraseña actual es incorrecta");
                return res.status(400).json({ error: error.message });
            }

            // Evita reutilizar la misma contraseña.
            const isSamePassword = await checkPassword(password, user.password);

            if (isSamePassword) {
                const error = new Error("No puede usar la misma contraseña");
                return res.status(400).json({ error: error.message });
            }

            user.password = await hashPassword(password);
            await user.save();

            res.status(200).send("Contraseña actualizada correctamente");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };
}
