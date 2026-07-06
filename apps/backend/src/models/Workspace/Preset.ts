import mongoose, { Schema, Document, Types } from "mongoose";

// Una entidad puede tener objetos como valores de campos o propiedades
// Por ello se ha separado los objetos en interfaces independientes

//

// Configuración relacionada con el comportamiento de la guitarra
export interface IGuitarBehavior {
    volume: number;
    holdToPlay: boolean;
    allowSameStringOverlap: boolean;
    allowDifferentStringOverlap: boolean;
}

// Configuración relacionada con la reproducción del audio.
export interface IPlaybackSettings {
    loopMode: boolean;
    loopIntervalMs: number;
    autoMute: boolean;
    autoMuteDelayMs: number;
}

// Configuración utilizada para representar visualmente la guitarra
export interface IVisualMapping {
    rootChord: number;
    lockOpenString: boolean;
    // El tipo es un arreglo de numeros
    stringOrder: Array<number>;
}

// Representa un efecto de sonido aplicado al preset
export interface IEffect {
    type: string;
    order: number;
    enabled: boolean;
    // Contiene cada uno de los parametros de un efecto de sonido

    // Ejemplo de un efecto de sonido distortion:
    // {
    //     "type": "Distortion",
    //     "order": 1,
    //     "enabled": true,
    //     "params": {
    //         "distortion": 0.6,
    //         "oversample": 'none',
    //         "wet": 1
    //     }
    // }

    // Los params varian por cada efecto de sonido, por lo cual no tiene
    // una estructura fija, por lo que se utiliza Record<string, unknown>
    // para permitir cualquier tipo de valor.
    params: Record<string, unknown>;
}

//

// Interface principal para la definición de la entidad Preset
export interface IPreset extends Document {
    name: string;
    workspace: Types.ObjectId;
    guitar: Types.ObjectId;
    guitarBehavior: IGuitarBehavior;
    playbackSettings: IPlaybackSettings;
    visualMapping: IVisualMapping;

    // Una configuración puede no tener efectos aplicados.
    effects: IEffect[];
}

//

// Un subdocumento embebido es un documento que se almacena dentro de otro documento.
// En este caso, guitarBehavior es un subdocumento embebido de Preset.

// Configuración del Schema del comportamiento de la guitarra.
const GuitarBehaviorSchema = new Schema(
    {
        volume: {
            type: Number,
            required: true,
            // Aunque es muy poco probable que si se omite algun campo
            // de la configuración o se deje en undefined, toma el valor de
            // default como valor por defecto
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

    // Evita crear un _id para este subdocumento.
    { _id: false },
);

// Configuración relacionada con la reproducción del audio
const PlaybackSettingsSchema = new Schema(
    {
        loopMode: { type: Boolean, required: true, default: false },
        loopIntervalMs: { type: Number, required: true, default: 50 },
        autoMute: { type: Boolean, required: true, default: false },
        autoMuteDelayMs: { type: Number, required: true, default: 100 },
    },
    { _id: false },
);

// Configuración utilizada para mostrar la guitarra en pantalla.
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

// Configuración de los efectos aplicados a la guitarra.
const EffectSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
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
            // utiliza Mixed porque cada tipo de efecto posee
            // parámetros distintos.
            type: Schema.Types.Mixed,
            required: true,
        },
    },
    { _id: false },
);

//

// Esquema principal del preset.
// Contiene la información de la guitarra, sus configuraciones y los efectos
// aplicados.

const presetSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    // Espacio de trabajo al que pertenece el preset.
    workspace: {
        type: Types.ObjectId,
        ref: "Workspace",
        required: true,
    },
    // Guitarra asociada al preset.
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

    // Un preset puede no tener efectos configurados.
    effects: {
        type: [EffectSchema],
        default: [],
    },
});

const Preset = mongoose.model<IPreset>("Preset", presetSchema);
export default Preset;
