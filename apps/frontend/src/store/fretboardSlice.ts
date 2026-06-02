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
            timeoutId?: number;
            intervalId?: number;
            isLooping: boolean;
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

    // DETENER NOTAS DEL BUCLE
    stopRepeatingNote: (stringIndex: number, noteIndex: number) => void

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

        // console.log('SE CARGO LOS PLAYERS')
    },


    // Los estados de loopMode y loopModeInterval se utilizan para reproducir continuamente una nota mientras se mantiene pulsado
    playNote: (stringIndex, noteIndex) => {

        const player =
            get().players?.player(noteIndex.toString());

        if (!player) return;

        // Duracion del archivo mp3
        const duration =
            player.buffer?.duration ?? 0;

        if (!player.loaded) return;

        const key = `${stringIndex}-${noteIndex}`;

        // console.log(
        //     'PLAY NOTE',
        //     key,
        //     get().activeNotes[key]
        // );

        // Si se toca la nota en la misma cuerda y acorde, se detiene la anterior
        const existingNote =
            get().activeNotes[key];

        // console.log('EXISTING', existingNote);

        // console.log(
        //     'MISMA REFERENCIA?',
        //     existingNote?.player === player
        // );
        // MODO BUCLE 
        const loopMode = get().loopMode;
        const loopIntervalMs = get().loopIntervalMs; // Intervalo en milisegundos

        if (existingNote) {
            if (existingNote.timeoutId) {
                clearTimeout(existingNote.timeoutId);
            }

            // Si hay un intervalo, tambien lo debe limpiar
            if (existingNote.intervalId) {
                clearInterval(existingNote.intervalId);
            }

            existingNote.player.stop();

            const activeNotes = {
                ...get().activeNotes,
            };

            delete activeNotes[key];

            set({ activeNotes });

        }
        // console.log(
        //     'ACTIVE COUNT',
        //     Object.keys(get().activeNotes).length
        // );


        let intervalId: number | undefined;
        let timeoutId: number | undefined;

        // Si el modo bucle esta activo, se reproduce la nota continuamente
        if (loopMode) {
            intervalId = window.setInterval(() => {
                // console.log(
                //     'LOOP ACTIVO',
                //     key,
                //     Object.keys(get().activeNotes)
                // );

                const currentPlayer =
                    get().players?.player(noteIndex.toString());

                if (!currentPlayer?.loaded) return;

                currentPlayer.stop();
                currentPlayer.start();
            }, loopIntervalMs);
        }

        if (!loopMode) {
            timeoutId = window.setTimeout(() => {
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
        }

        // DEBE ACTUALIZAR LA NOTA ANTERIOR Y LA NUEVA QUE SE REPRODUCE
        set({
            previousNote: get().currentNote,
            currentNote: {
                noteIndex,
                stringIndex
            }
        })

        // console.log(
        //     'ANTES DE llamar a stopNotesByConditions',
        //     Object.keys(get().activeNotes)
        // );

        get().stopNotesByConditions();
        player.start();
        set({
            activeNotes: {
                ...get().activeNotes,
                [key]: {
                    stringIndex,
                    noteIndex,
                    player,
                    timeoutId,
                    intervalId,
                    isLooping: loopMode
                }
            }
        });
        // console.log(
        //     'ACTIVE NOTES DESPUES DEL SET',
        //     Object.keys(get().activeNotes)
        // );

        // SOLAMENTE SI EL MODO AUTOMUTE ESTA ACTIVO, DEBE SILENCIAR LA NOTA REPRODUCIDA
        if (get().autoMute) {

            setTimeout(() => {
                get().stopNote(stringIndex, noteIndex);
            }, get().autoMuteDelayMs);
        }


        // if (!players) return;

        // players.player(noteIndex.toString()).start();
    },

    stopNote: (stringIndex, noteIndex) => {
        const key = `${stringIndex}-${noteIndex}`;

        const activeNote = get().activeNotes[key];

        if (!activeNote) return;

        if (activeNote.timeoutId) {
            clearTimeout(activeNote.timeoutId);
        }

        if (activeNote.intervalId) {
            clearInterval(activeNote.intervalId);
        }

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

        // console.log(
        //     'STOP CONDITIONS',
        //     current,
        //     {
        //         allowSameStringOverlap: get().allowSameStringOverlap,
        //         allowDifferentStringOverlap: get().allowDifferentStringOverlap
        //     }
        // );

        const updatedActiveNotes = { ...activeNotes };

        // console.log(
        //     'ACTIVE NOTES',
        //     Object.keys(activeNotes)
        // );
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

                const mustStop =
                    (sameString &&
                        !get().allowSameStringOverlap) ||
                    (differentString &&
                        !get().allowDifferentStringOverlap);

                if (!mustStop) return;

                active.player.stop();
                // console.log(
                //     'SILENCIANDO',
                //     key,
                //     {
                //         sameString,
                //         differentString
                //     }
                // );
                if (active.intervalId) {
                    clearInterval(active.intervalId);
                }

                if (active.timeoutId) {
                    clearTimeout(active.timeoutId);
                }

                delete updatedActiveNotes[key];
            }
        );

        // console.log(
        //     'DESPUES stopNotesByConditions',
        //     Object.keys(updatedActiveNotes)
        // );

        set({ activeNotes: updatedActiveNotes });
    },

    // NOTA: ESTA FUNCIÓN SE LLAMARA CUANDO SE SUELTE LA TECLA O CUANDO SE SUELTE EL CLICK SOBRE EL BOTON DE LA NOTA 
    stopRepeatingNote: (stringIndex, noteIndex) => {
        const key = `${stringIndex}-${noteIndex}`;
        // console.log(
        //     'STOP LOOP',
        //     key,
        //     Object.keys(get().activeNotes)
        // );

        const activeNote = get().activeNotes[key];

        if (!activeNote) return;

        if (activeNote.intervalId) {
            clearInterval(activeNote.intervalId);
        }

        // NOTA: ESTO HACE UN CORTE ABRUPTO AL SOLTAR EL TECLADO O EL MOUSE
        // activeNote.player.stop();

        // NO DECOMENTAR ESTO
        // const activeNotes = {
        //     ...get().activeNotes,
        // };

        // delete activeNotes[key];

        // console.log('ELIMINANDO LOOP', key, activeNote.intervalId);

        // set({ activeNotes });

        // TODO: SI LOOPMODE ESTA EN TRUE, SE MANTIENE EL ESTADO DE activeNotes, NO SE ELIMINAN LAS NOTAS LUEGO DE QUE HAYA TERMINADO EL TIEMPO DE REPRODUCCIÓN
        set({
            activeNotes: {
                ...get().activeNotes,
                [key]: {
                    ...activeNote,
                    intervalId: undefined,
                    isLooping: false
                }
            }
        });

        // console.log(
        //     'STOP LOOP',
        //     key,
        //     Object.keys(get().activeNotes)
        // );

    },
});