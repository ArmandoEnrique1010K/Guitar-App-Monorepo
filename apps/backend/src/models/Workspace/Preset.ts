import mongoose, { Schema, Document, Types } from "mongoose";

// CONFIGURACIONES RELACIONADAS A GUITARRA
// LOS VALORES SON OBLIGATORIOS
export interface IGuitarBehavior {
    volume: number;
    holdToPlay: boolean;
    allowSameStringOverlap: boolean;
    allowDifferentStringOverlap: boolean;
}

export interface IPlaybackSettings {
    loopMode: boolean;
    loopIntervalMs: number;
    autoMute: boolean;
    autoMuteDelayMs: number;
}

export interface IVisualMapping {
    rootChord: number;
    lockOpenString: boolean;
    stringOrder: Array<number>;
}

// EFECTO DE SONIDO
// LOS VALORES SON OBLIGATORIOS (POR EFECTO DE SONIDO)
export interface IEffect {
    type: string;
    order: number;
    enabled: boolean;
    params: Record<string, unknown>;
}

// PRESET DE GUITARRA
export interface IPreset extends Document {
    name: string;
    workspace: Types.ObjectId;
    guitar: Types.ObjectId;
    guitarBehavior: IGuitarBehavior;
    playbackSettings: IPlaybackSettings;
    visualMapping: IVisualMapping;
    // Efects puede ser un arreglo vacio o un arreglo de IEffectSchema
    effects: IEffect[];
}

const GuitarBehaviorSchema = new Schema(
    {
        volume: {
            // Tipo número
            type: Number,
            // Requerido
            required: true,
            // Valor por defecto
            default: 1,
        },
        holdToPlay: { type: Boolean, required: true, default: false },
        allowSameStringOverlap: {
            type: Boolean,
            required: true,
            default: false,
        },
        allowDifferentStringOverlap: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    { _id: false },
);

const PlaybackSettingsSchema = new Schema(
    {
        loopMode: { type: Boolean, required: true, default: false },
        loopIntervalMs: { type: Number, required: true, default: 50 },
        autoMute: { type: Boolean, required: true, default: false },
        autoMuteDelayMs: { type: Number, required: true, default: 100 },
    },
    { _id: false },
);

const VisualMappingSchema = new Schema(
    {
        rootChord: { type: Number, required: true, default: 0 },
        lockOpenString: { type: Boolean, required: true, default: false },
        stringOrder: {
            type: [Number],
            required: true,
            default: [0, 1, 2, 3, 4, 5],
        },
    },
    { _id: false },
);

const EffectSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
            // enum: ["distortion", "reverb", "tremolo", "eq3"],
        },
        order: {
            type: Number,
            required: true,
        },
        enabled: {
            type: Boolean,
            default: true,
        },
        params: {
            type: Schema.Types.Mixed, //  clave
            required: true,
        },
    },
    { _id: false },
);

const presetSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    workspace: {
        type: Types.ObjectId,
        ref: "Workspace",
        required: true,
    },
    guitar: {
        type: Types.ObjectId,
        ref: "Guitar",
        required: true,
    },
    guitarBehavior: {
        type: GuitarBehaviorSchema,
        required: true,
    },
    playbackSettings: {
        type: PlaybackSettingsSchema,
        required: true,
    },
    visualMapping: {
        type: VisualMappingSchema,
        required: true,
    },
    effects: {
        type: [EffectSchema],
        default: [],
    },
});

const Preset = mongoose.model<IPreset>("Preset", presetSchema);
export default Preset;
