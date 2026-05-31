import { useAppStore } from '@/store/useAppStore';

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
    };
};
