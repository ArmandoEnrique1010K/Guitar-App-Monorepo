import type { Request, Response } from "express";
import Guitar from "models/Guitar/Guitar";
import Preset from "models/Workspace/Preset";

export class PresetController {
    static createPreset = async (req: Request, res: Response) => {
        try {
            const {
                volume,
                holdToPlay,
                allowSameStringOverlap,
                allowDifferentStringOverlap,
                loopMode,
                loopIntervalMs,
                autoMute,
                autoMuteDelayMs,
                rootChord,
                lockOpenString,
                stringOrder,
                effects,
            } = req.body;

            const { workspaceId, guitarId } = req.params;
            const name = req.presetName;

            // Validar efectos
            // const allowedEffects = ["distortion", "reverb", "tremolo", "eq3"];

            // for (const effect of effects) {
            //   if (!allowedEffects.includes(effect.type)) {
            //     throw new Error("Tipo de efecto inválido");
            //   }

            //   if (typeof effect.order !== "number") {
            //     throw new Error("Order inválido");
            //   }

            //   if (typeof effect.enabled !== "boolean") {
            //     throw new Error("Enabled inválido");
            //   }

            //   if (typeof effect.params !== "object") {
            //     throw new Error("Params inválido");
            //   }
            // }

            // Crear una configuracion
            const preset = new Preset({
                name,
                // Debe ser el workspace y la guitarra seleccionada por URL
                workspace: workspaceId,
                guitar: guitarId,

                guitarBehavior: {
                    volume,
                    holdToPlay,
                    allowSameStringOverlap,
                    allowDifferentStringOverlap,
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

                effects,
            });

            await preset.save();

            res.send("Se guardo la configuración actual");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Debe obtener todas las configuraciones por id de notebook con todos los parametros
    static getAllPresets = async (req: Request, res: Response) => {
        try {
            const { workspaceId } = req.params;

            // Con select puedes quitar los campos que no son necesarios
            const presets = await Preset.find({
                workspace: workspaceId,
            }).select("-workspace -__v");

            res.json(presets);
        } catch (error) {
            console.log(error);
        }
    };

    static updatePreset = async (req: Request, res: Response) => {
        try {
            const { guitarId } = req.params;
            const {
                // GuitarBehavior
                volume,
                holdToPlay,
                allowSameStringOverlap,
                allowDifferentStringOverlap,
                // PlaybackSettings
                loopMode,
                loopIntervalMs,
                autoMute,
                autoMuteDelayMs,
                // VisualMapping
                rootChord,
                lockOpenString,
                stringOrder,
                effects,
            } = req.body;

            const guitarExists = await Guitar.findById(guitarId);
            if (!guitarExists) {
                const error = new Error("Guitarra no encontrada");
                return res.status(404).json({ error: error.message });
            }

            req.preset!.guitar = guitarExists._id;

            // Recordar que el nombre se obtiene del req.configurationName porque ha pasado por el middleware
            req.preset!.name = req.presetName!;

            req.preset!.guitarBehavior.volume = volume;
            req.preset!.guitarBehavior.holdToPlay = holdToPlay;
            req.preset!.guitarBehavior.allowSameStringOverlap =
                allowSameStringOverlap;
            req.preset!.guitarBehavior.allowDifferentStringOverlap =
                allowDifferentStringOverlap;

            req.preset!.playbackSettings.loopMode = loopMode;
            req.preset!.playbackSettings.loopIntervalMs = loopIntervalMs;
            req.preset!.playbackSettings.autoMute = autoMute;
            req.preset!.playbackSettings.autoMuteDelayMs = autoMuteDelayMs;

            req.preset!.visualMapping.rootChord = rootChord;
            req.preset!.visualMapping.lockOpenString = lockOpenString;
            req.preset!.visualMapping.stringOrder = stringOrder;

            req.preset!.effects = effects;

            await req.preset!.save();
            res.send("Configuración actualizada");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    static deletePreset = async (req: Request, res: Response) => {
        try {
            await req.preset!.deleteOne();
            res.send("Configuración eliminada");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };
}
