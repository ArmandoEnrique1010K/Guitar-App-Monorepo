import { createNumberProperty } from '../createNumberProperty';

export const REVERB_SCHEMA = {
    decay: createNumberProperty(0.1, 10, 0.1, 1.5, 1, 's.', 2),
    preDelay: createNumberProperty(0, 1, 0.01, 0.01, 1, 's.', 2),
    wet: createNumberProperty(0, 1, 0.01, 1, 100, '%', 0),
};
