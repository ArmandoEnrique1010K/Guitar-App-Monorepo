import Notebook from "models/Notebook/Notebook";
import type { Request, Response } from "express";

export class NotebookController {
  static createNotebook = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const notebookExists = await Notebook.findOne({ name });
      if (notebookExists) {
        const error = new Error("El cuaderno ya esta registrado");
        return res.status(409).json({ error: error.message });
      }
      const userId = req.user?._id;

      // Crear cuaderno de configuraciones
      const notebook = new Notebook({
        name,
        user: userId,
      });

      await notebook.save();

      res.send("Se creo un nuevo cuaderno");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getAllNotebooks = async (req: Request, res: Response) => {
    try {
      //   const notebooks = await Notebook.find({
      //     user: req.user?._id,
      //   });

      //   res.json(notebooks);

      const notebooks = await Notebook.aggregate([
        { $match: { user: req.user?._id } },

        {
          $lookup: {
            from: "configurations",
            localField: "_id",
            foreignField: "notebook",
            as: "configurations",
          },
        },
        // Nuevos campos
        {
          $addFields: {
            configCount: { $size: "$configurations" },
          },
        },
        // Ocultar campos
        {
          $project: {
            configurations: 0, // opcional: no devolver array completo
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

  static updateNotebook = async (req: Request, res: Response) => {
    try {
      req.notebook!.name = req.body.name;
      await req.notebook!.save();
      res.send("Cuaderno actualizado");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteNotebook = async (req: Request, res: Response) => {
    try {
      await req.notebook!.deleteOne();
      res.send("Cuaderno eliminado");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
