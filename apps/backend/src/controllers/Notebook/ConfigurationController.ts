import type { Request, Response } from "express";
import Configuration from "models/Notebook/Configuration";

export class ConfigurationController {
  static createConfiguration = async (req: Request, res: Response) => {
    try {
      const {
        name,
        volume,
        holdToPlay,
        muteOnSameString,
        muteOnDifferentString,
        loopMode,
        loopIntervalMs,
        autoMute,
        autoMuteDelayMs,
        rootChord,
        lockOpenString,
        stringOrder,
      } = req.body;

      const { notebookId, guitarId } = req.params;

      // El manejo del nombre de la configuracion
      // Si el nombre "intro" existe en la BD por ID de usuario y ID de notebook,
      // Entonces debe renombrarlo a "intro 2", y si insiste con el mismo nombre,
      // Debe renombrarlo a "intro 3" y asi sucesivamente

      // Crear una configuracion
      const configuration = new Configuration({
        name,
        // Debe ser el notebook y la guitarra seleccionada por URL
        notebook: notebookId,
        guitar: guitarId,

        guitarBehavior: {
          volume,
          holdToPlay,
          muteOnSameString,
          muteOnDifferentString,
        },

        playbackSettings: {
          loopMode,
          loopIntervalMs,
          autoMute,
          autoMuteDelayMs,
        },

        visualMapping: {
          rootChord,
          lockOpenString,
          stringOrder,
        },
      });

      await configuration.save();

      res.send("Se guardo la configuración actual");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getAllConfigurations = async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  };
}
