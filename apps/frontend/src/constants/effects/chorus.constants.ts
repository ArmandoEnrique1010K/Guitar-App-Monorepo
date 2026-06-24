import { createNumberProperty } from '../createNumberProperty';
import { createOptionProperty } from '../createOptionProperty';

export const CHORUS_SCHEMA = {
    delayTime: createNumberProperty(1, 20, 0.1, 3.5, 1, 'ms', 1),
    depth: createNumberProperty(0, 1, 0.01, 0.7, 100, '%', 0),
    frequency: createNumberProperty(0.1, 20, 0.1, 1.5, 1, 'Hz', 1),
    feedback: createNumberProperty(0, 1, 0.01, 0.4, 100, '%', 0),
    spread: createNumberProperty(0, 360, 1, 180, 1, '°', 0),
    type: createOptionProperty('sine', [
        'sine',
        'square',
        'triangle',
        'sawtooth',
    ]),
    wet: createNumberProperty(0, 1, 0.01, 1, 100, '%', 0),
};
