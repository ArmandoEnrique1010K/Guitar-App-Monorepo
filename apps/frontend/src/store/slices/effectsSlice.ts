import type { EffectHandlers, Effects, EffectsChain } from '@/types';
import type { StateCreator } from 'zustand';
import { DISTORTION_SCHEMA } from '@/constants/distortion.constants';
import { REVERB_SCHEMA } from '@/constants/reverb.constants';
import { TREMOLO_SCHEMA } from '@/constants/tremolo.constants';
import { VIBRATO_SCHEMA } from '@/constants/vibrato.constants';
import { CHORUS_SCHEMA } from '@/constants/chorus.constants';
import type { FretboardSliceType } from '@/store';
import { buildDefaultEffectConfig } from '@/utils';
import {
    autofilterHandler,
    chorusHandler,
    distortionHandler,
    reverbHandler,
    tremoloHandler,
    vibratoHandler,
    feedbackdelayHandler,
    phaserHandler,
    pingPongDelayHandler,
    pitchShiftHandler,
    gateHandler,
} from '@/handlers';
import { FREEVERB_SCHEMA } from '@/constants/freeverb.constants';
import { freeverbHandler } from '@/handlers/freeverb.handler';
import type { Preset } from '@/types';
import { AUTOFILTER_SCHEMA } from '@/constants/autoFilter.constants';
import { FEEDBACKDELAY_SCHEMA } from '@/constants/feedbackDelay.constants';
import { PHASER_SCHEMA } from '@/constants/phaser.constants';
import { PINGPONGDELAY_SCHEMA } from '@/constants/pingPongDelay.contants';
import { PITCHSHIFT_SCHEMA } from '@/constants/pitchShift.contants';
import { GATE_SCHEMA } from '@/constants/gate.contants';

// TIPADO DE EFECTOS
export type EffectsSliceType = {
    effectsOrder: Array<keyof Effects>;
    effects: Effects;
    effectsChain: EffectsChain;
    effectHandlers: EffectHandlers;
    currentEffectSelected: keyof Effects | null;
    updateEffect: <T extends keyof Effects>(
        effectName: T,
        config: Partial<Effects[T]>,
    ) => void;
    toggleEffect: (effectName: keyof Effects) => void;

    moveEffect: (fromIndex: number, toIndex: number) => void;

    createEffectInstance: (effectName: keyof Effects) => void;

    resetDefaultValuesEffectInstance: (effectName: keyof Effects) => void;

    removeEffectInstance: (effectName: keyof Effects) => void;

    rebuildEffectsChain: () => EffectsChain[keyof EffectsChain][];
    addEffect: (effectName: keyof Effects) => void;

    setCurrentEffectSelected: (effectName: keyof Effects | null) => void;
    resetEffectsChain: () => void;
    loadEffectsFromPreset: (presetEffects: Preset['effects']) => void;
};

export const effectsSlice: StateCreator<
    EffectsSliceType & FretboardSliceType,
    [],
    [],
    EffectsSliceType
