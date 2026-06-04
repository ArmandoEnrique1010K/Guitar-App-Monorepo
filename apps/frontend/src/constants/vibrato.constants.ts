import type { VibratoConfig } from '@/schemas';
import { createNumberProperty } from '@/utils/createNumberProperty';
import { createOptionProperty } from '@/utils/createOptionProperty';

export const VIBRATO_SCHEMA = {
    frequency: createNumberProperty(0.1, 20, 0.1, 5, 1, 'Hz.', 1),
    depth: createNumberProperty(0, 1, 0.01, 0.1, 100, '%', 0),
    type: createOptionProperty('sine', [
        'sine',
        'square',
        'triangle',
        'sawtooth',
    ]),
    wet: createNumberProperty(0, 1, 0.01, 1, 100, '%', 0),
};

export const INITIAL_VIBRATO: VibratoConfig = {
    enabled: false,
    depth: 0.1,
    frequency: 5,
    // TODO: INVESTIGAR SI TONE.JS TIENE UN BUG RESPECTO A ESA PROPIEDAD
    // maxDelay: 0.005,
    type: 'sine',
    wet: 1,
};
