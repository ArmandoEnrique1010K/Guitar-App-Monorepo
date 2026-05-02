import { NotebookController } from "controllers/Notebook/NotebookController";
import { Router } from "express";
import { body } from "express-validator";
import { authenticate } from "middlewares/auth";
import { handleInputErrors } from "middlewares/validation";

const router = Router();

router.post(
  "/",
  authenticate,
  body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
  handleInputErrors,
  NotebookController.createNotebook,
);

router.get("/", authenticate, NotebookController.getAllNotebooks);
export default router;
