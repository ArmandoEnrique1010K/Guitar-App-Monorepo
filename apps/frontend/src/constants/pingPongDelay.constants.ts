import { createNumberProperty } from '@/factories';

export const PINGPONGDELAY_SCHEMA = {
    // Tiempo entre cada repetición
    delayTime: createNumberProperty(
        'Tiempo de retardo',
        0,
        2,
        0.01,
        0.25,
        1000,
        'ms',
        0,
    ),

    // Cantidad de repeticiones
    feedback: createNumberProperty(
        'Realimentación',
        0,
        0.95,
        0.01,
        0.3,
        100,
        '%',
        0,
    ),

    // Mezcla entre señal original y procesada
    wet: createNumberProperty('Mezcla', 0, 1, 0.01, 0.5, 100, '%', 0),
};
