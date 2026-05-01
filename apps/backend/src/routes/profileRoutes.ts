import { ProfileController } from "controllers/ProfileController";
import { Router } from "express";
import { body } from "express-validator";
import { authenticate } from "middlewares/auth";
import { handleInputErrors } from "middlewares/validation";

const router = Router();

router.get("/user", authenticate, ProfileController.user);

router.put(
  "/",
  authenticate,
  body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
  body("email").isEmail().withMessage("Email no válido"),
  handleInputErrors,
  ProfileController.updateProfile,
);

router.post(
  "/update-password",
  authenticate,
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
  ProfileController.updateCurrentUserPassword,
);

router.post(
  "/check-password",
  authenticate,
  body("password").notEmpty().withMessage("La contraseña no puede ir vacia"),
  handleInputErrors,
  ProfileController.checkPassword,
);

export default router;
