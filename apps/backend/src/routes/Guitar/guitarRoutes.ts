import { GuitarController } from "controllers/Guitar/GuitarController";
import { Router } from "express";

const router = Router();
router.get("/", GuitarController.getAllGuitars);

export default router;
