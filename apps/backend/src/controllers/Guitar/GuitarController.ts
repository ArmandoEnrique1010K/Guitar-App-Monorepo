import type { Request, Response } from "express";
import Guitar from "models/Guitar/Guitar";

export class GuitarController {
  static getAllGuitars = async (req: Request, res: Response) => {
    try {
      const guitars = await Guitar.find({}).select("-__v");
      res.json(guitars);
    } catch (error) {
      console.log(error);
    }
  };
}
