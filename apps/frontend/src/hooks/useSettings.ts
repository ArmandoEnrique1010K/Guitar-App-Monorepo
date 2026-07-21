import { useAppStore } from '@/store';

export const useSettings = () => {
    const selectedPanel = useAppStore((state) => state.selectedPanel);
    const setSelectedPanel = useAppStore((state) => state.setSelectedPanel);
    const rootChord = useAppStore((state) => state.rootChord);
    const minRootChord = useAppStore((state) => state.minRootChord);
    const maxRootChord = useAppStore((state) => state.maxRootChord);
    const setRootChord = useAppStore((state) => state.setRootChord);
    const lockOpenString = useAppStore((state) => state.lockOpenString);
    const toggleLockOpenString = useAppStore(
        (state) => state.toggleLockOpenString,
    );
    //

    return {
        selectedPanel,
        setSelectedPanel,
        rootChord,
        setRootChord,
        lockOpenString,
        toggleLockOpenString,
        minRootChord,
        maxRootChord,
    };
};
