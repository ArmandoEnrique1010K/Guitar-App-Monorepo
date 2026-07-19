import type { StateCreator } from 'zustand';
import * as Tone from 'tone';
import { getAllNoteSamples } from '@/api';
import type { GuitarNotes } from '@/types';
import type { PreferencesSliceType, EffectsSliceType } from '@/store';
import type { Note } from '@/types';

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

    // players: Tone.Players | null;
    // TODO: IMPLEMENTAR UN ESTADO DE CARGA
    players: Record<string, Tone.Players>;
    setPlayers: (idGuitar: string, players: Tone.Players) => void;
    initializePlayers: (
        guitarId: string,
        noteSamples: { _id: string; noteIndex: number; audioUrl: string }[],
    ) => Promise<void>;

    playNote: (stringIndex: number, noteIndex: number) => void;

    stopNote: (stringIndex: number, noteIndex: number) => void;

    // DETENER NOTAS POR CONDICIONES
    stopNotesByConditions: () => void;

    // DETENER NOTAS DEL BUCLE
    stopRepeatingNote: (stringIndex: number, noteIndex: number) => void;

    // RECONSTRUIR CADENA CUANDO SE CAMBIA UN EFECTO (CONSIDERANDO PARAMETROS INTERNOS)
    rebuildAudioGraph: () => void;

    // SILENCIAR TODO
    stopAllNotes: () => void;

    keyboardLocked: boolean;

    lockKeyboard: () => void;
    unlockKeyboard: () => void;
};

export const fretboardSlice: StateCreator<
    FretboardSliceType & PreferencesSliceType & EffectsSliceType,
    [],
    [],
    FretboardSliceType
