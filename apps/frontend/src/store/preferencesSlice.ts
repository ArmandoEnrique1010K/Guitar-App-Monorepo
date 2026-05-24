import type { Instrument } from '@/schemas';
import type { StateCreator } from 'zustand';

export type PreferencesSliceType = {
    // Guitarra seleccionada
    selectedGuitar: Instrument;
    // Cambiar la guitarra seleccionada
    changeSelectedGuitar: (guitar: Instrument) => void;
    // Lista de guitarras
    guitarsList: Instrument[];
    // Establecer la lista de guitarras
    setGuitarsList: (guitars: Instrument[]) => void;

    // El orden de las cuerdas
    stringOrder: number[];
    changeStringOrder: (stringOrder: number[]) => void;

    holdToPlay: boolean; // Mantener presionado para reproducir
    toogleHoldToPlay: () => void;

    muteOnSameString: boolean; // Silenciar cuando se toca la misma cuerda
    toogleMuteOnSameString: () => void;

    muteOnDifferentString: boolean; // Silenciar cuando se toca una cuerda diferente
    toogleMuteOnDifferentString: () => void;

    loopMode: boolean; // Modo loop
    toogleLoopMode: () => void;
    loopIntervalMs: number; // Intervalo en milisegundos
    changeLoopIntervalMs: (loopIntervalMs: number) => void;

    autoMute: boolean;
    toogleAutoMute: () => void;
    autoMuteDelayMs: number; // Retardo en milisegundos
    changeAutoMuteDelayMs: (autoMuteDelayMs: number) => void;

    showKeyboardKeys: boolean;
    toogleShowKeyboardKeys: () => void;

    volume: number;
};

export const preferencesSlice: StateCreator<PreferencesSliceType> = (
    set,
    // get,
) => ({
    selectedGuitar: {
        id: '0',
        name: '',
    },
    guitarsList: [],

    stringOrder: [0, 1, 2, 3, 4, 5],

    volume: 1,
    holdToPlay: false,

    muteOnSameString: false,
    muteOnDifferentString: true, // El comportamiento de una guitarra es silenciar cuando se toca una cuerda diferente
    loopMode: false,
    loopIntervalMs: 0,
    autoMute: false,
    autoMuteDelayMs: 100,
    showKeyboardKeys: true,

    changeSelectedGuitar: (guitar: Instrument) => {
        set({ selectedGuitar: guitar });
    },

    changeStringOrder: (stringOrder: number[]) => {
        set({ stringOrder });
    },

    setGuitarsList: (guitars: Instrument[]) => {
        set({ guitarsList: guitars });
    },

    toogleHoldToPlay: () => {
        set((state) => ({ holdToPlay: !state.holdToPlay }));
    },

    toogleMuteOnSameString: () => {
        set((state) => ({ muteOnSameString: !state.muteOnSameString }));
    },

    toogleMuteOnDifferentString: () => {
        set((state) => ({
            muteOnDifferentString: !state.muteOnDifferentString,
        }));
    },

    toogleLoopMode: () => {
        set((state) => ({ loopMode: !state.loopMode }));
    },

    changeLoopIntervalMs: (loopIntervalMs: number) => {
        set({ loopIntervalMs });
    },

    toogleAutoMute: () => {
        set((state) => ({ autoMute: !state.autoMute }));
    },

    changeAutoMuteDelayMs: (autoMuteDelayMs: number) => {
        set({ autoMuteDelayMs });
    },

    toogleShowKeyboardKeys: () => {
        set((state) => ({ showKeyboardKeys: !state.showKeyboardKeys }));
    },
});
