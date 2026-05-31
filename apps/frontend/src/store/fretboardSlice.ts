import { getAllNoteSamples } from '@/api/NoteSamplesAPI';
import type { GuitarNotes, Note } from '@/schemas';
import type { StateCreator } from 'zustand';

export type FretboardSliceType = {
    currentNote: Note | null;
    previousNote: Note | null;
    loading: boolean; // Carga inicial

    loadNoteSamples: (guitarId: string) => Promise<void>;
    noteSamples: { _id: string; noteIndex: number; audioUrl: string }[];
    neck: GuitarNotes;
    setNeck: (neck: GuitarNotes) => void;

    keyboardMode: boolean;
    setKeyboardMode: (keyboardMode: boolean) => void;
};

export const fretboardSlice: StateCreator<FretboardSliceType> = (set) => ({
    currentNote: null,
    previousNote: null,
    loading: true,

    loadNoteSamples: async (guitarId: string) => {
        try {
            const data = await getAllNoteSamples(guitarId);
            set({ noteSamples: data });
        } catch (error) {
            console.error(error);
        }
    },
    noteSamples: [],
    neck: [] as GuitarNotes,

    // AQUI PASA UN ERROR DE QUE frets ESTA VACIO
    setNeck: (neck: GuitarNotes) => {
        set({ neck });
    },

    keyboardMode: true, // MODO PARA TOCAR EL INSTRUMENTO, SE DESACTIVA CUANDO SE USA LA IA GENERATIVA
    setKeyboardMode: (keyboardMode: boolean) => {
        set({ keyboardMode });
    },
});
