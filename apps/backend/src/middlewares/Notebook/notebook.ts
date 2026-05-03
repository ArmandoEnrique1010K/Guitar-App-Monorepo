import type { Request, Response, NextFunction } from "express";
import Notebook from "models/Notebook/Notebook";

export async function notebookExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { notebookId } = req.params;
    const notebook = await Notebook.findById(notebookId);
    if (!notebook) {
      const error = new Error("Cuaderno no encontrado");
      return res.status(404).json({ error: error.message });
    }
    req.notebook = notebook;
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}

export async function isAuthorOfNotebook(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (req.user?._id.toString() !== req.notebook?.user._id.toString()) {
      const error = new Error("Acción no válida");
      return res.status(400).json({ error: error.message });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
