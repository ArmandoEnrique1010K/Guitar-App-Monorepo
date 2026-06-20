import { PresetController } from "controllers/Workspace/PresetController";
import { Router } from "express";
import { body, param } from "express-validator";
import { authenticate } from "middlewares/User/auth";
import { handleInputErrors } from "middlewares/validation";
import {
    generateNameForCreate,
    generateNameForUpdate,
    isAuthorOfPreset,
    presetExists,
} from "middlewares/Workspace/preset";

const router = Router();

router.use(authenticate);

router.post(
    "/workspace/:workspaceId/guitar/:guitarId",
    param("workspaceId").isMongoId().withMessage("ID no válido"),
    param("guitarId").isMongoId().withMessage("ID no válido"),
    body("name").trim().notEmpty().withMessage("El nombre no puede ir vacio"),
    // GuitarBehaviorSchema

    body("volume"),
    body("holdToPlay"),
    body("allowSameStringOverlap"),
    body("allowDifferentStringOverlap"),

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
    PresetController.createPreset,
);

router.get("/workspace/:workspaceId", PresetController.getAllPresets);

router.param("presetId", presetExists);
// router.use(presetExists);

router.put(
    "/:presetId/guitar/:guitarId",
    param("presetId").isMongoId().withMessage("ID no válido"),
    param("guitarId").isMongoId().withMessage("ID no válido"),

    body("name").trim().notEmpty().withMessage("El nombre no puede ir vacio"),
    // GuitarBehavior
    body("volume"),
    body("holdToPlay"),
    body("allowSameStringOverlap"),
    body("allowDifferentStringOverlap"),

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
    //presetExists,
    handleInputErrors,
    generateNameForUpdate,
    isAuthorOfPreset,
    PresetController.updatePreset,
);

router.delete(
    "/:presetId",
    param("presetId").isMongoId().withMessage("ID no válido"),
    // presetExists,
    handleInputErrors,
    isAuthorOfPreset,
    PresetController.deletePreset,
);

export default router;
