import { createNumberProperty } from '@/factories';

export const FREEVERB_SCHEMA = {
    roomSize: createNumberProperty(
        'Tamaño de la sala',
        0,
        0.99,
        0.01,
        0.7,
        100,
        '%',
        0,
    ),
    dampening: createNumberProperty(
        'Amortiguación',
        20,
        15020,
        200,
        3020,
        1,
        'Hz',
        0,
    ),
    wet: createNumberProperty('Mezcla', 0, 1, 0.01, 1, 100, '%', 0),
};
