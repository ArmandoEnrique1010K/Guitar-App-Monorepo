import { NotebookController } from "controllers/Notebook/NotebookController";
import { Router } from "express";
import { body, param } from "express-validator";
import {
  isAuthorOfNotebook,
  notebookExists,
} from "middlewares/Notebook/notebook";
import { authenticate } from "middlewares/User/auth";
import { handleInputErrors } from "middlewares/validation";

const router = Router();

// A todas las rutas, van a pasar primero por el middleware de authenticate
router.use(authenticate);

router.post(
  "/",
  body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
  handleInputErrors,
  NotebookController.createNotebook,
);

router.get("/", NotebookController.getAllNotebooks);

// A partir de las siguientes rutas, siempre debe verificar que el cuaderno exista
router.param("notebookId", notebookExists);

router.put(
  "/:notebookId",
  param("notebookId").isMongoId().withMessage("ID no válido"),
  body("name").notEmpty().withMessage("El nombre del cuaderno es obligatorio"),
  handleInputErrors,
  isAuthorOfNotebook,
  NotebookController.updateNotebook,
);

router.delete(
  "/:notebookId",
  param("notebookId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  isAuthorOfNotebook,
  NotebookController.deleteNotebook,
);

export default router;
