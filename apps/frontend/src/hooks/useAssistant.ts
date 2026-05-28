import { useAppStore } from '@/store/useAppStore';

export const useAssistant = () => {
    const isPanelOpen = useAppStore((state) => state.isPanelOpen);
    const togglePanel = useAppStore((state) => state.togglePanel);
    const openPanel = useAppStore((state) => state.openPanel);
    const response = useAppStore((state) => state.response);
    const isGenerating = useAppStore((state) => state.isGenerating);
    const generateResponse = useAppStore((state) => state.generateResponse);

    return {
        isPanelOpen,
        togglePanel,
        openPanel,
        response,
        isGenerating,
        generateResponse,
    };
};
