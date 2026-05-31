import { getAllNoteSamples } from '@/api/NoteSamplesAPI';
import type { GuitarNotes, Note } from '@/schemas';
import type { StateCreator } from 'zustand';
import * as Tone from 'tone';
import type { PreferencesSliceType } from './preferencesSlice';

export type FretboardSliceType = {
    currentNote: Note | null;
    previousNote: Note | null;
    activeNotes: Record<
        string,
        {
            stringIndex: number;
            noteIndex: number;
            player: Tone.Player;
            timeoutId: number;
        }
    >;
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

    playNote: (stringIndex: number, noteIndex: number) => void;

    stopNote: (stringIndex: number, noteIndex: number) => void;

    // DETENER NOTAS POR CONDICIONES
    stopNotesByConditions: () => void;

};

export const fretboardSlice: StateCreator<FretboardSliceType & PreferencesSliceType, [], [], FretboardSliceType> = (set, get) => ({
    currentNote: null,
    previousNote: null,
    activeNotes: {},
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


        // PARA VER CUANTA MEMORIA SE CARGA EN EL NAVEGADOR
        // PULSA F12 -> MORE TOOLS -> PERFORMANCE MONITOR -> JS HEAP SIZE

        const players = new Tone.Players(urls);
        const volumeNode = new Tone.Volume(0);

        await Tone.loaded();

        players.connect(volumeNode);

        volumeNode.toDestination();

        await Tone.loaded();

        set({
            players: players,
            volumeNode
        });

        console.log('SE CARGO LOS PLAYERS')
    },


    playNote: (stringIndex, noteIndex) => {
        const player =
            get().players?.player(noteIndex.toString());

        if (!player) return;

        // Duracion del archivo mp3
        const duration =
            player.buffer?.duration ?? 0;

        if (!player.loaded) return;

        const key = `${stringIndex}-${noteIndex}`;

        // Si se toca la nota en la misma cuerda y acorde, se detiene la anterior
        const existingNote =
            get().activeNotes[key];

        // console.log('EXISTING', existingNote);

        // console.log(
        //     'MISMA REFERENCIA?',
        //     existingNote?.player === player
        // );


        if (existingNote) {
            clearTimeout(existingNote.timeoutId);

            existingNote.player.stop();
        }
        // console.log(
        //     'ACTIVE COUNT',
        //     Object.keys(get().activeNotes).length
        // );

        const timeoutId = window.setTimeout(() => {
            const currentActiveNote =
                get().activeNotes[key];

            if (
                !currentActiveNote ||
                currentActiveNote.timeoutId !== timeoutId
            ) {
                return;
            }

            const activeNotes = {
                ...get().activeNotes,
            };

            delete activeNotes[key];

            set({ activeNotes });
        }, duration * 1000);


        set({
            activeNotes: {
                ...get().activeNotes,
                [key]: {
                    stringIndex,
                    noteIndex,
                    player,
                    timeoutId
                }
            }
        });
        // DEBE ACTUALIZAR LA NOTA ANTERIOR Y LA NUEVA QUE SE REPRODUCE
        set({
            previousNote: get().currentNote,
            currentNote: {
                noteIndex,
                stringIndex
            }
        })
        get().stopNotesByConditions();

        // if (!players) return;

        // players.player(noteIndex.toString()).start();

        player.start();
    },

    stopNote: (stringIndex, noteIndex) => {
        const key = `${stringIndex}-${noteIndex}`;

        const activeNote = get().activeNotes[key];

        if (!activeNote) return;

        clearTimeout(activeNote.timeoutId);

        activeNote.player.stop();

        const activeNotes = {
            ...get().activeNotes,
        };

        delete activeNotes[key];

        set({ activeNotes });
    },

    stopNotesByConditions: () => {

        // Ten en cuenta los siguientes estados:
        // get().allowSameStringOverlap (booleano) -> Permite reproducir notas en la misma cuerda sin detener la anterior
        // get().allowDifferentStringOverlap (booleano) -> Permite reproducir notas en cuerdas diferentes sin detener la anterior
        // get().currentNote (objeto con propiedades stringIndex y noteIndex) -> Nota actual que se está reproduciendo

        // IMPLEMENTAR LOGICA PARA DETENER NOTAS POR CONDICIONES

        const current = get().currentNote;

        if (!current) return;

        const activeNotes = get().activeNotes;

        Object.entries(activeNotes).forEach(
            ([key, active]) => {

                const isSameNote =
                    active.stringIndex === current.stringIndex &&
                    active.noteIndex === current.noteIndex;

                if (isSameNote) return;

                const sameString =
                    active.stringIndex === current.stringIndex;

                const differentString =
                    active.stringIndex !== current.stringIndex;

                if (
                    sameString &&
                    !get().allowSameStringOverlap
                ) {
                    active.player.stop();
                }

                if (
                    differentString &&
                    !get().allowDifferentStringOverlap
                ) {
                    active.player.stop();
                }
            }
        );
    }
});