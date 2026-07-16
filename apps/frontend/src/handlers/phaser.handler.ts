import type { PhaserConfig } from '@/types';
import * as Tone from 'tone';

export const phaserHandler = {
    create: () => {
        return new Tone.Phaser();
    },

    configure: (effect: Tone.Phaser, config: PhaserConfig) => {
        effect.Q.value = config.q;
        effect.baseFrequency = config.baseFrequency;
        effect.frequency.value = config.frequency;
        effect.octaves = config.octaves;
        effect.wet.value = config.wet;
    },

    dispose: (effect: Tone.Phaser) => {
        effect.dispose();
    },
};
