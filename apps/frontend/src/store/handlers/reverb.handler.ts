import type { ReverbConfig } from "@/schemas";
import * as Tone from "tone";

export const reverbHandler = {
    create: () => {
        return new Tone.Reverb();
    },

    configure: (
        effect: Tone.Reverb,
        config: ReverbConfig
    ) => {
        effect.decay = config.decay;

        effect.preDelay = config.preDelay;

        effect.wet.value =
            config.wet;
    },

    dispose: (
        effect: Tone.Reverb
    ) => {
        effect.dispose();
    }
};