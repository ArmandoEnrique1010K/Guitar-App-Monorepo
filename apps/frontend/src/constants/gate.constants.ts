import { createNumberProperty } from '@/factories';

export const GATE_SCHEMA = {
    threshold: createNumberProperty('Umbral', -100, 0, 1, -40, 1, 'dB', 0),
    smoothing: createNumberProperty('Suavizado', 0, 1, 0.01, 0.1, 100, '%', 0),
};
