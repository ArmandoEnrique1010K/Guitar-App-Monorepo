import { CHORUS_SCHEMA } from './effects/chorus.constants';
import { DISTORTION_SCHEMA } from './effects/distortion.constants';
import { REVERB_SCHEMA } from './effects/reverb.constants';
import { TREMOLO_SCHEMA } from './effects/tremolo.constants';
import { VIBRATO_SCHEMA } from './effects/vibrato.constants';

// TECLAS POR UNA FILA
export const KEYSBYROW = 11;

export const EFFECT_SCHEMAS = {
    distortion: DISTORTION_SCHEMA,
    reverb: REVERB_SCHEMA,
    tremolo: TREMOLO_SCHEMA,
    vibrato: VIBRATO_SCHEMA,
    chorus: CHORUS_SCHEMA,
} as const;
