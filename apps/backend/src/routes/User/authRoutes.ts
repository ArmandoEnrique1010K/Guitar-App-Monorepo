import { Router } from "express";
import { body, param } from "express-validator";
import { AuthController } from "controllers/User/AuthController";
import { handleInputErrors } from "middlewares/validation";

const router = Router();
router.post(
    "/create-account",
    // body sirve para obtener el contenido escrito en el campo
    // notEmpty valida que el campo no vaya vacio
    body("name").notEmpty().withMessage("El nombre no puede ir vacio"),

    // isLength valida que la contraseña tenga al menos 8 caracteres
    body("password")
        .isLength({ min: 8 })
        .withMessage("La contraseña es muy corta, minimo 8 caracteres"),

    // custom valida que 2 campos tengan el mismo valor
    body("password_confirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            // El mensaje de error se devuelve en un objeto Error
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    }),

    // isEmail valida que el email sea valido
    body("email").isEmail().withMessage("Email no válido"),
    handleInputErrors,
    AuthController.createAccount,
);

router.post(
    "/confirm-account",
    body("token").notEmpty().withMessage("El Token no puede ir vacio"),
    handleInputErrors,
    AuthController.confirmAccount,
);

router.post(
    "/login",
    body("email").isEmail().withMessage("Email no válido"),
    body("password").notEmpty().withMessage("La contraseña no puede ir vacia"),
    handleInputErrors,
    AuthController.login,
);
router.post(
    "/request-confirmation-code",
    body("email").isEmail().withMessage("Email no válido"),
    handleInputErrors,
    AuthController.requestConfirmationCode,
);

router.post(
    "/request-password-reset",
    body("email").isEmail().withMessage("Email no válido"),
    handleInputErrors,
    AuthController.requestPasswordReset,
);

router.post(
    "/validate-password-reset-token",
    body("token").notEmpty().withMessage("El Token no puede ir vacio"),
    handleInputErrors,
    AuthController.validatePasswordResetToken,
);

router.post(
    "/reset-password/:token",
    // param sirve para obtener el valor de un parametro dinamico del endpoint
    // isNumeric valida que el token sea un numero
    param("token").isNumeric().withMessage("Token no válido"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("La contraseña es muy corta, minimo 8 caracteres"),
    body("password_confirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    }),
    handleInputErrors,
    AuthController.resetPassword,
);

router.post("/logout", AuthController.logout);

export default router;
