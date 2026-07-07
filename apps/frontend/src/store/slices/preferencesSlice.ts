import { getAllGuitars } from '@/api';
import type { StateCreator } from 'zustand';
import * as Tone from 'tone';
import type { FretboardSliceType } from '@/store';
import type { Guitar } from '@/types';

export type PreferencesSliceType = {
    // Guitarra seleccionada
    selectedGuitar: Guitar;
    // Cambiar la guitarra seleccionada
    setSelectedGuitar: (guitar: Guitar) => void;
    // Lista de guitarras
    guitars: Guitar[];
    // Establecer la lista de guitarras
    setGuitars: (guitars: Guitar[]) => void;

    // El orden de las cuerdas
    stringOrder: number[];
    moveString: (from: number, to: number) => void;

    holdToPlay: boolean; // Mantener presionado para reproducir
    toggleHoldToPlay: () => void;

    allowSameStringOverlap: boolean; // Silenciar cuando se toca la misma cuerda
    toggleAllowSameStringOverlap: () => void;

    allowDifferentStringOverlap: boolean; // Silenciar cuando se toca una cuerda diferente
    toggleAllowDifferentStringOverlap: () => void;

    loopMode: boolean; // Modo loop
    toggleLoopMode: () => void;

    loopIntervalMs: number; // Intervalo en milisegundos
    setLoopIntervalMs: (loopIntervalMs: number) => void;

    autoMute: boolean;
    toggleAutoMute: () => void;

    autoMuteDelayMs: number; // Retardo en milisegundos
    setAutoMuteDelayMs: (autoMuteDelayMs: number) => void;

    showKeyboardKeys: boolean;
    toggleShowKeyboardKeys: () => void;

    volume: number;
    setVolume: (volume: number) => void;

    loadGuitars: () => Promise<void>;

    volumeNode: Tone.Volume | null;

    showCredits: boolean;
    setShowCredits: (showCredits: boolean) => void;
};

export const preferencesSlice: StateCreator<
    PreferencesSliceType & FretboardSliceType,
    [],
    [],
    PreferencesSliceType
> = (set, get) => ({
    selectedGuitar: {
        _id: '',
        name: '',
    },
    guitars: [],

    stringOrder: [5, 4, 3, 2, 1, 0],

    volume: 100,
    holdToPlay: false,

    // Mantener reproduciendo notas en la misma cuerda
    allowSameStringOverlap: false,

    // Mantener reproduciendo notas en cuerdas diferentes
    allowDifferentStringOverlap: true, // El comportamiento de una guitarra es silenciar cuando se toca una cuerda diferente
    loopMode: false,
    loopIntervalMs: 50,
    autoMute: false,
    autoMuteDelayMs: 100,
    showKeyboardKeys: true,

    // TODO: CUANDO CAMBIE DE GUITARRA TAMBIEN DEBE CONSTRUIR LOS EFECTOS DE SONIDO NUEVAMENTE PARA QUE LOS APLIQUE
    setSelectedGuitar: (guitar: Guitar) => {
        set({ selectedGuitar: guitar });
    },

    moveString: (from: number, to: number) => {
        set((state) => {
            const newOrder = [...state.stringOrder];

            const [removed] = newOrder.splice(from, 1);

            newOrder.splice(to, 0, removed);

            return {
                stringOrder: newOrder,
            };
        });
    },

    setGuitars: (guitars: Guitar[]) => {
        set({ guitars: guitars });
    },

    toggleHoldToPlay: () => {
        set((state) => ({ holdToPlay: !state.holdToPlay }));
    },

    toggleAllowSameStringOverlap: () => {
        set((state) => ({
            allowSameStringOverlap: !state.allowSameStringOverlap,
        }));
    },

    toggleAllowDifferentStringOverlap: () => {
        set((state) => ({
            allowDifferentStringOverlap: !state.allowDifferentStringOverlap,
        }));
    },

    toggleLoopMode: () => {
        set((state) => ({ loopMode: !state.loopMode }));
    },

    setLoopIntervalMs: (loopIntervalMs: number) => {
        set({ loopIntervalMs });
    },

    toggleAutoMute: () => {
        set((state) => ({ autoMute: !state.autoMute }));
    },

    setAutoMuteDelayMs: (autoMuteDelayMs: number) => {
        set({ autoMuteDelayMs });
    },

    toggleShowKeyboardKeys: () => {
        set((state) => ({ showKeyboardKeys: !state.showKeyboardKeys }));
    },

    // Volume es un valor entre 0 y 100
    setVolume: (volume: number) => {
        const volumeNode = get().volumeNode;

        // console.trace('setVolume', volume);

        if (volumeNode) {
            volumeNode.volume.value = Tone.gainToDb(volume / 100);
        }

        set({ volume });
    },
    loadGuitars: async () => {
        try {
            const data = await getAllGuitars();

            set({
                guitars: data,
                selectedGuitar: data[0],
            });

            // console.log(get().guitars);
        } catch (error) {
            console.error(error);
        }
    },

    volumeNode: null,

    showCredits: false,
    setShowCredits: (showCredits: boolean) => {
        set({ showCredits });
    },
});
