import type { StateCreator } from 'zustand';

export type BottomBarSliceType = {
    selectedPanel: 'effects' | 'preferences' | 'workspaces' | 'assistant';
    setSelectedPanel: (
        panel: 'effects' | 'preferences' | 'workspaces' | 'assistant',
    ) => void;
};

export const bottomBarSlice: StateCreator<BottomBarSliceType> = (set) => ({
    selectedPanel: 'preferences',
    setSelectedPanel: (
        panel: 'effects' | 'preferences' | 'workspaces' | 'assistant',
    ) => {
        set({
            selectedPanel: panel,
        });
    },
});
