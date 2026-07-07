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

export type Neck = {
    rope: number;
    frets: {
        chord: number;
        file: string;
        key?: string;
    }[];
}[];

//

// Factories - Objetos que definen constantes

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

//

// WORKSPACE
export type Workspace = {
    _id: string;
    name: string;
    presetCount: number;
};

// No se incluye la propiedad presetCount
export type WorkspaceSummary = {
    _id: string;
    name: string;
};

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
