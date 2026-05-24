import { useAppStore } from '@/store/useAppStore';

export const useControlBar = () => {
    // CONFIGURACIONES EN LA BARRA
    const rootChord = useAppStore((state) => state.rootChord);
    const changeRootChord = useAppStore((state) => state.changeRootChord);
    const lockOpenString = useAppStore((state) => state.lockOpenString);
    const toogleLockOpenString = useAppStore(
        (state) => state.toogleLockOpenString,
    );
    const minRootChord = useAppStore((state) => state.minRootChord);
    const maxRootChord = useAppStore((state) => state.maxRootChord);

    return {
        rootChord,
        changeRootChord,
        lockOpenString,
        toogleLockOpenString,
        minRootChord,
        maxRootChord,
    };
};
