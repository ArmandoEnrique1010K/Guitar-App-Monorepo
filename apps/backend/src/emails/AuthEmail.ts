import { Resend } from "resend";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

const getResend = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY no está definida");
  }

  return new Resend(process.env.RESEND_API_KEY);
};

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    const resend = getResend();
    try {
      const response = await resend.emails.send({
        from: `${process.env.EMAIL_FROM}`,
        to: user.email,
        subject: "GuitarApp - Confirma tu cuenta",
        html: `
        <p>${user.name} lograstes crear tu cuenta en GuitarApp, para continuar debes confirmar tu cuenta</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
        <p>E ingresa el código: <b>${user.token}</b></p>
        <p>Este token expira en 10 minutos</p>
        <br>
        <p>Si tú no creaste esta cuenta, ignora este mensaje</p>
      `,
      });

      return response;
    } catch (error) {
      console.error("Error enviando email de confirmación:", error);
      throw error;
    }
  };

  static sendPasswordResetToken = async (user: IEmail) => {
    const resend = getResend();
    try {
      const response = await resend.emails.send({
        from: `${process.env.EMAIL_FROM}`,
        to: user.email,
        subject: "GuitarApp - Reestablecer la contraseña",
        html: `
        <p>${user.name} si has solicitado reestablecer tu contraseña, visita el siguiente enlace</p>
        <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer contraseña</a>
        <p>E ingresa el código: <b>${user.token}</b></p>
        <p>Este token expira en 10 minutos</p>
        <br>
        <p>Si tú no creaste esta cuenta, ignora este mensaje</p>
      `,
      });

      return response;
    } catch (error) {
      console.error("Error enviando email de confirmación:", error);
      throw error;
    }
  };
}
