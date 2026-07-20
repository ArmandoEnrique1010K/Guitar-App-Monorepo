import { createNumberProperty } from '@/factories';

export const PHASER_SCHEMA = {
    // Velocidad del barrido del phaser
    frequency: createNumberProperty(
        'Frecuencia',
        0.1,
        20,
        0.1,
        0.5,
        1,
        'Hz',
        1,
    ),

    // Cantidad de octavas que recorre el barrido
    octaves: createNumberProperty('Octavas', 0, 8, 0.1, 3, 1, 'oct', 1),

    // Frecuencia base desde donde comienza el barrido
    baseFrequency: createNumberProperty(
        'Frecuencia base',
        20,
        2000,
        10,
        350,
        1,
        'Hz',
        0,
    ),

    // Resonancia del filtro (Quality Factor)
    Q: createNumberProperty('Resonancia', 0, 20, 0.1, 10, 1, '', 1),

    // Número de etapas del phaser
    stages: createNumberProperty('Etapas', 2, 20, 1, 10, 1, '', 0),

    // Mezcla entre señal seca y procesada
    wet: createNumberProperty('Mezcla', 0, 1, 0.01, 1, 100, '%', 0),
};
