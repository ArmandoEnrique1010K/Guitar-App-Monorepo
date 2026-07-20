import { createOptionProperty, createNumberProperty } from '@/factories';

export const AUTOFILTER_SCHEMA = {
    // Frecuencia mínima del filtro
    baseFrequency: createNumberProperty(
        'Frecuencia base',
        20, // min (Hz)
        2000, // max (Hz)
        10, // step
        300, // default
        1, // factor
        'Hz',
        0,
    ),
    // Intensidad de la modulación
    depth: createNumberProperty('Profundidad', 0, 1, 0.01, 0.8, 100, '%', 0),
    // Velocidad del LFO
    frequency: createNumberProperty('Frecuencia', 0.1, 20, 0.1, 2, 1, 'Hz', 1),
    // Número de octavas que recorre el filtro
    octaves: createNumberProperty('Octavas', 0, 10, 0.1, 3, 1, 'oct', 1),
    // Forma de onda del LFO
    type: createOptionProperty('Tipo de Onda', 'sine', [
        'sine',
        'square',
        'triangle',
        'sawtooth',
    ]),
    // Mezcla entre señal seca y procesada
    wet: createNumberProperty('Mezcla', 0, 1, 0.01, 1, 100, '%', 0),
};
