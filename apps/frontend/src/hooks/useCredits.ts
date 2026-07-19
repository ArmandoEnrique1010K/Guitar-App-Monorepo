import { useAppStore } from '@/store';

export const useCredits = () => {
    const showCredits = useAppStore((state) => state.showCredits);
    const toggleCreditsModal = useAppStore((state) => state.toggleCreditsModal);

    return {
        showCredits,
        toggleCreditsModal,
    };
};
