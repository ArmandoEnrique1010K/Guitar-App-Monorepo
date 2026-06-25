import { createOptionProperty, createNumberProperty } from '@/factories';

export const DISTORTION_SCHEMA = {
    distortion: createNumberProperty(0, 1, 0.01, 0.4, 100, '%', 0),
    oversample: createOptionProperty('none', ['none', '2x', '4x']),
    wet: createNumberProperty(0, 1, 0.01, 1, 100, '%', 0),
};
