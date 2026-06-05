import { CHORUS_SCHEMA } from './chorus.constants';
import { DISTORTION_SCHEMA } from './distortion.constants';
import { REVERB_SCHEMA } from './reverb.constants';
import { TREMOLO_SCHEMA } from './tremolo.constants';
import { VIBRATO_SCHEMA } from './vibrato.constants';

// TECLAS POR UNA FILA
export const KEYSBYROW = 11;

export const EFFECT_SCHEMAS = {
    distortion: DISTORTION_SCHEMA,
    reverb: REVERB_SCHEMA,
    tremolo: TREMOLO_SCHEMA,
    vibrato: VIBRATO_SCHEMA,
    chorus: CHORUS_SCHEMA,
} as const;
