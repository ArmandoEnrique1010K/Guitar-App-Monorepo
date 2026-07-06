import { Router } from "express";
import { body } from "express-validator";
import { authenticate } from "middlewares/User/auth";
import { handleInputErrors } from "middlewares/validation";
import { ProfileController } from "controllers/User/ProfileController";

const router = Router();

// Para utilizar el middleware en todas las rutas se puede optar por usar
// router.use() seguido del middleware

// Con ello se evita llamar al middleware en cada ruta
router.use(authenticate);

router.get(
    "/user",
    // Llama al middleware desde la ruta
    // authenticate,
    ProfileController.getCurrentUser,
);

router.put(
    "/",
    body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
    body("email").isEmail().withMessage("Email no válido"),
    handleInputErrors,
    ProfileController.updateProfile,
);

router.put(
    "/password",
    body("current_password")
        .notEmpty()
        .withMessage("La contraseña actual no puede estar vacia"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("La contraseña es muy corta, minimo 8 caracteres"),
    body("password_confirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Los Password no son iguales");
        }
        return true;
    }),
    handleInputErrors,
    ProfileController.updatePassword,
);

export default router;
