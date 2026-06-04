import type { DistortionConfig } from '@/schemas';
import { createNumberProperty } from '@/utils/createNumberProperty';
import { createOptionProperty } from '@/utils/createOptionProperty';

export const DISTORTION_SCHEMA = {
    distortion: createNumberProperty(0, 1, 0.01, 0.4, 100, '%', 0),
    oversample: createOptionProperty('none', ['none', '2x', '4x']),
    wet: createNumberProperty(0, 1, 0.01, 1, 100, '%', 0),
};

export const INITIAL_DISTORTION: DistortionConfig = {
    enabled: false,
    distortion: 0.4,
    oversample: 'none',
    wet: 1,
};
