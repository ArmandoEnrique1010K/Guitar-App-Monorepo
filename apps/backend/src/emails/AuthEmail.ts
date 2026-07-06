import { Resend } from "resend";

// Información necesaria para enviar los correos de autenticación
interface IEmail {
    email: string;
    name: string;
    token: string;
}

// Crea una instancia del cliente de Resend.
// Valida que la API Key exista antes de inicializar el cliente.
const getResend = () => {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY no está definida");
    }

    return new Resend(process.env.RESEND_API_KEY);
};

// ADVERTENCIA:
// En un entorno de desarrollo, resend funciona solamente con la API KEY de prueba, puede enviar un correo
// al email del usuario que creó la API KEY de prueba.

// En un entorno de producción se tendria que comprar un dominio, como por ejemplo, en Cloudflare; para
// permitir el envio de emails a cualquier usuario.

//

// Servicio encargado del envío de correos relacionados con la autenticación.
export class AuthEmail {
    // Envía el correo de confirmación de cuenta.
    // El usuario deberá ingresar el token recibido para activar su cuenta.
    static sendConfirmationEmail = async (user: IEmail) => {
        const resend = getResend();

        try {
            const response = await resend.emails.send({
                from: `${process.env.EMAIL_FROM}`,
                to: user.email,
                subject: "GuitarApp - Confirma tu cuenta",
                html: `<p>${user.name} lograstes crear tu cuenta en GuitarApp, para continuar debes confirmar tu cuenta</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
                <p>E ingresa el código: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>
                <br>
                <p>Si tú no creaste esta cuenta, ignora este mensaje</p>`,
            });

            console.log("RESPUESTA RESEND:", response);
            return response;
        } catch (error) {
            console.error("Error enviando email de confirmación:", error);
            throw error;
        }
    };

    // Envía el correo para restablecer la contraseña.
    // El usuario deberá ingresar el token recibido para crear una nueva contraseña.
    static sendPasswordResetToken = async (user: IEmail) => {
        const resend = getResend();
        try {
            const response = await resend.emails.send({
                from: `${process.env.EMAIL_FROM}`,
                to: user.email,
                subject: "GuitarApp - Reestablecer la contraseña",
                html: `<p>${user.name} si has solicitado reestablecer tu contraseña, visita el siguiente enlace</p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer contraseña</a>
                <p>E ingresa el código: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>
                <br>
                <p>Si tú no creaste esta cuenta, ignora este mensaje</p>`,
            });

            return response;
        } catch (error) {
            console.error(
                "Error enviando email de restablecimiento de contraseña:",
                error,
            );
            throw error;
        }
    };
}
