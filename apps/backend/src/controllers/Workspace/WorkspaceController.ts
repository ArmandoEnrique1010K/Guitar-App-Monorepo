import type { Request, Response } from "express";
import Preset from "models/Workspace/Preset";
import Workspace from "models/Workspace/Workspace";

export class WorkSpaceController {
    static createWorkspace = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;

            const workspaceExists = await Workspace.findOne({ name });
            if (workspaceExists) {
                const error = new Error("Ese nombre ya esta registrado");
                return res.status(409).json({ error: error.message });
            }
            const userId = req.user?._id;

            // Crear cuaderno de configuraciones
            const workspace = new Workspace({
                name,
                user: userId,
            });

            await workspace.save();

            // res.send("Se creo un nuevo espacio de trabajo");

            res.json({
                _id: workspace._id,
                name: workspace.name,
                presetCount: 0,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    static getAllWorkspaces = async (req: Request, res: Response) => {
        try {
            const notebooks = await Workspace.aggregate([
                { $match: { user: req.user?._id } },

                {
                    $lookup: {
                        from: "presets",
                        localField: "_id",
                        foreignField: "workspace",
                        as: "presets",
                    },
                },
                // Nuevos campos
                {
                    $addFields: {
                        presetCount: { $size: "$presets" },
                    },
                },
                // Ocultar campos
                {
                    $project: {
                        presets: 0, // opcional: no devolver array completo
                        user: 0,
                        __v: 0,
                    },
                },
            ]);
            res.json(notebooks);
        } catch (error) {
            console.log(error);
        }
    };

    static updateWorkspace = async (req: Request, res: Response) => {
        try {
            // Si no ha editado el nombre
            const newName = req.body.name.trim();

            if (req.workspace?.name === newName) {
                return res.status(400).json({ error: "El nombre es el mismo" });
            }

            // Debe verificar que el nombre no coincida con un nombre del resto de workspace pertenecientes al usuario
            const existingWorkspace = await Workspace.findOne({
                user: req.user?._id,
                name: newName,
                _id: { $ne: req.workspace?._id },
            });

            if (existingWorkspace) {
                return res.status(409).json({ error: "El nombre ya existe" });
            }

            // const presetCount = await Preset.countDocuments({
            //     workspace: req.workspace!._id,
            // });

            req.workspace!.name = newName;
            await req.workspace!.save();

            // res.send("Espacio de trabajo actualizado");
            res.json({
                _id: req.workspace!._id,
                name: req.workspace!.name,
                // presetCount: presetCount,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    static deleteWorkspace = async (req: Request, res: Response) => {
        try {
            await req.workspace!.deleteOne();

            // No hay respuesta al eliminar
            // res.send("Espacio de trabajo eliminado");
            res.send();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };
}
