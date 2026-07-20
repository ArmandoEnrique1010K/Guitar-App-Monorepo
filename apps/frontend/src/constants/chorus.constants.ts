import { createOptionProperty, createNumberProperty } from '@/factories';

// Se crea constantes que contienen propiedades para cada uno de los parametros de cada efecto de sonido
// Recuerda que los factories crean objetos como constantes
export const CHORUS_SCHEMA = {
    delayTime: createNumberProperty(
        'Tiempo de retardo',
        1,
        20,
        0.1,
        3.5,
        1,
        'ms',
        1,
    ),
    depth: createNumberProperty('Profundidad', 0, 1, 0.01, 0.7, 100, '%', 0),
    frequency: createNumberProperty(
        'Frecuencia',
        0.1,
        20,
        0.1,
        1.5,
        1,
        'Hz',
        1,
    ),
    feedback: createNumberProperty(
        'Realimentación',
        0,
        1,
        0.01,
        0.4,
        100,
        '%',
        0,
    ),
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
