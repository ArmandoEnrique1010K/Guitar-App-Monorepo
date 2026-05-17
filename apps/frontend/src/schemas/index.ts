import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup
    .string()
    .required("El email es obligatorio")
    .email("Email no válido"),

    password: yup
    .string()
    .required("La contraseña es obligatoria"),
});
