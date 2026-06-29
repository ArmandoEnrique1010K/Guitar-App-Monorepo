import * as Tone from 'tone';

export interface LoginForm {
    email: string;
    password: string;
}

export interface CreateAccountForm {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
}
export interface ConfirmAccountForm {
    token: string;
}

export interface RequestCodeForm {
    email: string;
}
export interface ForgotPasswordForm {
    email: string;
}
export interface ValidateTokenForm {
    token: string;
}
export interface UpdatePasswordForm {
    password: string;
    password_confirmation: string;
}

export type Neck = {
    rope: number;
    frets: Frets;
}[];

export type Frets = {
    chord: number;
    file: string;
    key?: string;
}[];

export type Note = {
    stringIndex: number | null;
    noteIndex: number | null;
};
export type Instrument = {
    _id: string;
    name: string;
};
export type FretNote = {
    noteIndex: number;
    audioUrl: string;
    key?: {
        code: string;
        label: string;
    }; // Representa la tecla
};

export type GuitarStringNotes = {
    stringIndex: number;
    frets: FretNote[];
};

export type GuitarNotes = GuitarStringNotes[];

export type KeyboardsRows = {
    row: number;
    keys: {
        code: string;
        label: string;
    }[];
}[];

export type Effects = {
    distortion: DistortionConfig;
    reverb: ReverbConfig;
    tremolo: TremoloConfig;
    vibrato: VibratoConfig;
    chorus: ChorusConfig;
    freeverb: FreeverbConfig;
};

// export type PartialEffects = {
//     distortion?: Partial<DistortionEffect>;
// }

export type EffectsChain = {
    distortion: Tone.Distortion | null;
    reverb: Tone.Reverb | null;
    tremolo: Tone.Tremolo | null;
    vibrato: Tone.Vibrato | null;
    chorus: Tone.Chorus | null;
    freeverb: Tone.Freeverb | null;
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
};

// TIPADO DE PROPIEDADES
export type NumberProperty = {
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    factor: number;
    unit: string;
    decimals: number;
};

export type OptionProperty<T extends string> = {
    defaultValue: T;
    values: T[];
};

// WORKSPACE
export type WorkspaceForm = {
    name: string;
};
