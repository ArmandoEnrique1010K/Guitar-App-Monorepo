import { createNumberProperty } from '@/factories';

export const GATE_SCHEMA = {
    threshold: createNumberProperty(-100, 0, 1, -40, 1, 'dB', 0),

    smoothing: createNumberProperty(0, 1, 0.01, 0.1, 100, '%', 0),
};
