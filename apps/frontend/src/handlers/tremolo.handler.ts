import type { TremoloConfig } from '@/types';
import * as Tone from 'tone';

export const tremoloHandler = {
    create: () => {
        return new Tone.Tremolo().start();
    },

    configure: (effect: Tone.Tremolo, config: TremoloConfig) => {
        effect.frequency.value = config.frequency;
        effect.depth.value = config.depth;
        effect.type = config.type;
        effect.spread = config.spread;
        effect.wet.value = config.wet;
    },

    dispose: (effect: Tone.Tremolo) => {
        effect.dispose();
    },
};
