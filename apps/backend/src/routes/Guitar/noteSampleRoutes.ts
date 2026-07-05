import { Router } from "express";
import { param } from "express-validator";
import { NoteSampleController } from "controllers/Guitar/NoteSampleController";
import { handleInputErrors } from "middlewares/validation";

const router = Router();

// Se tiene un dynamic param que es el ID de la guitarra
// Para validar el parametro se utiliza la función param de express-validator
// isMongoId() valida que el parametro sea un ID de MongoDB y withMessage contiene
// un mensaje de error que se retorna si el parametro no es válido
router.get(
    "/guitar/:guitarId",
    param("guitarId").isMongoId().withMessage("ID no válido"),
    // Llama al middleware para devolver el mensaje de error si el parametro no es válido
    handleInputErrors,
    NoteSampleController.getAllNoteSamples,
);

export default router;
