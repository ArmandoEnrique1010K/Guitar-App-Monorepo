import { getAllNoteSamples } from '@/api/NoteSamplesAPI';
import type { GuitarNotes, Note } from '@/schemas';
import type { StateCreator } from 'zustand';
import * as Tone from 'tone';

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

    players: Tone.Players | null;
    setPlayers: (players: Tone.Players | null) => void;
    initializePlayers: (noteSamples: { _id: string; noteIndex: number; audioUrl: string }[]) => Promise<void>;

    playNote: (noteIndex: number) => void;

    stopNote: (noteIndex: number) => void;

};

export const fretboardSlice: StateCreator<FretboardSliceType> = (set, get) => ({
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
    players: null,
    setPlayers: (players: Tone.Players | null) => {
        set({ players });
    },

    initializePlayers: async (noteSamples) => {
        const urls = Object.fromEntries(
            noteSamples.map(sample => [
                sample.noteIndex,
                sample.audioUrl
            ])
        );

        const players = new Tone.Players(urls);

        await Tone.loaded();

        players.toDestination();

        set({
            players
        });
    },
    playNote: (noteIndex) => {
        const players = get().players;

        if (!players) return;

        players.player(noteIndex.toString()).start();
    },
    stopNote: (noteIndex) => {
        const players = get().players;

        if (!players) return;

        players.player(noteIndex.toString()).stop();
    },
});
