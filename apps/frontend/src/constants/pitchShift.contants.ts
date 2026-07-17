import { createNumberProperty } from '@/factories';

export const PITCHSHIFT_SCHEMA = {
    // Tiempo de retardo (segundos)
    delayTime: createNumberProperty(0, 1, 0.01, 0, 1000, 'ms', 0),

    // Cantidad de realimentación
    feedback: createNumberProperty(0, 0.95, 0.01, 0, 100, '%', 0),

    // Cambio de tono en semitonos
    // -12 = una octava abajo
    // +12 = una octava arriba
    pitch: createNumberProperty(-24, 24, 1, 0, 1, 'st', 0),

    // Tamaño de la ventana utilizada por el algoritmo de cambio de tono.
    // Valores pequeños responden más rápido, valores grandes producen un sonido más suave.
    windowSize: createNumberProperty(0.01, 0.5, 0.01, 0.1, 1000, 'ms', 0),

    // Cantidad de señal procesada.
    wet: createNumberProperty(0, 1, 0.01, 1, 100, '%', 0),
};
