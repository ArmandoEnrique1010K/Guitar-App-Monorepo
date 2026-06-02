import * as Tone from "tone";

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
};

// export type PartialEffects = {
//     distortion?: Partial<DistortionEffect>;
// }

export type EffectsChain = {
    distortion: Tone.Distortion | null;
};

export type DistortionConfig = {
    enabled: boolean;
    distortion: number;        // nivel de distorsión (0 a 1)
    oversample: "none" | "2x" | "4x";
    wet: number;
}


export type EffectHandler<
    TEffect,
    TConfig
> = {
    create: () => TEffect;

    configure: (
        effect: TEffect,
        config: TConfig
    ) => void;

    dispose?: (
        effect: TEffect
    ) => void;
};

export type EffectHandlers = {
    distortion: EffectHandler<
        Tone.Distortion,
        DistortionConfig
    >;
};



// TIPADO DE PROPIEDADES
export type NumberProperty = {
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    factor: number,
    unit: string;
    decimals: number;
};

export type OptionProperty<T extends string> = {
    default: T;
    values: T[];
};


