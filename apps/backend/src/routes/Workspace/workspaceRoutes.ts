import { WorkSpaceController } from "controllers/Workspace/WorkspaceController";
import { Router } from "express";
import { body, param } from "express-validator";
import { authenticate } from "middlewares/User/auth";
import { handleInputErrors } from "middlewares/validation";
import {
    isAuthorOfWorkspace,
    workspaceExists,
} from "middlewares/Workspace/workspace";

const router = Router();

// A todas las rutas, van a pasar primero por el middleware de authenticate
router.use(authenticate);

router.post(
    "/",
    body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
    handleInputErrors,
    WorkSpaceController.createWorkspace,
);

router.get("/", WorkSpaceController.getAllWorkspaces);

// A partir de las siguientes rutas, siempre debe verificar que el cuaderno exista
router.param("workspaceId", workspaceExists);

router.put(
    "/:workspaceId",
    param("workspaceId").isMongoId().withMessage("ID no válido"),
    body("name")
        .notEmpty()
        .withMessage("El nombre del cuaderno es obligatorio"),
    handleInputErrors,
    isAuthorOfWorkspace,
    WorkSpaceController.updateWorkspace,
);

router.delete(
    "/:workspaceId",
    param("workspaceId").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    isAuthorOfWorkspace,
    WorkSpaceController.deleteWorkspace,
);

export default router;
