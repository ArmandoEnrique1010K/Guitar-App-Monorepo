import type { StateCreator } from 'zustand';

export type BottomBarSliceType = {
    selectedPanel: 'effects' | 'preferences' | 'rigs';
    setSelectedPanel: (panel: 'effects' | 'preferences' | 'rigs') => void;
};

export const bottomBarSlice: StateCreator<BottomBarSliceType> = (set) => ({
    selectedPanel: 'preferences',
    setSelectedPanel: (panel: 'effects' | 'preferences' | 'rigs') => {
        set({
            selectedPanel: panel,
        });
    },
});
