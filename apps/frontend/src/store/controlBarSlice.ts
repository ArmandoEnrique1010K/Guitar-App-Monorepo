import type { StateCreator } from 'zustand';

// BARRA DE CONFIGURACIONES: ACORDE INICIAL, EMPEZAR DEL ACORDE, PAUSAR TODAS LAS NOTAS REPRODUCIDAS
export type ControlBarSliceType = {
    rootChord: number;
    minRootChord: number;
    maxRootChord: number;
    setRootChord: (rootChord: number) => void;
    lockOpenString: boolean; // Bloquear acorde 0
    toggleLockOpenString: () => void;
    pauseAllNotes: () => void;
};

export const controlBarSlice: StateCreator<ControlBarSliceType> = (
    set,
    get,
) => ({
    rootChord: 0,
    minRootChord: 1,
    maxRootChord: 12,
    lockOpenString: false,

    setRootChord: (rootChord: number) => {
        set({ rootChord: rootChord });
    },
    toggleLockOpenString: () => {
        set({ lockOpenString: !get().lockOpenString });

        // Cada vez que se bloquea el acorde inicial debe cambiar los rangos de los sliders
        if (get().lockOpenString) {
            set({
                minRootChord: 1,
                maxRootChord: 13,
            });

            if (get().rootChord === 0) {
                set({ rootChord: 1 });
            }
        } else {
            set({
                minRootChord: 0,
                maxRootChord: 12,
            });

            if (get().rootChord === 13) {
                set({ rootChord: 12 });
            }
        }
    },
    pauseAllNotes: () => {},
});
