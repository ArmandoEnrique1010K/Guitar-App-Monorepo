import { useAppStore } from '@/store/useAppStore';

export const useBottomBar = () => {
    const selectedPanel = useAppStore((state) => state.selectedPanel);
    const setSelectedPanel = useAppStore((state) => state.setSelectedPanel);

    return {
        selectedPanel,
        setSelectedPanel,
    };
};
