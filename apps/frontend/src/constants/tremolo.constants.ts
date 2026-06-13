import { createNumberProperty } from '@/utils/createNumberProperty';
import { createOptionProperty } from '@/utils/createOptionProperty';

export const TREMOLO_SCHEMA = {
    frequency: createNumberProperty(0.1, 20, 0.1, 10, 1, 'Hz.', 1),
    depth: createNumberProperty(0, 1, 0.01, 0.5, 100, '%', 0),
    spread: createNumberProperty(0, 360, 1, 180, 1, '°', 0),
    type: createOptionProperty('sine', [
        'sine',
        'square',
        'triangle',
        'sawtooth',
    ]),
    wet: createNumberProperty(0, 1, 0.01, 1, 100, '%', 0),
};
