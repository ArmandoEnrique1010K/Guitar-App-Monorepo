import type { EffectHandlers, Effects, EffectsChain } from '@/schemas';
import type { StateCreator } from 'zustand';
import { distortionHandler } from './handlers/distortion.handler';
import { INITIAL_DISTORTION } from '@/constants/distortion.constants';
import { INITIAL_REVERB } from '@/constants/reverb.constants';
import { reverbHandler } from './handlers/reverb.handler';

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
        // TODO: ESTO DEBE ESTAR VACIO AL CARGAR LA PAGINA
        // EL ORDEN IMPORTA
    ],

    effects: {
        distortion: INITIAL_DISTORTION,
        reverb: INITIAL_REVERB,
    },

    effectsChain: {
        distortion: null,
        reverb: null,
    },

    effectHandlers: {
        distortion: distortionHandler,
        reverb: reverbHandler,
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

        state.setCurrentEffectSelected(effectName);
    },
    setCurrentEffectSelected: (effectName) => {
        set({ currentEffectSelected: effectName });
    },
});
