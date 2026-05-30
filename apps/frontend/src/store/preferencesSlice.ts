import { getAllGuitars } from '@/api/GuitarAPI';
import type { Instrument } from '@/schemas';
import type { StateCreator } from 'zustand';

export type PreferencesSliceType = {
    // Guitarra seleccionada
    selectedGuitar: Instrument;
    // Cambiar la guitarra seleccionada
    setSelectedGuitar: (guitar: Instrument) => void;
    // Lista de guitarras
    guitars: Instrument[];
    // Establecer la lista de guitarras
    setGuitars: (guitars: Instrument[]) => void;

    // El orden de las cuerdas
    stringOrder: number[];
    setStringOrder: (stringOrder: number[]) => void;

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
};

export const preferencesSlice: StateCreator<PreferencesSliceType> = (
    set,
    get,
) => ({
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
    loopIntervalMs: 0,
    autoMute: false,
    autoMuteDelayMs: 100,
    showKeyboardKeys: true,

    setSelectedGuitar: (guitar: Instrument) => {
        set({ selectedGuitar: guitar });
    },

    setStringOrder: (stringOrder: number[]) => {
        set({ stringOrder });
    },

    setGuitars: (guitars: Instrument[]) => {
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

    setVolume: (volume: number) => {
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
});
