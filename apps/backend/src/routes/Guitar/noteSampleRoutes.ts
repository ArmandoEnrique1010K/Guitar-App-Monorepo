import { NoteSampleController } from "controllers/Guitar/NoteSampleController";
import { Router } from "express";
import { param } from "express-validator";

const router = Router();
router.get(
  "/guitar/:guitarId",
  param("guitarId").isMongoId().withMessage("ID no válido"),
  NoteSampleController.getAllNoteSamples,
);

export default router;
