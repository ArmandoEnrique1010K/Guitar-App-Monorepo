import * as Tone from 'tone';

// Generales

// Objeto de error
export type ErrorResponse = {
    error: string;
};

// Objeto de error o arreglo de objetos de errores como respuesta
export type ErrorResponseWithFields = {
    errors?: Error[];
    error?: string;
};

export type Error = {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
};

//

// Datos

export type KeyboardsRows = {
    row: number;
    keys: {
        code: string;
        label: string;
    }[];
}[];

//

// Factories

// Tipado de propiedades para un campo de tipo range
export type NumberProperty = {
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    factor: number;
    unit: string;
    decimals: number;
};

// Tipado para un campo de tipo options
export type OptionProperty<T extends string> = {
    defaultValue: T;
    values: T[];
};

//

// MODULOS

//

// AUTH

// Definición de los campos de formularios
export type CreateAccountForm = {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
};

export type ConfirmAccountForm = {
    token: string;
};

export type LoginForm = {
    email: string;
    password: string;
};

export type RequestConfirmationCodeForm = {
    email: string;
};

export type RequestPasswordResetForm = {
    email: string;
};

export type ValidatePasswordResetTokenForm = {
    token: string;
};

export type ResetPasswordForm = {
    password: string;
    password_confirmation: string;
};

//

// PROFILE
export type User = {
    _id: string;
    name: string;
    email: string;
};

export type ProfileForm = Omit<User, '_id'>;

export type UpdatePasswordForm = {
    current_password: string;
    password: string;
    password_confirmation: string;
};

//

// WORKSPACE
export type Workspace = {
    _id: string;
    name: string;
    presetCount: number;
};

// No se incluye la propiedad presetCount
// export type WorkspaceSummary = {
//     _id: string;
//     name: string;
// };
export type WorkspaceSummary = Omit<Workspace, 'presetCount'>;

export type WorkspaceForm = {
    name: string;
};

//

// PRESET
export type Preset = {
    _id: string;
    name: string;
    guitar: string;
    volume: number;
    holdToPlay: boolean;
    allowSameStringOverlap: boolean;
    allowDifferentStringOverlap: boolean;
    loopMode: boolean;
    loopIntervalMs: number;
    autoMute: boolean;
    autoMuteDelayMs: number;
    rootChord: number;
    lockOpenString: boolean;
    stringOrder: number[];
    effects: EffectsPreset[];
};

// Omite las propiedades '_id' y 'guitar' del type Preset
export type PresetForm = Omit<Preset, '_id' | 'guitar'>;

export type EffectsPreset = {
    type: string;
    order: number;
    enabled: boolean;
    // Record es un objeto donde cada una de las keys son de tipo string
    // Contiene los parametros de un efecto de sonido
    params: Record<string, unknown>;
};

//

// GUITAR

export type Guitar = {
    _id: string;
    name: string;
};

//

// NOTE SAMPLE

export type NoteSample = {
    _id: string;
    noteIndex: number;
    audioUrl: string;
};

// FRETS (CUERDA DE LA GUITARRA)

// Nota musical dentro de una cuerda
export type FretNote = {
    noteIndex: number;
    // Representa la tecla asignada
    key?: {
        code: string;
        label: string;
    };
};

// Notas musicales por cuerda
export type GuitarStringNotes = {
    stringIndex: number;
    frets: FretNote[];
};

// Notas musicales de la guitarra
export type GuitarNotes = GuitarStringNotes[];

// Coordenada de una nota musical
export type Note = {
    stringIndex: number | null;
    noteIndex: number | null;
};

//

// EFECTOS DE SONIDO
export type EffectsChain = {
    distortion: Tone.Distortion | null;
    reverb: Tone.Reverb | null;
    tremolo: Tone.Tremolo | null;
    vibrato: Tone.Vibrato | null;
    chorus: Tone.Chorus | null;
    freeverb: Tone.Freeverb | null;
    autoFilter: Tone.AutoFilter | null;
    feedbackDelay: Tone.FeedbackDelay | null;
    phaser: Tone.Phaser | null;
    pingPongDelay: Tone.PingPongDelay | null;
    pitchShift: Tone.PitchShift | null;
    gate: Tone.Gate | null;
    compressor: Tone.Compressor | null;
    eq3: Tone.EQ3 | null;
};

