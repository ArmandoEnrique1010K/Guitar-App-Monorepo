import * as Tone from 'tone';
import type { AutoFilterConfig } from '@/types';

export const autofilterHandler = {
    create: () => {
        return new Tone.AutoFilter().start();
    },

    configure: (effect: Tone.AutoFilter, config: AutoFilterConfig) => {
        effect.baseFrequency = config.baseFrequency;
        effect.depth.value = config.depth;
        // effect.filter = config.filter;
        effect.frequency.value = config.frequency;
        effect.octaves = config.octaves;
        effect.type = config.type;
        effect.wet.value = config.wet;
    },

    dispose: (effect: Tone.AutoFilter) => {
        effect.dispose();
    },
};
