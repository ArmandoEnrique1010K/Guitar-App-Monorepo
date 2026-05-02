import { ConfigurationController } from "controllers/Notebook/ConfigurationController";
import { Router } from "express";
import { body, param } from "express-validator";
import { authenticate } from "middlewares/User/auth";
import { handleInputErrors } from "middlewares/validation";

const router = Router();

router.use(authenticate);

router.post(
  "/:notebookId/:guitarId",
  param("notebookId").isMongoId().withMessage("ID no válido"),
  param("guitarId").isMongoId().withMessage("ID no válido"),
  body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
  // GuitarBehaviorSchema

  body("volume"),
  body("holdToPlay"),
  body("muteOnSameString"),
  body("muteOnDifferentString"),

  // PlaybackSettingsSchema
  body("loopMode"),
  body("loopIntervalMs"),
  body("autoMute"),
  body("autoMuteDelayMs"),

  // VisualMappingSchema
  body("rootChord"),
  body("lockOpenString"),
  body("stringOrder"),
  handleInputErrors,
  ConfigurationController.createConfiguration,
);
export default router;
