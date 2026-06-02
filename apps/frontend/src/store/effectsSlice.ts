import type { EffectHandlers, Effects, EffectsChain } from "@/schemas"
import type { StateCreator } from "zustand"
import { distortionHandler } from "./handlers/distortion.handler";
import { INITIAL_DISTORTION } from "@/constants/distortion.constants";



// TIPADO DE EFECTOS
export type EffectsSliceType = {
    effectsOrder: Array<keyof Effects>;
    effects: Effects;
    effectsChain: EffectsChain;
    effectHandlers: EffectHandlers;
};

export const effectsSlice:
    StateCreator<EffectsSliceType> = (
        set,
        get
    ) => ({
        effectsOrder: [
            "distortion"
        ],

        effects: {
            distortion:
                INITIAL_DISTORTION
        },

        effectsChain: {
            distortion: null
        },

        effectHandlers: {
            distortion:
                distortionHandler
        }
    });