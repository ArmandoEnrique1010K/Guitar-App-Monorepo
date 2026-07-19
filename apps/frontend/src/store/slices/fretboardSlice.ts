import type { StateCreator } from 'zustand';
import * as Tone from 'tone';
import { getAllNoteSamples } from '@/api';
import type { GuitarNotes } from '@/types';
import type { PreferencesSliceType, EffectsSliceType } from '@/store';
import type { Note } from '@/types';

type ActiveNote = {
    stringIndex: number;
    noteIndex: number;
    player: Tone.Player;
    timeoutId?: number;
    intervalId?: number;
    isLooping: boolean;
};

// Monitorear el consumo de memoria de los buffers de audio cargados en el navegador.
// Abrir DevTools (F12) -> More tools -> Performance monitor -> observar el valor "JS heap size".

/**
 * Slice encargado de la lógica del mástil virtual de la guitarra.
 *
 * Responsabilidades:
 * - Cargar y administrar los samples de audio de cada nota.
 * - Inicializar los reproductores de Tone.js.
 * - Reproducir y detener notas individuales.
 * - Mantener el estado de las notas activas.
 * - Gestionar modos de interpretación (loop, automute, teclado).
 * - Reconstruir la cadena de audio cuando cambian los efectos.
 */
export type FretboardSliceType = {
    // =========================================================
    // ESTADO DE REPRODUCCIÓN
    // =========================================================

    // Nota que se está reproduciendo actualmente
    currentPlayedNote: Note | null;

    // Última nota reproducida antes de la actual
    previousPlayedNote: Note | null;

    // Registro de notas activas.
    // Clave: `${stringIndex}-${noteIndex}`
    activeNotes: Record<string, ActiveNote>;

    // =========================================================
    // ESTADO DEL MÁSTIL
    // =========================================================

    // Estructura del mástil (cuerdas y trastes)
    neck: GuitarNotes;

    // Actualiza la estructura del mástil
    setNeck: (neck: GuitarNotes) => void;

    // =========================================================
    // SAMPLES Y CARGA
    // =========================================================

    // Samples disponibles para la guitarra actual
    noteSamples: { _id: string; noteIndex: number; audioUrl: string }[];

    // Estado de carga inicial del mástil
    loadingFretboard: boolean;

    // Obtiene los samples desde la API
    loadNoteSamples: (guitarId: string) => Promise<void>;

    // =========================================================
    // PLAYERS DE TONE.JS
    // =========================================================

    // Players cacheados por guitarra
    players: Record<string, Tone.Players>;

    // Guarda los players de una guitarra
    setPlayers: (idGuitar: string, players: Tone.Players) => void;

    // Inicializa los players y buffers de audio
    initializePlayers: (
        guitarId: string,
        noteSamples: { _id: string; noteIndex: number; audioUrl: string }[],
    ) => Promise<void>;

    // =========================================================
    // CONTROL DE REPRODUCCIÓN
    // =========================================================

    // Reproduce una nota
    playNote: (stringIndex: number, noteIndex: number) => void;

    // Detiene una nota específica
    stopNote: (stringIndex: number, noteIndex: number) => void;

    // Detiene notas según reglas de solapamiento
    stopNotesByConditions: () => void;

    // Detiene el loop de una nota
    stopRepeatingNote: (stringIndex: number, noteIndex: number) => void;

    // Detiene todas las notas activas
    stopAllNotes: () => void;

    // =========================================================
    // CADENA DE AUDIO Y EFECTOS
    // =========================================================

    // Reconstruye el grafo de audio
    rebuildAudioGraph: () => void;

    // =========================================================
    // MODO TECLADO / UI
    // =========================================================

    // Bloquea temporalmente la entrada del teclado
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
    currentPlayedNote: null,
    previousPlayedNote: null,

    /**
     * Notas actualmente activas en el mástil.
     *
     * La clave tiene el formato: `${stringIndex}-${noteIndex}`
     * Ejemplo: "0-3" = cuerda 0, traste 3.
     *
     * Se almacena:
     * - la cuerda y nota reproducida,
     * - el reproductor de Tone.js asociado,
     * - timers para loop o limpieza automática,
     * - y si la nota está en modo repetición.
     */
    activeNotes: {},

    neck: [],
    /**
     * Actualiza la estructura del mástil de la guitarra.
     *
     * El `neck` contiene las notas organizadas por cuerda y traste y es utilizado
     * por los componentes visuales (`GuitarNeck`, `FretboardView`) para renderizar
     * el diapasón.
     *
     * @param neck Nueva estructura del mástil.
     */
    setNeck: (neck: GuitarNotes) => {
        set({ neck });
    },

    noteSamples: [],
    loadingFretboard: true,

    /**
     * Obtiene desde la API los samples de audio de la guitarra seleccionada.
     *
     * Si la guitarra aún no tiene reproductores inicializados, activa el estado
     * `loadingFretboard` para mostrar la pantalla de carga.
     *
     * Los samples descargados se almacenan en `noteSamples` y posteriormente son
     * utilizados por `initializePlayers` para crear los buffers de audio.
     *
     * @param guitarId Identificador de la guitarra.
     */
    loadNoteSamples: async (guitarId: string) => {
        try {
            if (!get().players[guitarId]) {
                set({ loadingFretboard: true });
            }

            const data = await getAllNoteSamples(guitarId);
            set({ noteSamples: data instanceof Array ? data : [] });
            set({ loadingFretboard: false });
        } catch (error) {
            console.error(error);
        }
    },

    players: {},
    /**
     * Guarda o reemplaza la instancia de `Tone.Players` asociada a una guitarra.
     *
     * Los players se almacenan por `guitarId` para mantenerlos en memoria y evitar
     * recargar los buffers cada vez que el usuario cambia de instrumento.
     *
     * @param idGuitar Identificador de la guitarra.
     * @param players Instancia de `Tone.Players` ya inicializada.
     */
    setPlayers: (idGuitar, players) => {
        set((state) => ({
            players: {
                ...state.players,
                [idGuitar]: players,
            },
        }));
    },

    /**
     * Crea e inicializa los reproductores de Tone.js para una guitarra.
     *
     * Flujo:
     * 1. Verifica si ya existen players en memoria.
     * 2. Convierte los samples en un mapa `{ noteIndex: url }`.
     * 3. Crea `Tone.Players`.
     * 4. Conecta la salida al `volumeNode`.
     * 5. Espera a que todos los buffers terminen de cargar.
     * 6. Guarda la instancia en el estado global.
     * 7. Reconstruye la cadena de audio y efectos.
     *
     * Los players se mantienen cacheados para mejorar el rendimiento y reducir el
     * consumo de red al cambiar entre guitarras.
     *
     * @param guitarId Identificador de la guitarra.
     * @param noteSamples Lista de samples descargados desde la API.
     */
    initializePlayers: async (guitarId, noteSamples) => {
        const state = get();
        if (state.players[guitarId]) {
            get().rebuildAudioGraph();
            return;
        }

        const urls = Object.fromEntries(
            noteSamples.map((sample) => [sample.noteIndex, sample.audioUrl]),
        );

        const players = new Tone.Players(urls);
        let volumeNode = state.volumeNode;

        if (!volumeNode) {
            volumeNode = new Tone.Volume(0);
            volumeNode.toDestination();
        }

        players.connect(volumeNode);

        await Tone.loaded();

        set({
            volumeNode,
            players: {
                ...state.players,
                [guitarId]: players,
            },
        });

        get().rebuildAudioGraph();
    },

    /**
     * Reproduce una nota del mástil.
     *
     * - Obtiene el player correspondiente a la guitarra actual.
     * - Detiene una reproducción previa de la misma nota.
     * - Configura el modo loop si está habilitado.
     * - Programa la limpieza automática cuando el sample finaliza.
     * - Actualiza la nota actual y la nota anterior.
     * - Aplica las reglas de solapamiento entre cuerdas.
     * - Registra la nota en `activeNotes`.
     * - Aplica automute si está habilitado.
     *
     * @param stringIndex Índice de la cuerda.
     * @param noteIndex Índice absoluto de la nota/sample.
     */
    playNote: (stringIndex, noteIndex) => {
        const players = get().players[get().selectedGuitar!._id];

        if (!players) return;

        const player = players.player(noteIndex.toString());

        const duration = player?.buffer?.duration ?? 0;
        if (!player?.loaded) return;

        const key = `${stringIndex}-${noteIndex}`;

        const existingNote = get().activeNotes[key];

        const loopMode = get().loopMode;
        const loopIntervalMs = get().loopIntervalMs;

        if (existingNote) {
            if (existingNote.timeoutId) {
                clearTimeout(existingNote.timeoutId);
            }

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

        if (loopMode) {
            intervalId = window.setInterval(() => {
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

        set({
            previousPlayedNote: get().currentPlayedNote,
            currentPlayedNote: {
                noteIndex,
                stringIndex,
            },
        });

        get().stopNotesByConditions();
        player?.start();

        set({
            activeNotes: {
                ...get().activeNotes,
                [key]: {
                    stringIndex,
                    noteIndex,
                    player: player,
                    timeoutId,
                    intervalId,
                    isLooping: loopMode,
                },
            },
        });

        if (get().autoMute) {
            setTimeout(() => {
                get().stopNote(stringIndex, noteIndex);
            }, get().autoMuteDelayMs);
        }
    },

    /**
     * Detiene una nota específica y la elimina del registro de notas activas.
     *
     * También limpia cualquier `timeout` o `interval` asociado a la reproducción
     * de la nota.
     *
     * @param stringIndex Índice de la cuerda.
     * @param noteIndex Índice de la nota.
     */
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

    /**
     * Detiene notas según las reglas de solapamiento configuradas.
     *
     * Reglas:
     * - `allowSameStringOverlap = false`
     *   Solo puede sonar una nota por cuerda.
     *
     * - `allowDifferentStringOverlap = false`
     *   Solo puede sonar una nota en todo el instrumento.
     *
     * La nota actualmente reproducida nunca se detiene; únicamente se evalúan las
     * notas que ya estaban activas.
     */
    stopNotesByConditions: () => {
        const current = get().currentPlayedNote;

        if (!current) return;

        const activeNotes = get().activeNotes;
        const updatedActiveNotes = { ...activeNotes };

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
            if (active.intervalId) {
                clearInterval(active.intervalId);
            }

            if (active.timeoutId) {
                clearTimeout(active.timeoutId);
            }

            delete updatedActiveNotes[key];
        });

        set({ activeNotes: updatedActiveNotes });
    },

    /**
     * Detiene la repetición de una nota en modo loop.
     *
     * Esta función se ejecuta al soltar una tecla del teclado físico o al liberar
     * el botón del mouse sobre una nota del mástil.
     *
     * Solo se cancela el `intervalId`; el sample puede continuar sonando hasta que
     * termine de forma natural para evitar cortes bruscos.
     *
     * @param stringIndex Índice de la cuerda.
     * @param noteIndex Índice de la nota.
     */
    stopRepeatingNote: (stringIndex, noteIndex) => {
        const key = `${stringIndex}-${noteIndex}`;

        const activeNote = get().activeNotes[key];

        if (!activeNote) return;

        if (activeNote.intervalId) {
            clearInterval(activeNote.intervalId);
        }

        // TODO: SI LOOPMODE ESTA EN TRUE, SE MANTIENE EL ESTADO DE activeNotes, NO SE ELIMINAN LAS
        // NOTAS LUEGO DE QUE HAYA TERMINADO EL TIEMPO DE REPRODUCCIÓN
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
    },

    /**
     * Detiene completamente toda la actividad del mástil.
     *
     * - Cancela los intervalos de loop.
     * - Detiene todos los reproductores activos.
     * - Limpia el estado `activeNotes`.
     *
     * Es útil al cambiar de guitarra, reiniciar el audio o cerrar el estudio.
     */
    stopAllNotes() {
        const state = get();

        Object.keys(state.activeNotes).forEach((key) => {
            const activeNote = state.activeNotes[key];
            if (activeNote && activeNote.intervalId) {
                clearInterval(activeNote.intervalId);
            }
        });

        Object.keys(state.activeNotes).forEach((key) => {
            const activeNote = state.activeNotes[key];
            if (activeNote && activeNote.player) {
                activeNote.player.stop();
            }
        });

        set({ activeNotes: {} });
    },

    /**
     * Reconstruye la cadena de audio de la guitarra actual.
     *
     * Cadena base:
     * `Tone.Players -> Volume -> Destination`
     *
     * Con efectos:
     * `Tone.Players -> Effect1 -> Effect2 -> ... -> Volume -> Destination`
     *
     * Se ejecuta cada vez que:
     * - se activa o desactiva un efecto,
     * - cambia el orden de los efectos,
     * - o se modifica un parámetro que requiere reconectar nodos de audio.
     */
    rebuildAudioGraph: () => {
        const state = get();

        const volumeNode = state.volumeNode;

        if (!volumeNode) return;

        const activeEffects = state.effectsOrder
            .filter((effectName) => state.effects[effectName].enabled)
            .map((effectName) => state.effectsChain[effectName])
            .filter(Boolean);

        volumeNode.disconnect();

        activeEffects.forEach((effect) => {
            effect.disconnect();
        });

        const guitarId = state.selectedGuitar!._id;

        const currentPlayer = state.players[guitarId];
        if (!currentPlayer) return;

        if (activeEffects.length === 0) {
            currentPlayer.disconnect();
            currentPlayer.connect(volumeNode);

            volumeNode.toDestination();

            return;
        }

        currentPlayer.disconnect();
        currentPlayer.connect(activeEffects[0]);

        for (let i = 0; i < activeEffects.length - 1; i++) {
            activeEffects[i].connect(activeEffects[i + 1]);
        }

        activeEffects[activeEffects.length - 1].connect(volumeNode);

        volumeNode.toDestination();
    },

    keyboardLocked: false,

    // Bloquea temporalmente la entrada del teclado físico
    lockKeyboard: () => {
        set({ keyboardLocked: true });
    },

    // Vuelve a habilitar la entrada del teclado físico para tocar el instrumento
    unlockKeyboard: () => {
        set({ keyboardLocked: false });
    },
});
