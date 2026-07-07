import type { FreeverbConfig } from '@/types';
import * as Tone from 'tone';

export const freeverbHandler = {
    create: () => {
        return new Tone.Freeverb();
    },

    configure: (effect: Tone.Freeverb, config: FreeverbConfig) => {
        // effect.dampening = config.dampening;
        // effect.roomSize.value = config.roomSize;
        // effect.wet.value = config.wet;
        effect.set({
            dampening: config.dampening,
            roomSize: config.roomSize,
            wet: config.wet,
        });
    },

    dispose: (effect: Tone.Freeverb) => {
        effect.dispose();
    },
};
