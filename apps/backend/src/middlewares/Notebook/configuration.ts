import type { Request, Response, NextFunction } from "express";

export async function isAuthorOfConfiguration(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const notebook = req.configuration.notebook as any;

    if (req.user?._id.toString() !== notebook.user) {
      return res.status(400).json({ error: "Acción no válida" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
