import { useAppStore } from '@/store';

export const useBottomBar = () => {
    const selectedPanel = useAppStore((state) => state.selectedPanel);
    const setSelectedPanel = useAppStore((state) => state.setSelectedPanel);

    return {
        selectedPanel,
        setSelectedPanel,
    };
};
