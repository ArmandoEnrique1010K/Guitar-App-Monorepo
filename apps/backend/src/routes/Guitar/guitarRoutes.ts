import { Router } from "express";
import { GuitarController } from "controllers/Guitar/GuitarController";

// Crea una instancia de Router para manejar las rutas de guitarras
const router = Router();

// Se concatena la ruta base con la ruta especifica
// Una buena practica es separar el controlador de las rutas
router.get("/", GuitarController.getAllGuitars);

// Exportacion por defecto del router
export default router;
