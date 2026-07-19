import type { SelectedPanel } from '@/types';
import type { StateCreator } from 'zustand';

export type BottomBarSliceType = {
    selectedPanel: SelectedPanel;
    setSelectedPanel: (panel: SelectedPanel) => void;
};

export const bottomBarSlice: StateCreator<BottomBarSliceType> = (set) => ({
    selectedPanel: 'preferences',
    setSelectedPanel: (panel) => {
        set({
            selectedPanel: panel,
        });
    },
});
