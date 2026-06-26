import { useAppStore } from '@/store';

// Los custom hooks se utilizan para 'simplificar' los nombres de los estados y metodos que se traen desde el store de Zustand
// No se incluye logica de React como un hook useEffect dentro de los custom hooks
export const useAssistant = () => {
    const isPanelOpen = useAppStore((state) => state.isPanelOpen);
    const togglePanel = useAppStore((state) => state.togglePanel);
    const openPanel = useAppStore((state) => state.openPanel);
    const response = useAppStore((state) => state.response);
    const isGenerating = useAppStore((state) => state.isGenerating);
    const generateResponse = useAppStore((state) => state.generateResponse);
    const question = useAppStore((state) => state.question);
    const setQuestion = useAppStore((state) => state.setQuestion);
    const request = useAppStore((state) => state.request);

    return {
        isPanelOpen,
        togglePanel,
        openPanel,
        response,
        isGenerating,
        generateResponse,
        question,
        setQuestion,
        request,
    };
};
