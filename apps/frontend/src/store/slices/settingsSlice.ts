import type { StateCreator } from 'zustand';
import type { PresetsSliceType } from './presetsSlice';
import type { SelectedPanel } from '@/types';

export type SettingsSliceType = {
    selectedPanel: SelectedPanel;
    setSelectedPanel: (panel: SelectedPanel) => void;

    // Acorde inicial
    rootChord: number;
    minRootChord: number;
    maxRootChord: number;
    setRootChord: (rootChord: number) => void;

    // Bloquear acorde 0
    lockOpenString: boolean;
    toggleLockOpenString: () => void;
};

export const settingsSlice: StateCreator<
    SettingsSliceType & PresetsSliceType,
    [],
    [],
    SettingsSliceType
> = (set, get) => ({
    selectedPanel: 'preferences',
    setSelectedPanel: (panel) => {
        set({
            selectedPanel: panel,
        });
    },

    rootChord: 0,
    minRootChord: 0,
    maxRootChord: 12,

    setRootChord: (rootChord: number) => {
        set({ rootChord });
    },

    lockOpenString: false,
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
        }

        if (!get().lockOpenString) {
            set({
                minRootChord: 0,
                maxRootChord: 12,
            });

            if (get().rootChord === 13) {
                set({ rootChord: 12 });
            }
        }
    },

    //
});
