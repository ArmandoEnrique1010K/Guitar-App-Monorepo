import { requestAIResponse } from '@/api';
import { greetingsAI } from '@/data/greetingsAI';
import type { StateCreator } from 'zustand';

export type AssistantSliceType = {
    isGenerating: boolean;
    isAssistantPanelOpen: boolean;

    // Texto escrito por el usuario
    question: string;

    // Pregunta enviada a la IA
    request: string;

    // Respuesta generada por IA
    response: string;

    toggleAssistantPanel: () => void;
    openAssistantPanel: () => void;
    setQuestion: (question: string) => void;
    generateResponse: (prompt: string) => Promise<void>;
};

// Obtiene un texto como texto inicial
const randomGreeting =
    greetingsAI[Math.floor(Math.random() * greetingsAI.length)];

export const assistantSlice: StateCreator<AssistantSliceType> = (set) => ({
    isGenerating: false,
    isAssistantPanelOpen: false,
    question: '',
    request: '',
    response: randomGreeting,

    // Alterna el estado del panel de la IA Generativa
    toggleAssistantPanel: () => {
        set((state) => ({
            isAssistantPanelOpen: !state.isAssistantPanelOpen,
        }));
    },

    openAssistantPanel: () => {
        set({
            isAssistantPanelOpen: true,
        });
    },

    // Cambia el estado de la pregunta
    setQuestion: (question) => {
        set({ question });
    },

    // Genera la respuesta de la IA (función asincrona)
    generateResponse: async (prompt: string) => {
        set({
            request: prompt,
            response: '',
            isGenerating: true,
        });

        try {
            // Llama a la función para obtener la respuesta de la IA
            const stream = await requestAIResponse(prompt);

            set({
                response: '...',
            });

            let fullResponse = '';

            // Se generan pequeños fragmentos de texto como la respuesta, los cuales deben ser acomodados
            // en el estado de response
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
            console.error('Error al generar la respuesta: ', error);

            set({
                response: 'Ha ocurrido un error al obtener respuesta de la IA.',
            });
        } finally {
            set({
                isGenerating: false,
            });
        }
    },
});
