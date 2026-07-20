import { createNumberProperty, createOptionProperty } from '@/factories';

export const TREMOLO_SCHEMA = {
    frequency: createNumberProperty(
        'Frecuencia',
        0.1,
        20,
        0.1,
        10,
        1,
        'Hz.',
        1,
    ),
    depth: createNumberProperty('Profundidad', 0, 1, 0.01, 0.5, 100, '%', 0),
    spread: createNumberProperty(
        'Separación estéreo',
        0,
        360,
        1,
        180,
        1,
        '°',
        0,
    ),
    type: createOptionProperty('Tipo de onda', 'sine', [
        'sine',
        'square',
        'triangle',
        'sawtooth',
    ]),
    wet: createNumberProperty('Mezcla', 0, 1, 0.01, 1, 100, '%', 0),
};
