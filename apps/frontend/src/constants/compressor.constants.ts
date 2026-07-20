import { createNumberProperty } from '@/factories';

export const COMPRESSOR_SCHEMA = {
    // min - max - step - defaultValue - factor - unit - decimals
    attack: createNumberProperty(
        'Ataque',
        0.001,
        1,
        0.001,
        0.003,
        1000,
        'ms',
        0,
    ),
    knee: createNumberProperty('Rodilla', 0, 40, 1, 30, 1, 'dB', 0),
    ratio: createNumberProperty('Relación', 1, 20, 0.5, 12, 1, ':1', 1),
    release: createNumberProperty(
        'Liberación',
        0.01,
        1,
        0.01,
        0.25,
        1000,
        'ms',
        0,
    ),
    threshold: createNumberProperty('Umbral', -100, 0, 1, -24, 1, 'dB', 0),
};
