import { createNumberProperty } from '@/factories';

export const EQ3_SCHEMA = {
    // Graves
    low: createNumberProperty('Graves', -30, 30, 1, 0, 1, 'dB', 0),

    // Medios
    mid: createNumberProperty('Medios', -30, 30, 1, 0, 1, 'dB', 0),

    // Agudos
    high: createNumberProperty('Agudos', -30, 30, 1, 0, 1, 'dB', 0),

    // Corte entre graves y medios
    lowFrequency: createNumberProperty(
        'Frecuencia de graves',
        20,
        1000,
        10,
        400,
        1,
        'Hz',
        0,
    ),

    // Corte entre medios y agudos
    highFrequency: createNumberProperty(
        'Frecuencia de agudos',
        1000,
        20000,
        100,
        2500,
        1,
        'Hz',
        0,
    ),
};
