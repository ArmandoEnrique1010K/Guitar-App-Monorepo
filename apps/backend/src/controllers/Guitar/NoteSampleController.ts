import type { Request, Response } from "express";
import NoteSample from "models/Guitar/NoteSample";

export class NoteSampleController {
  static getAllNoteSamples = async (req: Request, res: Response) => {
    try {
      const { guitarId } = req.params;

      const noteSamples = await NoteSample.find({ guitar: guitarId }).select(
        "-guitar -__v",
      );
      res.json(noteSamples);
    } catch (error) {
      console.log(error);
    }
  };
}
