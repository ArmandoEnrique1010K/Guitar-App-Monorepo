import type { Request, Response } from "express";
import NoteSample from "models/Guitar/NoteSample";

export class NoteSampleController {
    // Obtiene todas las notas musicales, requiere el ID de la guitarra como parametro
    static getAllNoteSamples = async (req: Request, res: Response) => {
        try {
            const { guitarId } = req.params;

            const noteSamples = await NoteSample.find({
                guitar: guitarId,
            }).select("-guitar -__v");
            res.status(200).json(noteSamples);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };
}
