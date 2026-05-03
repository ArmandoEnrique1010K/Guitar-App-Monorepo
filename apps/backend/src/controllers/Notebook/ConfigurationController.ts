import type { Request, Response } from "express";
import Guitar from "models/Guitar/Guitar";
import Configuration from "models/Notebook/Configuration";

export class ConfigurationController {
  static createConfiguration = async (req: Request, res: Response) => {
    try {
      const {
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
      const name = req.configurationName;

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

  // Debe obtener todas las configuraciones por id de notebook con todos los parametros
  static getAllConfigurations = async (req: Request, res: Response) => {
    try {
      const { notebookId } = req.params;

      // Con select puedes quitar los campos que no son necesarios
      const configurations = await Configuration.find({
        notebook: notebookId,
      }).select("-notebook -guitar -__v");

      res.json(configurations);
    } catch (error) {
      console.log(error);
    }
  };

  static updateConfiguration = async (req: Request, res: Response) => {
    try {
      const { guitarId } = req.params;
      const {
        // GuitarBehavior
        volume,
        holdToPlay,
        muteOnSameString,
        muteOnDifferentString,
        // PlaybackSettings
        loopMode,
        loopIntervalMs,
        autoMute,
        autoMuteDelayMs,
        // VisualMapping
        rootChord,
        lockOpenString,
        stringOrder,
      } = req.body;

      const guitarExists = await Guitar.findById(guitarId);
      if (!guitarExists) {
        const error = new Error("Guitarra no encontrada");
        return res.status(404).json({ error: error.message });
      }

      req.configuration!.guitar = guitarExists._id;

      // Recordar que el nombre se obtiene del req.configurationName porque ha pasado por el middleware
      req.configuration!.name = req.configurationName!;

      req.configuration!.guitarBehavior.volume = volume;
      req.configuration!.guitarBehavior.holdToPlay = holdToPlay;
      req.configuration!.guitarBehavior.muteOnSameString = muteOnSameString;
      req.configuration!.guitarBehavior.muteOnDifferentString =
        muteOnDifferentString;

      req.configuration!.playbackSettings.loopMode = loopMode;
      req.configuration!.playbackSettings.loopIntervalMs = loopIntervalMs;
      req.configuration!.playbackSettings.autoMute = autoMute;
      req.configuration!.playbackSettings.autoMuteDelayMs = autoMuteDelayMs;

      req.configuration!.visualMapping.rootChord = rootChord;
      req.configuration!.visualMapping.lockOpenString = lockOpenString;
      req.configuration!.visualMapping.stringOrder = stringOrder;

      await req.configuration!.save();
      res.send("Configuración actualizada");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteConfiguration = async (req: Request, res: Response) => {
    try {
      await req.configuration!.deleteOne();
      res.send("Configuración eliminada");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
