import { useAppStore } from '@/store';

export const useControlBar = () => {
    const rootChord = useAppStore((state) => state.rootChord);
    const setRootChord = useAppStore((state) => state.setRootChord);
    const lockOpenString = useAppStore((state) => state.lockOpenString);
    const toggleLockOpenString = useAppStore(
        (state) => state.toggleLockOpenString,
    );
    const minRootChord = useAppStore((state) => state.minRootChord);
    const maxRootChord = useAppStore((state) => state.maxRootChord);

    return {
        rootChord,
        setRootChord,
        lockOpenString,
        toggleLockOpenString,
        minRootChord,
        maxRootChord,
    };
};