> = (set, get) => ({
    currentNote: null,
    previousNote: null,
    activeNotes: {},
    loading: true,

    loadNoteSamples: async (guitarId: string) => {
        try {
            const data = await getAllNoteSamples(guitarId);

            // set({ noteSamples: data });
            set({ noteSamples: data instanceof Array ? data : [] });

            // TODO: CARGAR LAS NOTAS Y APLICAR LOS EFECTOS DE SONIDO
            // console.log('RECONSTRUYENDO');

            // console.log(
            //     'Players desde loadNoteSamples: ' +
            //         JSON.stringify(get().players),
            // );

            // console.log(get().players)
            // get().rebuildAudioGraph();
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

    players: {},

    // setPlayers: (idGuitar: string, players: Tone.Players) => {
    //     set({ players: { [idGuitar]: players } });
    setPlayers: (idGuitar, players) => {
        set((state) => ({
            players: {
                ...state.players,
                [idGuitar]: players,
            },
        }));
    },

    initializePlayers: async (guitarId, noteSamples) => {
        const state = get();

        // Ya está cargada
        if (state.players[guitarId]) {
            get().rebuildAudioGraph();
            return;
        }

        // const urls = Object.fromEntries(
        //     noteSamples.map((sample) => [sample.noteIndex, sample.audioUrl]),
        // );

        const urls = Object.fromEntries(
            noteSamples.map((sample) => [sample.noteIndex, sample.audioUrl]),
        );

        // PARA VER CUANTA MEMORIA SE CARGA EN EL NAVEGADOR
        // PULSA F12 -> MORE TOOLS -> PERFORMANCE MONITOR -> JS HEAP SIZE

        const players = new Tone.Players(urls);
        // const volumeNode = new Tone.Volume(0);
        let volumeNode = state.volumeNode;

        if (!volumeNode) {
            volumeNode = new Tone.Volume(0);
            volumeNode.toDestination();
        }

        players.connect(volumeNode);

        await Tone.loaded();

        // volumeNode.toDestination();

        // await Tone.loaded();

        set({
            // players: players,
            // players: {
            //     [get().selectedGuitar!._id]: players,
            // },
            volumeNode,
            players: {
                ...state.players,
                [guitarId]: players,
            },
        });

        // console.log('SE CARGO LOS PLAYERS')
        get().rebuildAudioGraph();
    },

    // Los estados de loopMode y loopModeInterval se utilizan para reproducir continuamente una nota mientras se mantiene pulsado
    playNote: (stringIndex, noteIndex) => {
        // OBTIENE LOS EFECTOS DE SONIDO DEL SLICE DE EFFECTS
        // const effects = get().effects;
        // const effectsChain = get().effectsChain;
        // const player = get().players?.player(noteIndex.toString());

        const players = get().players[get().selectedGuitar!._id];

        // if (!player) return;
        if (!players) return;

        // EFECTOS DE SONIDO QUE SE VAN A CONECTAR
        // const activeEffects = get().rebuildEffectsChain();

        // connectPlayerToEffects(player, activeEffects);

        // Duracion del archivo mp3
        // const duration = player.buffer?.duration ?? 0;
        // if (!player.loaded) return;
        const player = players.player(noteIndex.toString());

        const duration = player?.buffer?.duration ?? 0;
        if (!player?.loaded) return;

        const key = `${stringIndex}-${noteIndex}`;

        // Si se toca la nota en la misma cuerda y acorde, se detiene la anterior
        const existingNote = get().activeNotes[key];

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

        let intervalId: number | undefined;
        let timeoutId: number | undefined;

        // Si el modo bucle esta activo, se reproduce la nota continuamente
        if (loopMode) {
            intervalId = window.setInterval(() => {
                // const currentPlayer = get().players?.player(
                //     noteIndex.toString(),
                // );

                const currentPlayer = player;

                if (!currentPlayer?.loaded) return;

                currentPlayer.stop();
                currentPlayer.start();
            }, loopIntervalMs);
        }

        if (!loopMode) {
            timeoutId = window.setTimeout(() => {
                const currentActiveNote = get().activeNotes[key];

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
                stringIndex,
            },
        });

        get().stopNotesByConditions();
        // player.start();

        player?.start();

        set({
            activeNotes: {
                ...get().activeNotes,
                [key]: {
                    stringIndex,
                    noteIndex,
                    // player,
                    player: player,
                    timeoutId,
                    intervalId,
                    isLooping: loopMode,
                },
            },
        });

        // SOLAMENTE SI EL MODO AUTOMUTE ESTA ACTIVO, DEBE SILENCIAR LA NOTA REPRODUCIDA
        if (get().autoMute) {
            setTimeout(() => {
                get().stopNote(stringIndex, noteIndex);
            }, get().autoMuteDelayMs);
        }

        // Aqui se obtiene el valor de volumeNode
        // console.log('Desde playnote', get().volumeNode.volume.value);
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
        Object.entries(activeNotes).forEach(([key, active]) => {
            const isSameNote =
                active.stringIndex === current.stringIndex &&
                active.noteIndex === current.noteIndex;

            if (isSameNote) return;

            const sameString = active.stringIndex === current.stringIndex;

            const differentString = active.stringIndex !== current.stringIndex;

            const mustStop =
                (sameString && !get().allowSameStringOverlap) ||
                (differentString && !get().allowDifferentStringOverlap);

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
        });

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
                    isLooping: false,
                },
            },
        });

        // console.log(
        //     'STOP LOOP',
        //     key,
        //     Object.keys(get().activeNotes)
        // );
    },

    rebuildAudioGraph: () => {
        const state = get();

        // TypeError: Converting circular structure to JSON --> starting at object with constructor 'AudioContext'
        // console.log(
        //     'Players desde rebuildAudioGraph: ' + JSON.stringify(state.players),
        // );

        // get().stopAllNotes();
        const volumeNode = state.volumeNode;

        if (!volumeNode) return;

        const activeEffects = state.effectsOrder
            .filter((effectName) => state.effects[effectName].enabled)
            .map((effectName) => state.effectsChain[effectName])
            .filter(Boolean);

        // console.log(
        //     'Efectos activos:',
        //     activeEffects.length,
        //     activeEffects.map((e) => e.name ?? e.constructor.name),
        // );

        volumeNode.disconnect();

        // limpiar conexiones anteriores

        activeEffects.forEach((effect) => {
            effect.disconnect();
        });

        // conectar cadena

        const guitarId = state.selectedGuitar!._id;

        // get().setPlayers(guitarId, get().players[guitarId]);

        // console.log({
        //     guitarId,
        //     player: state.players[guitarId],
        // });

        // Object.values(state.players).forEach((player) => {
        //     player.disconnect();
        // });

        const currentPlayer = state.players[guitarId];
        if (!currentPlayer) return;

        if (activeEffects.length === 0) {
            // state.players?.disconnect();
            // state.players?.connect(volumeNode);

            // console.log('Current player:', currentPlayer);
            currentPlayer.disconnect();

            // console.log('Current player:', currentPlayer);
            currentPlayer.connect(volumeNode);

            volumeNode.toDestination();

            return;
        }

        // state.players?.disconnect();
        // state.players?.connect(activeEffects[0]);
        currentPlayer.disconnect();
        currentPlayer.connect(activeEffects[0]);

        for (let i = 0; i < activeEffects.length - 1; i++) {
            activeEffects[i].connect(activeEffects[i + 1]);
        }

        activeEffects[activeEffects.length - 1].connect(volumeNode);

        volumeNode.toDestination();
    },

    stopAllNotes() {
        const state = get();

        // Detener todas las notas activas
        Object.keys(state.activeNotes).forEach((key) => {
            const activeNote = state.activeNotes[key];
            if (activeNote && activeNote.intervalId) {
                clearInterval(activeNote.intervalId);
            }
        });

        // Silenciar la reproducción de todas las notas activas
        Object.keys(state.activeNotes).forEach((key) => {
            const activeNote = state.activeNotes[key];
            if (activeNote && activeNote.player) {
                activeNote.player.stop();
            }
        });

        // Limpiar el estado de notas activas
        set({ activeNotes: {} });
    },

    keyboardLocked: false,

    lockKeyboard: () => {
        set({ keyboardLocked: true });
    },

    unlockKeyboard: () => {
        set({ keyboardLocked: false });
    },
});
