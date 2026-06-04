import type { EffectHandlers, Effects, EffectsChain } from '@/schemas';
import type { StateCreator } from 'zustand';
import { distortionHandler } from './handlers/distortion.handler';
import { DISTORTION_SCHEMA } from '@/constants/distortion.constants';
import { REVERB_SCHEMA } from '@/constants/reverb.constants';
import { reverbHandler } from './handlers/reverb.handler';
import { TREMOLO_SCHEMA } from '@/constants/tremolo.constants';
import { VIBRATO_SCHEMA } from '@/constants/vibrato.constants';
import { CHORUS_SCHEMA } from '@/constants/chorus.constants';
import { tremoloHandler } from './handlers/tremolo.handler';
import { vibratoHandler } from './handlers/vibrato.handler';
import { chorusHandler } from './handlers/chorus.handler';

// TIPADO DE EFECTOS
export type EffectsSliceType = {
    effectsOrder: Array<keyof Effects>;
    effects: Effects;
    effectsChain: EffectsChain;
    effectHandlers: EffectHandlers;
    currentEffectSelected: keyof Effects | null;
    setEffectsOrder: (effectsOrder: Array<keyof Effects>) => void;
    updateEffect: <T extends keyof Effects>(
        effectName: T,
        config: Partial<Effects[T]>,
    ) => void;
    toggleEffect: (effectName: keyof Effects) => void;

    moveEffect: (fromIndex: number, toIndex: number) => void;

    createEffectInstance: (effectName: keyof Effects) => void;

    removeEffectInstance: (effectName: keyof Effects) => void;

    rebuildEffectsChain: () => EffectsChain[keyof EffectsChain][];
    addEffect: (effectName: keyof Effects) => void;

    setCurrentEffectSelected: (effectName: keyof Effects | null) => void;
};

export const effectsSlice: StateCreator<EffectsSliceType> = (set, get) => ({
    effectsOrder: [
        //  ESTO DEBE ESTAR VACIO AL CARGAR LA PAGINA
        // EL ORDEN IMPORTA, LOS EFECTOS PRESENTES EN LA CADENA
    ],

    // OBJETO CON TODOS LOS EFECTOS DE SONIDO DISPONIBLES (DATOS)
    effects: {
        distortion: {
            distortion: DISTORTION_SCHEMA.distortion.defaultValue,
            oversample: DISTORTION_SCHEMA.oversample.defaultValue,
            wet: DISTORTION_SCHEMA.wet.defaultValue,
            enabled: false,
        },
        reverb: {
            decay: REVERB_SCHEMA.decay.defaultValue,
            preDelay: REVERB_SCHEMA.preDelay.defaultValue,
            wet: REVERB_SCHEMA.wet.defaultValue,
            enabled: false,
        },
        tremolo: {
            depth: TREMOLO_SCHEMA.depth.defaultValue,
            frequency: TREMOLO_SCHEMA.frequency.defaultValue,
            spread: TREMOLO_SCHEMA.spread.defaultValue,
            type: TREMOLO_SCHEMA.type.defaultValue,
            wet: TREMOLO_SCHEMA.wet.defaultValue,
            enabled: false,
        },
        vibrato: {
            depth: VIBRATO_SCHEMA.depth.defaultValue,
            frequency: VIBRATO_SCHEMA.frequency.defaultValue,
            type: VIBRATO_SCHEMA.type.defaultValue,
            wet: VIBRATO_SCHEMA.wet.defaultValue,
            enabled: false,
        },
        chorus: {
            delayTime: CHORUS_SCHEMA.delayTime.defaultValue,
            depth: CHORUS_SCHEMA.depth.defaultValue,
            frequency: CHORUS_SCHEMA.frequency.defaultValue,
            feedback: CHORUS_SCHEMA.feedback.defaultValue,
            spread: CHORUS_SCHEMA.spread.defaultValue,
            type: CHORUS_SCHEMA.type.defaultValue,
            wet: CHORUS_SCHEMA.wet.defaultValue,
            enabled: false,
        },
    },

    // AQUI ESTAN LOS EFECTOS REALES (DEBEN SER TODOS)
    effectsChain: {
        distortion: null,
        reverb: null,
        tremolo: null,
        vibrato: null,
        chorus: null,
    },

    effectHandlers: {
        distortion: distortionHandler,
        reverb: reverbHandler,
        tremolo: tremoloHandler,
        vibrato: vibratoHandler,
        chorus: chorusHandler,
    },

    currentEffectSelected: null,

    setEffectsOrder: (effectsOrder) => {
        set({ effectsOrder });
    },
    updateEffect: (effectName, config) => {
        set((state) => ({
            effects: {
                ...state.effects,

                [effectName]: {
                    ...state.effects[effectName],
                    ...config,
                },
            },
        }));

        const state = get();

        const effect = state.effectsChain[effectName];

        const handler = state.effectHandlers[effectName];

        if (effect) {
            handler.configure(
                effect as never,
                state.effects[effectName] as never,
            );
        }
    },
    toggleEffect: (effectName) => {
        set((state) => ({
            effects: {
                ...state.effects,

                [effectName]: {
                    ...state.effects[effectName],
                    enabled: !state.effects[effectName].enabled,
                },
            },
        }));
    },
    moveEffect: (fromIndex, toIndex) => {
        set((state) => {
            const newOrder = [...state.effectsOrder];

            const [removed] = newOrder.splice(fromIndex, 1);

            newOrder.splice(toIndex, 0, removed);

            return {
                effectsOrder: newOrder,
            };
        });
    },
    createEffectInstance: (effectName) => {
        const state = get();

        if (state.effectsChain[effectName]) {
            return;
        }

        const instance = state.effectHandlers[effectName].create();

        set((state) => ({
            effectsChain: {
                ...state.effectsChain,

                [effectName]: instance,
            },
        }));

        state.effectHandlers[effectName].configure(
            instance as never,
            state.effects[effectName] as never,
        );
    },
    removeEffectInstance: (effectName) => {
        const state = get();

        const effect = state.effectsChain[effectName];

        if (!effect) {
            return;
        }

        effect.dispose();

        set((state) => ({
            effectsChain: {
                ...state.effectsChain,

                [effectName]: null,
            },
        }));

        // TAMBIEN DEBE MODIFICAR EL ESTADO DE EFFECTSORDER
        console.log(effectName);
        set((state) => ({
            effectsOrder: state.effectsOrder.filter(
                (effect) => effect !== effectName,
            ),
        }));
    },
    rebuildEffectsChain: () => {
        const state = get();

        const activeEffects = state.effectsOrder
            .filter((effectName) => state.effects[effectName].enabled)
            .map((effectName) => state.effectsChain[effectName])
            .filter(Boolean);

        return activeEffects;
    },
    addEffect: (effectName) => {
        const state = get();

        if (state.effectsOrder.includes(effectName)) {
            return;
        }

        state.createEffectInstance(effectName);

        set((state) => ({
            effectsOrder: [...state.effectsOrder, effectName],
        }));

        // DEBE MARCAR LA PROPIEDAD ENABLED DEL EFECTO A TRUE
        set((state) => ({
            effects: {
                ...state.effects,
                [effectName]: {
                    ...state.effects[effectName],
                    enabled: true,
                },
            },
        }));

        state.setCurrentEffectSelected(effectName);
    },
    setCurrentEffectSelected: (effectName) => {
        set({ currentEffectSelected: effectName });
    },
});
