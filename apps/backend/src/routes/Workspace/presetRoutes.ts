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

    // En este caso se necesita que el body tenga todas las propiedades
    // Se asume que todas esas propiedades están presentes en el body
    // y que tienen los tipos correctos desde el frontend

    // En el caso de que falte un campo, se establece el valor por defecto
    // que esta definido en la entidad Preset

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

    // Se valida que effects sea un arreglo
    body("effects").isArray(),
    handleInputErrors,

    // Llama al middleware para renombrar el nombre
    generateNameForCreate,
    PresetController.createPreset,
);

router.get("/workspace/:workspaceId", PresetController.getAllPresets);

// Llama al middleware para verificar que la configuración exista
router.param("presetId", presetExists);

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

    handleInputErrors,
    // Middleware para verificar si el usuario autenticado es el autor de la
    // configuración que se va a actualizar
    isAuthorOfPreset,
    generateNameForUpdate,

    PresetController.updatePreset,
);

router.delete(
    "/:presetId",
    param("presetId").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    isAuthorOfPreset,
    PresetController.deletePreset,
);

export default router;
