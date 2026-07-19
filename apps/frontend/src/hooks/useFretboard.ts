import { useAppStore } from '@/store';

export const useFretboard = () => {
    const currentNote = useAppStore((state) => state.currentNote);
    const previousNote = useAppStore((state) => state.previousNote);
    const loading = useAppStore((state) => state.loading);
    const loadNoteSamples = useAppStore((state) => state.loadNoteSamples);
    const noteSamples = useAppStore((state) => state.noteSamples);
    const neck = useAppStore((state) => state.neck);
    const setNeck = useAppStore((state) => state.setNeck);

    const keyboardMode = useAppStore((state) => state.keyboardMode);
    const setKeyboardMode = useAppStore((state) => state.setKeyboardMode);
    const players = useAppStore((state) => state.players);
    const setPlayers = useAppStore((state) => state.setPlayers);
    const initializePlayers = useAppStore((state) => state.initializePlayers);
    const playNote = useAppStore((state) => state.playNote);
    const stopNote = useAppStore((state) => state.stopNote);
    const stopNotesByConditions = useAppStore(
        (state) => state.stopNotesByConditions,
    );
    const stopRepeatingNote = useAppStore((state) => state.stopRepeatingNote);

    const keyboardLocked = useAppStore((state) => state.keyboardLocked);
    const lockKeyboard = useAppStore((state) => state.lockKeyboard);
    const unlockKeyboard = useAppStore((state) => state.unlockKeyboard);

    return {
        currentNote,
        previousNote,
        loading,
        loadNoteSamples,
        noteSamples,
        neck,
        setNeck,
        keyboardMode,
        setKeyboardMode,
        players,
        setPlayers,
        initializePlayers,
        playNote,
        stopNote,
        stopNotesByConditions,
        stopRepeatingNote,
        keyboardLocked,
        lockKeyboard,
        unlockKeyboard,
    };
};
