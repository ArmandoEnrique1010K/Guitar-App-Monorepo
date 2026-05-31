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
    rope: number | null;
    chord: number | null;
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
