import * as Tone from 'tone';
import type { EQ3Config } from '@/types';

export const eq3Handler = {
    create: () => {
        return new Tone.EQ3();
    },

    configure: (effect: Tone.EQ3, config: EQ3Config) => {
        effect.low.value = config.low;
        effect.mid.value = config.mid;
        effect.high.value = config.high;
        effect.lowFrequency.value = config.lowFrequency;
        effect.highFrequency.value = config.highFrequency;
    },

    dispose: (effect: Tone.EQ3) => {
        effect.dispose();
    },
};
