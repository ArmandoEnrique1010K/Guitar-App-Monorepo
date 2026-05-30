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
    neck: [],

    setNeck: (neck: GuitarNotes) => {
        set({ neck });
    },
});
