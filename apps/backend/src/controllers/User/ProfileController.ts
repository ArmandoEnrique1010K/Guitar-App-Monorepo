import type { Request, Response } from "express";
import User from "models/User/User";
import { checkPassword, hashPassword } from "utils/auth";

export class ProfileController {
  static user = async (req: Request, res: Response) => {
    return res.json(req.user);
  };

  static updateProfile = async (req: Request, res: Response) => {
    const { name, email } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists && userExists.id.toString() !== req.user?._id.toString()) {
      const error = new Error("Ese email ya esta registrado");
      return res.status(409).json({ error: error.message });
    }
    if (!req.user) {
      return res.status(401).json({ error: "No autenticado" });
    }

    req.user.name = name;
    req.user.email = email;

    try {
      await req.user.save();
      res.send("Perfil actualizado correctamente");
    } catch (error) {
      res.status(500).send("Hubo un error");
    }
  };

  static updateCurrentUserPassword = async (req: Request, res: Response) => {
    const { current_password, password } = req.body;

    const user = await User.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const isPasswordCorrect = await checkPassword(
      current_password,
      user.password,
    );
    if (!isPasswordCorrect) {
      const error = new Error("El Password actual es incorrecto");
      return res.status(401).json({ error: error.message });
    }

    try {
      user.password = await hashPassword(password);
      await user.save();
      res.send("El Password se modificó correctamente");
    } catch (error) {
      res.status(500).send("Hubo un error");
    }
  };

  static checkPassword = async (req: Request, res: Response) => {
    const { password } = req.body;

    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const isPasswordCorrect = await checkPassword(password, user.password);
    if (!isPasswordCorrect) {
      const error = new Error("El Password es incorrecto");
      return res.status(401).json({ error: error.message });
    }

    res.send("Password Correcto");
  };
}
