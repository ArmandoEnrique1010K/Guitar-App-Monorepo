import type { ReverbConfig } from '@/schemas';
import { createNumberProperty } from '@/utils/createNumberProperty';

export const REVERB_SCHEMA = {
    decay: createNumberProperty(0.1, 10, 0.1, 1.5, 1, 's.', 2),
    preDelay: createNumberProperty(0, 1, 0.001, 0.01, 1, 's.', 1),
    wet: createNumberProperty(0, 1, 0.01, 1, 100, '%', 0),
};

export const INITIAL_REVERB: ReverbConfig = {
    enabled: false,
    decay: 1.5,
    preDelay: 0.01,
    wet: 1,
};
