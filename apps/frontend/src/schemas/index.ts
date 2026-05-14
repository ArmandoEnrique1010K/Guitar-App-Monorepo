import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Email no válido"),
  // .required("El email es obligatorio"),

  password: yup
    .string()
    // .min(8, "La contraseña es muy corta, minimo 8 caracteres")
    .required("La contraseña es obligatoria"),
});
