import type { PingPongDelayConfig } from '@/types';
import * as Tone from 'tone';

export const pingPongDelayHandler = {
    create: () => {
        return new Tone.PingPongDelay();
    },

    configure: (effect: Tone.PingPongDelay, config: PingPongDelayConfig) => {
        effect.delayTime.value = config.delayTime;
        effect.feedback.value = config.feedback;
        effect.wet.value = config.wet;
    },

    dispose: (effect: Tone.PingPongDelay) => {
        effect.dispose();
    },
};
