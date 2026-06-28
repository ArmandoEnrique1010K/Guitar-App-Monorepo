import { requestAIResponse } from '@/api';
import type { StateCreator } from 'zustand';

export type AssistantSliceType = {
    isPanelOpen: boolean;
    togglePanel: () => void;
    openPanel: () => void;
    response: string;
    isGenerating: boolean;
    generateResponse: (prompt: string) => Promise<void>;
    request: string;
    question: string;
    setQuestion: (question: string) => void;
};

const randomGreetings = [
    'Hazme una pregunta. Cada consulta se procesa de forma independiente.',
    '¿Qué deseas consultar? Ten en cuenta que no conservo el contexto entre preguntas.',
    'Estoy listo para responder una consulta. Si haces otra pregunta, incluye nuevamente toda la información necesaria.',
    '¿Qué deseas preguntar? Cada consulta es independiente.',
    'Puedo ayudarte con una consulta. Si realizas otra pregunta, recuerda incluir nuevamente el contexto.',
];

export const assistantSlice: StateCreator<AssistantSliceType> = (set) => ({
    isPanelOpen: false,
    response:
        randomGreetings[Math.floor(Math.random() * randomGreetings.length)],
    isGenerating: false,
    request: '',
    question: '',

    togglePanel: () => {
        set((state) => ({
            isPanelOpen: !state.isPanelOpen,
        }));
    },

    openPanel: () => {
        set({
            isPanelOpen: true,
        });
    },

    setQuestion: (question) => {
        set({ question });
    },

    generateResponse: async (prompt: string) => {
        set({
            response: '',
            isGenerating: true,
            request: prompt,
        });

        // console.log(`El usuario ha introducido el texto ${prompt}`);

        try {
            const stream = await requestAIResponse(prompt);

            // console.log('Stream recibido:', stream);

            set({
                response: '...',
            });

            let fullResponse = '';

            for await (const chunk of stream) {
                fullResponse += chunk;

                set({
                    response: fullResponse,
                });
            }

            if (!fullResponse) {
                set({
                    response: 'No se recibió respuesta de la IA.',
                });
            }
        } catch (error) {
            console.error('Error en generateResponse:', error);

            set({
                response: 'Error al obtener respuesta de la IA.',
            });
        } finally {
            set({
                isGenerating: false,
            });
        }
    },
});
