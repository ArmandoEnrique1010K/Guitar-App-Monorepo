import { useAppStore } from '@/store';

export const useFretboard = () => {
    const currentPlayedNote = useAppStore((state) => state.currentPlayedNote);
    const previousPlayedNote = useAppStore((state) => state.previousPlayedNote);

    const neck = useAppStore((state) => state.neck);
    const setNeck = useAppStore((state) => state.setNeck);

    const noteSamples = useAppStore((state) => state.noteSamples);
    const loadingFretboard = useAppStore((state) => state.loadingFretboard);
    const loadNoteSamples = useAppStore((state) => state.loadNoteSamples);

    const players = useAppStore((state) => state.players);
    const setPlayers = useAppStore((state) => state.setPlayers);
    const initializePlayers = useAppStore((state) => state.initializePlayers);

    const playNote = useAppStore((state) => state.playNote);
    const stopNote = useAppStore((state) => state.stopNote);
    const stopNotesByConditions = useAppStore(
        (state) => state.stopNotesByConditions,
    );
    const stopRepeatingNote = useAppStore((state) => state.stopRepeatingNote);
    const stopAllNotes = useAppStore((state) => state.stopAllNotes);

    const keyboardLocked = useAppStore((state) => state.keyboardLocked);
    const lockKeyboard = useAppStore((state) => state.lockKeyboard);
    const unlockKeyboard = useAppStore((state) => state.unlockKeyboard);

    return {
        currentPlayedNote,
        previousPlayedNote,
        neck,
        setNeck,
        noteSamples,
        loadingFretboard,
        loadNoteSamples,
        players,
        setPlayers,
        initializePlayers,
        playNote,
        stopNote,
        stopNotesByConditions,
        stopRepeatingNote,
        stopAllNotes,
        keyboardLocked,
        lockKeyboard,
        unlockKeyboard,
    };
};
