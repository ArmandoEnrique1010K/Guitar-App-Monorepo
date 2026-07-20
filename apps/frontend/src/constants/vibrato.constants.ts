import { createNumberProperty, createOptionProperty } from '@/factories';

export const VIBRATO_SCHEMA = {
    frequency: createNumberProperty(
        'Frecuencia',
        0.1,
        20,
        0.01,
        5,
        1,
        'Hz.',
        1,
    ),
    depth: createNumberProperty('Profundidad', 0, 1, 0.01, 0.1, 100, '%', 0),
    type: createOptionProperty('Tipo de onda', 'sine', [
        'sine',
        'square',
        'triangle',
        'sawtooth',
    ]),
    wet: createNumberProperty('Mezcla', 0, 1, 0.01, 1, 100, '%', 0),
};
