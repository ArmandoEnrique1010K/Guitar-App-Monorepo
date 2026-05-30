import { useAppStore } from '@/store/useAppStore';

export const useFretboard = () => {
    const currentNote = useAppStore((state) => state.currentNote);
    const previousNote = useAppStore((state) => state.previousNote);
    const loading = useAppStore((state) => state.loading);
    const loadNoteSamples = useAppStore((state) => state.loadNoteSamples);
    const noteSamples = useAppStore((state) => state.noteSamples);

    return {
        currentNote,
        previousNote,
        loading,
        loadNoteSamples,
        noteSamples,
    };
};
