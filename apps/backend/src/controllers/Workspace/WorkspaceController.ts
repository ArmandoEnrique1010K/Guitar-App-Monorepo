import type { Request, Response } from "express";
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
            req.workspace!.name = req.body.name;
            await req.workspace!.save();
            res.send("Espacio de trabajo actualizado");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    static deleteWorkspace = async (req: Request, res: Response) => {
        try {
            await req.workspace!.deleteOne();
            res.send("Espacio de trabajo eliminado");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };
}
