import type { Request, Response } from "express";
import Guitar from "models/Guitar/Guitar";
import Preset from "models/Workspace/Preset";

export class PresetController {
    // Crea una nueva configuración
    static createPreset = async (req: Request, res: Response) => {
        try {
            // Todas esas propiedades se toman desde el body
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

            // Los IDs se toman de los parametros dinamicos
            const { workspaceId, guitarId } = req.params;

            // Se obtiene el nombre desde req.presetName que fue almacenado desde un
            // middleware
            const presetName = req.presetName;

            // Crea una configuracion
            const preset = new Preset({
                name: presetName,
                workspace: workspaceId,
                guitar: guitarId,

                // En los 3 subdocumentos embebidos se guardan los mismos valores enviados
                // por el usuario
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

            // Devuelve una respuesta con los datos de la configuración
            res.status(201).json({
                name: preset.name,
                // Solamente se devuelve el ID de la guitarra
                guitar: guitarId,
                volume: preset.guitarBehavior.volume,
                holdToPlay: preset.guitarBehavior.holdToPlay,
                allowSameStringOverlap:
                    preset.guitarBehavior.allowSameStringOverlap,
                allowDifferentStringOverlap:
                    preset.guitarBehavior.allowDifferentStringOverlap,
                loopMode: preset.playbackSettings.loopMode,
                loopIntervalMs: preset.playbackSettings.loopIntervalMs,
                autoMute: preset.playbackSettings.autoMute,
                autoMuteDelayMs: preset.playbackSettings.autoMuteDelayMs,
                rootChord: preset.visualMapping.rootChord,
                lockOpenString: preset.visualMapping.lockOpenString,
                stringOrder: preset.visualMapping.stringOrder,
                // Devuelve un arreglo cuyos elementos son de tipo IEffect
                effects: preset.effects,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Obtiene todas las configuraciones
    static getAllPresets = async (req: Request, res: Response) => {
        try {
            const { workspaceId } = req.params;

            // Filtra las configuraciones por ID de espacio de trabajo y omite
            // los campo workspace y '__v'
            const presets = await Preset.find({
                workspace: workspaceId,
            }).select("-workspace -__v");

            // Transforma las configuraciones obtenidas, las inserta en un nuevo arreglo
            // donde cada elemento es un objeto de configuración
            const transformedPresets = presets.map((preset) => ({
                _id: preset._id,
                name: preset.name,
                guitar: preset.guitar._id,
                volume: preset.guitarBehavior.volume,
                holdToPlay: preset.guitarBehavior.holdToPlay,
                allowSameStringOverlap:
                    preset.guitarBehavior.allowSameStringOverlap,
                allowDifferentStringOverlap:
                    preset.guitarBehavior.allowDifferentStringOverlap,
                loopMode: preset.playbackSettings.loopMode,
                loopIntervalMs: preset.playbackSettings.loopIntervalMs,
                autoMute: preset.playbackSettings.autoMute,
                autoMuteDelayMs: preset.playbackSettings.autoMuteDelayMs,
                rootChord: preset.visualMapping.rootChord,
                lockOpenString: preset.visualMapping.lockOpenString,
                stringOrder: preset.visualMapping.stringOrder,
                effects: preset.effects,
            }));

            res.status(200).json(transformedPresets);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Actualiza la configuración
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

            // Para un entorno de desarrollo se tiene que validar que el ID de la guitarra exista
            const guitarExists = await Guitar.findById(guitarId);
            if (!guitarExists) {
                const error = new Error("Guitarra no encontrada");
                return res.status(404).json({ error: error.message });
            }

            // Recordar que el nombre se obtiene del req.presetName porque ha pasado por el middleware
            const presetName = req.presetName;

            // Establece los valores en cada uno de los campos de preset (obtenido desde request)
            req.preset!.name = presetName!;
            req.preset!.guitar = guitarExists._id;

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

            res.status(200).json({
                _id: req.preset!._id,
                name: req.preset!.name,
                guitar: req.preset!.guitar,
                volume: req.preset!.guitarBehavior.volume,
                holdToPlay: req.preset!.guitarBehavior.holdToPlay,
                allowSameStringOverlap:
                    req.preset!.guitarBehavior.allowSameStringOverlap,
                allowDifferentStringOverlap:
                    req.preset!.guitarBehavior.allowDifferentStringOverlap,
                loopMode: req.preset!.playbackSettings.loopMode,
                loopIntervalMs: req.preset!.playbackSettings.loopIntervalMs,
                autoMute: req.preset!.playbackSettings.autoMute,
                autoMuteDelayMs: req.preset!.playbackSettings.autoMuteDelayMs,
                rootChord: req.preset!.visualMapping.rootChord,
                lockOpenString: req.preset!.visualMapping.lockOpenString,
                stringOrder: req.preset!.visualMapping.stringOrder,
                effects: req.preset!.effects,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    // Elimina la configuración
    static deletePreset = async (req: Request, res: Response) => {
        try {
            // deleteOne elimina un registro
            // Como hay un middleware que almacena la configuracion en req.preset,
            // se elimina ese registro
            await req.preset!.deleteOne();

            // No se envia ninguna respuesta
            // Por defecto se establece un status 204
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };
}
