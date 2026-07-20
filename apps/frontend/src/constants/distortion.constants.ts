import { createOptionProperty, createNumberProperty } from '@/factories';

export const DISTORTION_SCHEMA = {
    distortion: createNumberProperty(
        'Cantidad de distorsión',
        0,
        1,
        0.01,
        0.4,
        100,
        '%',
        0,
    ),
    oversample: createOptionProperty('Sobremuestreo', 'none', [
        'none',
        '2x',
        '4x',
    ]),
    wet: createNumberProperty('Mezcla', 0, 1, 0.01, 1, 100, '%', 0),
};
