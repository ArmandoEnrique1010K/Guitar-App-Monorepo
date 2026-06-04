import type { DistortionConfig } from '@/schemas';
import * as Tone from 'tone';

export const distortionHandler = {
    create: () => {
        return new Tone.Distortion();
    },

    configure: (effect: Tone.Distortion, config: DistortionConfig) => {
        effect.distortion = config.distortion;
        effect.oversample = config.oversample;
        effect.wet.value = config.wet;
    },

    dispose: (effect: Tone.Distortion) => {
        effect.dispose();
    },
};
