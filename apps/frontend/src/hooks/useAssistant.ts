import { useAppStore } from '@/store/useAppStore';

export const useAssistant = () => {
    const showPanel = useAppStore((state) => state.showPanel);
    const toogleShowPanel = useAppStore((state) => state.toogleShowPanel);
    const resultFromAI = useAppStore((state) => state.resultFromAI);
    const isGeneratingResultFromAI = useAppStore(
        (state) => state.isGeneratingResultFromAI,
    );
    const generateResponse = useAppStore((state) => state.generateResponse);

    return {
        showPanel,
        toogleShowPanel,
        resultFromAI,
        isGeneratingResultFromAI,
        generateResponse,
    };
};