export type DistortionConfig = {
    enabled: boolean;
    distortion: number; // nivel de distorsión (0 a 1)
    oversample: 'none' | '2x' | '4x';
    wet: number;
};

export type ReverbConfig = {
    enabled: boolean;
    decay: number;
    preDelay: number;
    wet: number;
};

export type VibratoConfig = {
    enabled: boolean;
    frequency: number;
    depth: number;
    type: 'sine' | 'square' | 'triangle' | 'sawtooth';
    wet: number;
};

export type TremoloConfig = {
    enabled: boolean;
    frequency: number;
    depth: number;
    spread: number;
    type: 'sine' | 'square' | 'triangle' | 'sawtooth';
    wet: number;
};

export type ChorusConfig = {
    enabled: boolean;
    delayTime: number;
    depth: number;
    frequency: number;
    feedback: number;
    spread: number;
    type: 'sine' | 'square' | 'triangle' | 'sawtooth';
    wet: number;
};

export type FreeverbConfig = {
    enabled: boolean;
    dampening: number;
    roomSize: number;
    wet: number;
};

export type AutoFilterConfig = {
    enabled: boolean;
    baseFrequency: number;
    depth: number;
    // filter: string;
    frequency: number;
    octaves: number;
    type: 'sine' | 'square' | 'triangle' | 'sawtooth';
    wet: number;
};

export type FeedBackDelayConfig = {
    enabled: boolean;
    delayTime: number;
    feedback: number;
    wet: number;
};

export type PhaserConfig = {
    enabled: boolean;
    q: number;
    frequency: number;
    octaves: number;
    baseFrequency: number;
    // stages: number;
    wet: number;
};

export type PingPongDelayConfig = {
    enabled: boolean;
    delayTime: number;
    feedback: number;
    wet: number;
};

export type PitchShiftConfig = {
    enabled: boolean;
    delayTime: number;
    feedback: number;
    pitch: number;
    windowSize: number;
    wet: number;
};

export type GateConfig = {
    enabled: boolean;
    threshold: number;
    smoothing: number;
};

export type CompressorConfig = {
    enabled: boolean;
    attack: number;
    knee: number;
    ratio: number;
    release: number;
    threshold: number;
};

export type EQ3Config = {
    enabled: boolean;
    low: number;
    mid: number;
    high: number;
    lowFrequency: number;
    highFrequency: number;
};

export type EffectHandler<TEffect, TConfig> = {
    create: () => TEffect;

    configure: (effect: TEffect, config: TConfig) => void;

    dispose?: (effect: TEffect) => void;
};

export type EffectHandlers = {
    distortion: EffectHandler<Tone.Distortion, DistortionConfig>;
    reverb: EffectHandler<Tone.Reverb, ReverbConfig>;
    tremolo: EffectHandler<Tone.Tremolo, TremoloConfig>;
    vibrato: EffectHandler<Tone.Vibrato, VibratoConfig>;
    chorus: EffectHandler<Tone.Chorus, ChorusConfig>;
    freeverb: EffectHandler<Tone.Freeverb, FreeverbConfig>;
    autoFilter: EffectHandler<Tone.AutoFilter, AutoFilterConfig>;
    feedbackDelay: EffectHandler<Tone.FeedbackDelay, FeedBackDelayConfig>;
    phaser: EffectHandler<Tone.Phaser, PhaserConfig>;
    pingPongDelay: EffectHandler<Tone.PingPongDelay, PingPongDelayConfig>;
    pitchShift: EffectHandler<Tone.PitchShift, PitchShiftConfig>;
    gate: EffectHandler<Tone.Gate, GateConfig>;
    compressor: EffectHandler<Tone.Compressor, CompressorConfig>;
    eq3: EffectHandler<Tone.EQ3, EQ3Config>;
};

export type Effects = {
    distortion: DistortionConfig;
    reverb: ReverbConfig;
    tremolo: TremoloConfig;
    vibrato: VibratoConfig;
    chorus: ChorusConfig;
    freeverb: FreeverbConfig;
    autoFilter: AutoFilterConfig;
    feedbackDelay: FeedBackDelayConfig;
    phaser: PhaserConfig;
    pingPongDelay: PingPongDelayConfig;
    pitchShift: PitchShiftConfig;

    // Componentes como efectos
    gate: GateConfig;
    compressor: CompressorConfig;
    eq3: EQ3Config;
};
