import { requestAIResponse } from '@/api';
import type { StateCreator } from 'zustand';

export type AssistantSliceType = {
    isPanelOpen: boolean;
    togglePanel: () => void;
    openPanel: () => void;
    response: string;
    isGenerating: boolean;

    generateResponse: (prompt: string) => Promise<void>;
};

export const assistantSlice: StateCreator<AssistantSliceType> = (set) => ({
    isPanelOpen: false,
    response: '¿En qué puedo ayudarte?',
    isGenerating: false,

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

    generateResponse: async (prompt: string) => {
        set({
            response: '',
            isGenerating: true,
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
