import type { ChorusConfig } from '@/schemas';
import * as Tone from 'tone';

export const chorusHandler = {
    create: () => {
        return new Tone.Chorus().start();
    },

    configure: (effect: Tone.Chorus, config: ChorusConfig) => {
        effect.frequency.value = config.frequency;
        effect.delayTime = config.delayTime;
        effect.depth = config.depth;
        effect.feedback.value = config.feedback;
        effect.spread = config.spread;
        effect.type = config.type;
        effect.wet.value = config.wet;
    },

    dispose: (effect: Tone.Chorus) => {
        effect.dispose();
    },
};
