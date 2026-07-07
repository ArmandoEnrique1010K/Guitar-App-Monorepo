import type { VibratoConfig } from '@/types';
import * as Tone from 'tone';

export const vibratoHandler = {
    create: () => {
        return new Tone.Vibrato();
    },

    configure: (effect: Tone.Vibrato, config: VibratoConfig) => {
        effect.frequency.value = config.frequency;
        effect.depth.value = config.depth;
        effect.type = config.type;
        effect.wet.value = config.wet;
    },

    dispose: (effect: Tone.Vibrato) => {
        effect.dispose();
    },
};
