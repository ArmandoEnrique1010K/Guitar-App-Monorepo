import type { Effects } from '@/types';
import { AUTOFILTER_SCHEMA } from '@/constants/autoFilter.constants';
import { CHORUS_SCHEMA } from '@/constants/chorus.constants';
import { DISTORTION_SCHEMA } from '@/constants/distortion.constants';
import { FEEDBACKDELAY_SCHEMA } from '@/constants/feedbackDelay.constants';
import { FREEVERB_SCHEMA } from '@/constants/freeverb.constants';
import { PHASER_SCHEMA } from '@/constants/phaser.constants';
import { REVERB_SCHEMA } from '@/constants/reverb.constants';
import { TREMOLO_SCHEMA } from '@/constants/tremolo.constants';
import { VIBRATO_SCHEMA } from '@/constants/vibrato.constants';
import { PINGPONGDELAY_SCHEMA } from '@/constants/pingPongDelay.contants';
import { PITCHSHIFT_SCHEMA } from '@/constants/pitchShift.contants';
import { GATE_SCHEMA } from '@/constants/gate.contants';
import { COMPRESSOR_SCHEMA } from '@/constants/compressor.constants';
import { EQ3_SCHEMA } from '@/constants/eq3.constants';

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
    phaser: PHASER_SCHEMA,
    pingPongDelay: PINGPONGDELAY_SCHEMA,
    pitchShift: PITCHSHIFT_SCHEMA,
    gate: GATE_SCHEMA,
    compressor: COMPRESSOR_SCHEMA,
    eq3: EQ3_SCHEMA,
};

// Construye los valores por defecto de un efecto de sonido
export const buildDefaultEffectConfig = (effectName: keyof Effects) => {
    const schema = EFFECT_SCHEMAS[effectName];

    const config = Object.fromEntries(
        Object.entries(schema).map(([key, value]) => [key, value.defaultValue]),
    );

    return config;
};
