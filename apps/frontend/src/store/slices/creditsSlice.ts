import type { StateCreator } from 'zustand';

export type CreditsSliceType = {
    showCredits: boolean;
    toggleCreditsModal: () => void;
};

export const creditsSlice: StateCreator<CreditsSliceType> = (set, get) => ({
    showCredits: false,
    toggleCreditsModal: () => {
        set({ showCredits: !get().showCredits });
    },
});
