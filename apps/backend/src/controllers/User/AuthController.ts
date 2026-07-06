import { AuthEmail } from "emails/AuthEmail";
import type { Request, Response } from "express";
import Token from "models/User/Token";
import User from "models/User/User";
import { checkPassword, hashPassword } from "utils/auth";
import { generateJWT } from "utils/jwt";
import { generateToken } from "utils/token";

export class AuthController {
    // Crea una cuenta de usuario
    static createAccount = async (req: Request, res: Response) => {
        try {
            // Obtiene los parametros desde el body (el cuerpo de la petición)
            const { password, email } = req.body;

            // Para prevenir un email duplicado se hace una busqueda por el email
            // en la base de datos
            const userExists = await User.findOne({ email });
            if (userExists) {
                const error = new Error("El usuario ya esta registrado");
                return res.status(409).json({ error: error.message });
            }

            // Crea un usuario
            const user = new User(req.body);

            // Realiza un hasheo de la contraseña
            user.password = await hashPassword(password);

            // Genera el token
            const token = new Token();
            token.token = generateToken();
            token.user = user._id;

            // El uso de Promise.all permite hacer el guardado de los datos en paralelo
            // es decir, al mismo tiempo
            await Promise.all([user.save(), token.save()]);

            // Envia el correo de confirmación
            await AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token,
            });

            // El método res.send sirve para enviar un string como respuesta
            res.status(200).send(
                "Cuenta creada, revisa tu email para confirmarla",
            );
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Confirma la cuenta
    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;

            // Busca el token en la base de datos
            const tokenExists = await Token.findOne({ token });
            if (!tokenExists) {
                const error = new Error("Token no válido");
                return res.status(404).json({ error: error.message });
            }

            // Busca el usuario en la base de datos por el usuario que se encuentra en el token
            const user = await User.findById(tokenExists.user);
            if (!user) {
                const error = new Error("Usuario no encontrado");
                return res.status(404).json({ error: error.message });
            }

            // Si el usuario no ha sido confirmado aun, puede agregar las configuraciones
            // de prueba para el usuario
            if (!user.confirmed) {
                // TODO: CADA VEZ QUE SE CREA UN USUARIO DEBE AÑADIRSE UNA SEED RELACIONADA A CONFIGURACIONES
                // INICIALES DE PRUEBA QUE SE GENERAN CUANDO SE AÑADE UN USUARIO
            }

            // Confirma la cuenta
            user.confirmed = true;

            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

            res.status(200).send("Cuenta confirmada correctamente");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Inicia sesion
    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            // Busca el usuario en la base de datos por email
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error("Usuario no encontrado");
                return res.status(404).json({ error: error.message });
            }

            // Si el usuario no ha sido confirmado aun, no puede iniciar sesion
            // Por lo que generara un nuevo token
            if (!user.confirmed) {
                const token = new Token();
                token.user = user._id;
                token.token = generateToken();
                await token.save();

                // Envía el email de confirmación
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token,
                });

                // Devuelve un mensaje de error en la respuesta
                const error = new Error(
                    "La cuenta no ha sido confirmada, hemos enviado un e-mail de confirmación",
                );

                return res.status(401).json({ error: error.message });
            }

            // Si el usuario ha sido confirmado, entonces se procede a revisar
            // la contraseña
            const isPasswordCorrect = await checkPassword(
                password,
                user.password,
            );

            if (!isPasswordCorrect) {
                const error = new Error("Password Incorrecto");
                return res.status(400).json({ error: error.message });
            }

            // Genera un JWT y lo guarda en las cookies
            const token = generateJWT({ id: user.id });

            res.cookie("token", token, {
                // Evita que el token sea accedido desde JavaScript (evita XSS)
                httpOnly: true,
                // Solo se envía el token en requests HTTPS en producción
                secure: process.env.NODE_ENV === "production",
                // Protección CSRF básica
                sameSite: "strict",
                // Expira en 30 días
                maxAge: 1000 * 60 * 60 * 24 * 30,
            });

            res.status(200).send("Bienvenido " + user.name);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Solicitar un nuevo codigo de confirmacion
    static requestConfirmationCode = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error("El Usuario no esta registrado");
                return res.status(404).json({ error: error.message });
            }

            // Si el usuario ya esta confirmado, no se puede solicitar un nuevo codigo
            if (user.confirmed) {
                const error = new Error("El Usuario ya esta confirmado");
                return res.status(400).json({ error: error.message });
            }

            // Genera el token
            const token = new Token();
            token.token = generateToken();
            token.user = user._id;

            // Envia el email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token,
            });

            await Promise.allSettled([user.save(), token.save()]);

            res.status(200).send("Se envió un nuevo token a tu e-mail");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Solicitar un nuevo codigo de recuperacion de contraseña
    static requestPasswordReset = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error("El Usuario no esta registrado");
                return res.status(404).json({ error: error.message });
            }

            const token = new Token();
            token.token = generateToken();
            token.user = user._id;
            await token.save();

            AuthEmail.sendPasswordResetToken({
                email: user.email,
                name: user.name,
                token: token.token,
            });
            res.status(200).send("Revisa tu email y sigue las instrucciones");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Valida el token de recuperacion de contraseña
    static validatePasswordResetToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;

            const tokenExists = await Token.findOne({ token });
            if (!tokenExists) {
                const error = new Error("Token no válido");
                return res.status(404).json({ error: error.message });
            }
            res.status(200).send("Token válido, define tu nueva contraseña");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Actualizar la contraseña
    static resetPassword = async (req: Request, res: Response) => {
        try {
            const { token } = req.params;
            const { password } = req.body;

            const tokenExists = await Token.findOne({ token });
            if (!tokenExists) {
                const error = new Error("Token no válido");
                return res.status(404).json({ error: error.message });
            }

            const user = await User.findById(tokenExists.user);
            if (!user) {
                const error = new Error("Usuario no encontrado");
                return res.status(404).json({ error: error.message });
            }

            user.password = await hashPassword(password);

            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

            res.status(200).send("El password se modificó correctamente");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Cerrar sesion
    static logout = (_req: Request, res: Response) => {
        // No se utiliza un bloque try-catch en este controlador
        // Elimina la cookie del token
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).send("Sesión cerrada correctamente");
    };
}
