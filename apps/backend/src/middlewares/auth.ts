import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "models/User";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    const error = new Error("No Autorizado");
    return res.status(401).json({ error: error.message });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findById(decoded.id).select("_id name email");

      if (!user) {
        return res.status(401).json({ error: "Token inválido" });
      }

      req.user = user;
      return next();
    }
  } catch (error) {
    res.status(500).json({ error: "Token inválido" });
  }
};
