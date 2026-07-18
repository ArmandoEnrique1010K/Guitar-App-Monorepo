import * as Tone from 'tone';
import type { CompressorConfig } from '@/types';

export const compressorHandler = {
    create: () => {
        return new Tone.Compressor();
    },

    configure: (effect: Tone.Compressor, config: CompressorConfig) => {
        effect.attack.value = config.attack;
        effect.knee.value = config.knee;
        effect.ratio.value = config.ratio;
        effect.release.value = config.release;
        effect.threshold.value = config.threshold;
    },

    dispose: (effect: Tone.Compressor) => {
        effect.dispose();
    },
};
