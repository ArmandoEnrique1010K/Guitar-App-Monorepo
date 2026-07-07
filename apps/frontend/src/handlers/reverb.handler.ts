import type { ReverbConfig } from '@/types';
import * as Tone from 'tone';

export const reverbHandler = {
    create: () => {
        return new Tone.Reverb();
    },

    configure: (effect: Tone.Reverb, config: ReverbConfig) => {
        effect.decay = config.dampening;
        effect.preDelay = config.preDelay;
        effect.wet.value = config.wet;
    },

    dispose: (effect: Tone.Reverb) => {
        effect.dispose();
    },
};
