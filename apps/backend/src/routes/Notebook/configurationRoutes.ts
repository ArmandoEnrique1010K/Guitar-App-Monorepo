import { ConfigurationController } from "controllers/Notebook/ConfigurationController";
import { Router } from "express";
import { body, param } from "express-validator";
import {
  configurationExists,
  generateNameForCreate,
  generateNameForUpdate,
  isAuthorOfConfiguration,
} from "middlewares/Notebook/configuration";
import { authenticate } from "middlewares/User/auth";
import { handleInputErrors } from "middlewares/validation";

const router = Router();

router.use(authenticate);

router.post(
  "/notebook/:notebookId/guitar/:guitarId",
  param("notebookId").isMongoId().withMessage("ID no válido"),
  param("guitarId").isMongoId().withMessage("ID no válido"),
  body("name").trim().notEmpty().withMessage("El nombre no puede ir vacio"),
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
  body("effects").isArray(),
  handleInputErrors,
  generateNameForCreate,
  ConfigurationController.createConfiguration,
);

router.get(
  "/notebook/:notebookId",
  ConfigurationController.getAllConfigurations,
);

router.param("configurationId", configurationExists);

router.put(
  "/:configurationId/guitar/:guitarId",
  param("configurationId").isMongoId().withMessage("ID no válido"),
  param("guitarId").isMongoId().withMessage("ID no válido"),

  body("name").trim().notEmpty().withMessage("El nombre no puede ir vacio"),
  // GuitarBehavior
  body("volume"),
  body("holdToPlay"),
  body("muteOnSameString"),
  body("muteOnDifferentString"),

  // PlaybackSettings
  body("loopMode"),
  body("loopIntervalMs"),
  body("autoMute"),
  body("autoMuteDelayMs"),

  // VisualMapping
  body("rootChord"),
  body("lockOpenString"),
  body("stringOrder"),
  body("effects").isArray(),
  handleInputErrors,
  generateNameForUpdate,
  isAuthorOfConfiguration,
  ConfigurationController.updateConfiguration,
);

router.delete(
  "/:configurationId",
  param("configurationId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  isAuthorOfConfiguration,
  ConfigurationController.deleteConfiguration,
);

export default router;
