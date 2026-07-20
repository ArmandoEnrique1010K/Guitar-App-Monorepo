import { createNumberProperty } from '@/factories';

export const REVERB_SCHEMA = {
    decay: createNumberProperty(
        'Duración de la reverberación',
        0.1,
        10,
        0.1,
        1.5,
        1,
        's.',
        1,
    ),
    preDelay: createNumberProperty('Pre-retardo', 0, 1, 0.01, 0.01, 1, 's.', 2),
    wet: createNumberProperty('Mezcla', 0, 1, 0.01, 1, 100, '%', 0),
};
