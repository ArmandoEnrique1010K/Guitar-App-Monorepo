import type { StateCreator } from 'zustand';

export type BottomBarSliceType = {
    selectedPanel: 'effects' | 'preferences' | 'rigs' | 'assistant';
    setSelectedPanel: (
        panel: 'effects' | 'preferences' | 'rigs' | 'assistant',
    ) => void;
};

export const bottomBarSlice: StateCreator<BottomBarSliceType> = (set) => ({
    selectedPanel: 'preferences',
    setSelectedPanel: (
        panel: 'effects' | 'preferences' | 'rigs' | 'assistant',
    ) => {
        set({
            selectedPanel: panel,
        });
    },
});
