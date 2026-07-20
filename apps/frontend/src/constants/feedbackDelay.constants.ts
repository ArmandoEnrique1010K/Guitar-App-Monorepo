import { createNumberProperty } from '@/factories';

export const FEEDBACKDELAY_SCHEMA = {
    // Tiempo entre cada repetición
    delayTime: createNumberProperty(
        'Tiempo de retardo',
        0,
        1,
        0.01,
        0.25,
        1000,
        'ms',
        0,
    ),

    // Cantidad de señal que vuelve a entrar al delay
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

    // Tiempo máximo que admite el buffer del delay
    // Normalmente no se modifica desde la interfaz.
    // maxDelay: createNumberProperty(0.1, 5, 0.1, 2, 1, 's', 1),

    // Mezcla entre señal original y procesada
    wet: createNumberProperty('Mezcla', 0, 1, 0.01, 0.5, 100, '%', 0),
};
