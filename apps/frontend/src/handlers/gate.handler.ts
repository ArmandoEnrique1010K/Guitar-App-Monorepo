import * as Tone from 'tone';
import type { GateConfig } from '@/types';

export const gateHandler = {
    create: () => {
        return new Tone.Gate();
    },

    configure: (effect: Tone.Gate, config: GateConfig) => {
        effect.threshold = config.threshold;
        effect.smoothing = config.smoothing;
    },

    dispose: (effect: Tone.Gate) => {
        effect.dispose();
    },
};
