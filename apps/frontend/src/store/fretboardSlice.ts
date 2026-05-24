import type { Note } from '@/schemas';
import type { StateCreator } from 'zustand';

export type FretboardSliceType = {
    currentNote: Note | null;
    previousNote: Note | null;
    loading: boolean; // Carga inicial
};

export const fretboardSlice: StateCreator<FretboardSliceType> = () => ({
    currentNote: null,
    previousNote: null,
    loading: true,
});
