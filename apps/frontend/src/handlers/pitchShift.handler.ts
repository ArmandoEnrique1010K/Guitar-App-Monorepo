import type { PitchShiftConfig } from '@/types';
import * as Tone from 'tone';

export const pitchShiftHandler = {
    create: () => {
        return new Tone.PitchShift();
    },

    configure: (effect: Tone.PitchShift, config: PitchShiftConfig) => {
        // effect.dampening = config.dampening;
        // effect.roomSize.value = config.roomSize;
        // effect.wet.value = config.wet;
        effect.set({
            delayTime: config.delayTime,
            feedback: config.feedback,
            pitch: config.pitch,
            windowSize: config.windowSize,
            wet: config.wet,
        });
    },

    dispose: (effect: Tone.PitchShift) => {
        effect.dispose();
    },
};
