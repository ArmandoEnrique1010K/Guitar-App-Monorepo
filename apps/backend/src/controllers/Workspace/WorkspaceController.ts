import type { Request, Response } from "express";
import Workspace from "models/Workspace/Workspace";

export class WorkSpaceController {
    // Crea un espacio de trabajo
    static createWorkspace = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            const userId = req.user!._id;

            // Verifica si el usuario ya tiene un espacio de trabajo
            // registrado con el mismo nombre.
            const workspaceExists = await Workspace.findOne({
                user: userId,
                name: name,
            });

            if (workspaceExists) {
                const error = new Error("Ese nombre ya esta registrado");
                return res.status(409).json({ error: error.message });
            }

            // Crea el nuevo espacio de trabajo asociado al usuario.
            const workspace = new Workspace({
                name,
                user: userId,
            });

            await workspace.save();

            // Devuelve un objeto con los datos del espacio de trabajo
            res.status(201).json({
                _id: workspace._id,
                name: workspace.name,
                presetCount: 0,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Obtiene todos los espacios de trabajo del usuario autenticado.
    static getAllWorkspaces = async (req: Request, res: Response) => {
        try {
            const workspaces = await Workspace.aggregate([
                // Filtra únicamente los espacios de trabajo del usuario.
                { $match: { user: req.user?._id } },

                // Obtiene todas las configuraciones (presets) asociadas
                // a cada espacio de trabajo.
                {
                    $lookup: {
                        from: "presets",
                        localField: "_id",
                        foreignField: "workspace",
                        as: "presets",
                    },
                },

                // Agrega un nuevo campo con la cantidad de configuraciones
                // que contiene cada espacio de trabajo.
                {
                    $addFields: {
                        presetCount: { $size: "$presets" },
                    },
                },

                // Excluye información que no será enviada al cliente.
                {
                    $project: {
                        presets: 0,
                        user: 0,
                        __v: 0,
                    },
                },
            ]);
            res.status(200).json(workspaces);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Actualiza el nombre de un espacio de trabajo.
    static updateWorkspace = async (req: Request, res: Response) => {
        try {
            // Obtiene el nuevo nombre enviado por el cliente.
            const newName = req.body.name.trim();

            // Evita actualizar si el nombre no ha cambiado.
            if (req.workspace?.name === newName) {
                return res.status(400).json({ error: "El nombre es el mismo" });
            }

            // Verifica que el usuario no tenga otro espacio de trabajo
            // con el mismo nombre.
            const existingWorkspace = await Workspace.findOne({
                user: req.user?._id,
                name: newName,
                _id: { $ne: req.workspace?._id },
            });

            if (existingWorkspace) {
                return res.status(409).json({ error: "El nombre ya existe" });
            }

            // Actualiza el nombre del espacio de trabajo.
            req.workspace!.name = newName;

            await req.workspace!.save();

            // En la respuesta se omite el campo 'presetCount' porque no es necesario
            // cuando se trata de actualizar un espacio de trabajo
            res.status(200).json({
                _id: req.workspace!._id,
                name: req.workspace!.name,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Elimina un espacio de trabajo.
    static deleteWorkspace = async (req: Request, res: Response) => {
        try {
            // Elimina el espacio de trabajo obtenido por el middleware.
            await req.workspace!.deleteOne();

            // Respuesta vacía (HTTP 204 según la configuración).
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };
}