> = (set, get) => ({
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
        freeverb: {
            dampening: FREEVERB_SCHEMA.dampening.defaultValue,
            roomSize: FREEVERB_SCHEMA.roomSize.defaultValue,
            wet: FREEVERB_SCHEMA.wet.defaultValue,
            enabled: false,
        },
        autoFilter: {
            baseFrequency: AUTOFILTER_SCHEMA.baseFrequency.defaultValue,
            depth: AUTOFILTER_SCHEMA.depth.defaultValue,
            frequency: AUTOFILTER_SCHEMA.frequency.defaultValue,
            octaves: AUTOFILTER_SCHEMA.octaves.defaultValue,
            type: AUTOFILTER_SCHEMA.type.defaultValue,
            wet: AUTOFILTER_SCHEMA.wet.defaultValue,
            enabled: false,
        },
        feedbackDelay: {
            delayTime: FEEDBACKDELAY_SCHEMA.delayTime.defaultValue,
            feedback: FEEDBACKDELAY_SCHEMA.feedback.defaultValue,
            wet: FEEDBACKDELAY_SCHEMA.wet.defaultValue,
            enabled: false,
        },
        phaser: {
            frequency: PHASER_SCHEMA.frequency.defaultValue,
            baseFrequency: PHASER_SCHEMA.baseFrequency.defaultValue,
            octaves: PHASER_SCHEMA.octaves.defaultValue,
            q: PHASER_SCHEMA.Q.defaultValue,
            stages: PHASER_SCHEMA.stages.defaultValue,
            wet: PHASER_SCHEMA.wet.defaultValue,
            enabled: false,
        },
        pingPongDelay: {
            delayTime: PINGPONGDELAY_SCHEMA.delayTime.defaultValue,
            feedback: PINGPONGDELAY_SCHEMA.feedback.defaultValue,
            wet: PINGPONGDELAY_SCHEMA.wet.defaultValue,
            enabled: false,
        },
        pitchShift: {
            delayTime: PITCHSHIFT_SCHEMA.delayTime.defaultValue,
            feedback: PITCHSHIFT_SCHEMA.feedback.defaultValue,
            pitch: PITCHSHIFT_SCHEMA.pitch.defaultValue,
            windowSize: PITCHSHIFT_SCHEMA.windowSize.defaultValue,
            wet: PITCHSHIFT_SCHEMA.wet.defaultValue,
            enabled: false,
        },
        gate: {
            smoothing: GATE_SCHEMA.smoothing.defaultValue,
            threshold: GATE_SCHEMA.threshold.defaultValue,
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
        freeverb: null,
        autoFilter: null,
        feedbackDelay: null,
        phaser: null,
        pingPongDelay: null,
        pitchShift: null,
        gate: null,
    },

    // FUNCION AUXILIAR
    effectHandlers: {
        distortion: distortionHandler,
        reverb: reverbHandler,
        tremolo: tremoloHandler,
        vibrato: vibratoHandler,
        chorus: chorusHandler,
        freeverb: freeverbHandler,
        autoFilter: autofilterHandler,
        feedbackDelay: feedbackdelayHandler,
        phaser: phaserHandler,
        pingPongDelay: pingPongDelayHandler,
        pitchShift: pitchShiftHandler,
        gate: gateHandler,
    },

    // Ejemplo de funcion auxliar para distortion
    // export const distortionHandler = {
    //     create: () => {
    //         return new Tone.Distortion();
    //     },

    //     configure: (effect: Tone.Distortion, config: DistortionConfig) => {
    //         effect.distortion = config.distortion;
    //         effect.oversample = config.oversample;
    //         effect.wet.value = config.wet;
    //     },

    //     dispose: (effect: Tone.Distortion) => {
    //         effect.dispose();
    //     },
    // };

    // Efecto actual seleccionado
    currentEffectSelected: null,

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

    // Activa o desactiva el efecto
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

        // Solamente si se habilita el efecto de sonido, debe seleccionarlo
        if (get().effects[effectName].enabled) {
            set({ currentEffectSelected: effectName });
        }

        get().rebuildAudioGraph();
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

        get().rebuildAudioGraph();
    },

    // TODO: CONTINUAR EN LA CREACION DE CAMPOS PARA CADA EFECTO DE SONIDO
    createEffectInstance: (effectName) => {
        let instance = get().effectsChain[effectName];

        if (!instance) {
            instance = get().effectHandlers[effectName].create();

            set((state) => ({
                effectsChain: {
                    ...state.effectsChain,
                    [effectName]: instance,
                },
            }));
        }

        get().effectHandlers[effectName].configure(
            instance as never,
            get().effects[effectName] as never,
        );
    },

    resetDefaultValuesEffectInstance: (effectName) => {
        // CADA UNO DE LOS PARAMETROS DEL EFECTO DE SONIDO DEFINIDO, SE TIENE QUE ESTABLECER A SUS VALORES INICIALES
        // Llama a la función definida en utils
        const defaults = buildDefaultEffectConfig(effectName);
        get().updateEffect(effectName, defaults);
        // const state = get();

        // set((state) => ({
        //     effects: {
        //         ...state.effects,
        //         [effectName]: {
        //             ...state.effects[effectName],
        //             ...defaults,
        //         },
        //     },
        // }));

        // const effect = get().effectsChain[effectName];

        // if (effect) {
        //     state.effectHandlers[effectName].configure(
        //         effect as never,
        //         get().effects[effectName] as never,
        //     );
        // }
    },

    removeEffectInstance: (effectName) => {
        const state = get();

        const effect = state.effectsChain[effectName];

        if (!effect) {
            return;
        }

        const currentIndex = state.effectsOrder.indexOf(effectName);

        // TAMBIEN DEBE MODIFICAR EL ESTADO DE EFFECTSORDER
        const newOrder = state.effectsOrder.filter(
            (effect) => effect !== effectName,
        );

        let newSelected = state.currentEffectSelected;

        // Y CAMBIAR EL EFECTO ACTUAL SELECCIONADO

        // Si el efecto eliminado coincide con el efecto seleccionado actualmente, debe seleccionar el anterior efecto de effectsOrder
        // Pero si no hay un anterior efecto, debe seleccionar el siguiente efecto de effectsOrder
        if (state.currentEffectSelected === effectName) {
            newSelected =
                newOrder[currentIndex - 1] ?? newOrder[currentIndex] ?? null;
        }

        effect.dispose();

        set((state) => ({
            effectsChain: {
                ...state.effectsChain,
                [effectName]: null,
            },
            effectsOrder: newOrder,
            currentEffectSelected: newSelected,
        }));

        // effect.dispose();

        // set((state) => ({
        //     effectsChain: {
        //         ...state.effectsChain,

        //         [effectName]: null,
        //     },
        // }));

        // set((state) => ({
        //     effectsOrder: state.effectsOrder.filter(
        //         (effect) => effect !== effectName,
        //     ),
        // }));

        // if (state.currentEffectSelected === effectName) {
        //     set((state) => ({
        //         currentEffectSelected:
        //             state.effectsOrder[
        //                 state.effectsOrder.indexOf(effectName) - 1
        //             ] ||
        //             state.effectsOrder[
        //                 state.effectsOrder.indexOf(effectName) + 1
        //             ] ||
        //             null,
        //     }));
        // }
        state.rebuildAudioGraph();
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

        state.rebuildAudioGraph();
    },
    setCurrentEffectSelected: (effectName) => {
        set({ currentEffectSelected: effectName });
    },

    resetEffectsChain() {
        for (const effect of Object.values(get().effectsChain)) {
            effect?.dispose();
        }

        set({
            effectsChain: {
                distortion: null,
                reverb: null,
                tremolo: null,
                vibrato: null,
                chorus: null,
                freeverb: null,
                autoFilter: null,
                feedbackDelay: null,
                phaser: null,
                pingPongDelay: null,
                pitchShift: null,
                gate: null,
            },
        });
    },

    loadEffectsFromPreset(presetEffects) {
        const state = get();

        // 1. Liberar todas las instancias actuales
        Object.values(state.effectsChain).forEach((effect) => {
            effect?.dispose();
        });

        // 2. Reiniciar effectsChain
        const emptyEffectsChain = Object.keys(state.effectsChain).reduce(
            (acc, key) => {
                acc[key /* as keyof Effects*/] = null;
                return acc;
            },
            {} as typeof state.effectsChain,
        );

        // 3. Construir el nuevo estado
        const effectsOrder = [...presetEffects]
            .sort((a, b) => a.order - b.order)
            .map((effect) => effect.type) as (keyof Effects)[];

        const updatedEffects = { ...state.effects };

        for (const effect of presetEffects) {
            updatedEffects[effect.type] = {
                enabled: effect.enabled,
                ...effect.params,
            };
        }

        // 4. Actualizar Zustand
        set({
            effectsChain: emptyEffectsChain,
            effects: updatedEffects,
            effectsOrder,
            currentEffectSelected: effectsOrder[0] ?? null,
        });

        // 5. Crear todas las instancias
        for (const effectName of effectsOrder) {
            get().createEffectInstance(effectName);
        }

        // 6. Reconstruir el grafo de audio
        get().rebuildAudioGraph();
    },
});
