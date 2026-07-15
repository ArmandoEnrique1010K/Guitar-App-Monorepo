import * as Tone from 'tone';
import type { FeedBackDelayConfig } from '@/types';

export const feedbackdelayHandler = {
    create: () => {
        return new Tone.FeedbackDelay();
    },

    configure: (effect: Tone.FeedbackDelay, config: FeedBackDelayConfig) => {
        effect.set({
            delayTime: config.delayTime,
            feedback: config.feedback,
            wet: config.wet,
        });
    },

    dispose: (effect: Tone.FeedbackDelay) => {
        effect.dispose();
    },
};
