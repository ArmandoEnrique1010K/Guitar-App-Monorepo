import { useAppStore } from '@/store';

// Los custom hooks se utilizan para 'simplificar' los nombres de los estados y metodos que se traen desde el store de Zustand
// No se incluye logica de React como un hook useEffect dentro de los custom hooks
export const useAssistant = () => {
    const isGenerating = useAppStore((state) => state.isGenerating);
    const isAssistantPanelOpen = useAppStore(
        (state) => state.isAssistantPanelOpen,
    );
    const question = useAppStore((state) => state.question);
    const request = useAppStore((state) => state.request);
    const response = useAppStore((state) => state.response);

    const toggleAssistantPanel = useAppStore(
        (state) => state.toggleAssistantPanel,
    );
    const openAssistantPanel = useAppStore((state) => state.openAssistantPanel);
    const setQuestion = useAppStore((state) => state.setQuestion);
    const generateResponse = useAppStore((state) => state.generateResponse);

    return {
        isGenerating,
        isAssistantPanelOpen,
        question,
        request,
        response,
        toggleAssistantPanel,
        openAssistantPanel,
        setQuestion,
        generateResponse,
    };
};
