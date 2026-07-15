import { AUTOFILTER_SCHEMA } from '@/constants/autoFilter.constants';
import { CHORUS_SCHEMA } from '@/constants/chorus.constants';
import { DISTORTION_SCHEMA } from '@/constants/distortion.constants';
import { FEEDBACKDELAY_SCHEMA } from '@/constants/feedbackDelay.constants';
import { FREEVERB_SCHEMA } from '@/constants/freeverb.constants';
import { REVERB_SCHEMA } from '@/constants/reverb.constants';
import { TREMOLO_SCHEMA } from '@/constants/tremolo.constants';
import { VIBRATO_SCHEMA } from '@/constants/vibrato.constants';
import type { Effects } from '@/types';

// Schema de definición de efectos
export const EFFECT_SCHEMAS = {
    distortion: DISTORTION_SCHEMA,
    reverb: REVERB_SCHEMA,
    tremolo: TREMOLO_SCHEMA,
    vibrato: VIBRATO_SCHEMA,
    chorus: CHORUS_SCHEMA,
    freeverb: FREEVERB_SCHEMA,
    autoFilter: AUTOFILTER_SCHEMA,
    feedbackDelay: FEEDBACKDELAY_SCHEMA,
};

// Construye los valores por defecto de un efecto de sonido
export const buildDefaultEffectConfig = (effectName: keyof Effects) => {
    const schema = EFFECT_SCHEMAS[effectName];

    const config = Object.fromEntries(
        Object.entries(schema).map(([key, value]) => [key, value.defaultValue]),
    );

    return config;
};
