import { generateResponseForAI } from '@/api/AssistantAPI';
import type { StateCreator } from 'zustand';

export type AssistantSliceType = {
    showPanel: boolean;
    toogleShowPanel: () => void;
    resultFromAI: string;
    isGeneratingResultFromAI: boolean;

    generateResponse: (prompt: string) => Promise<void>;
};

export const assistantSlice: StateCreator<AssistantSliceType> = (set) => ({
    showPanel: false,
    resultFromAI: '',
    isGeneratingResultFromAI: false,

    toogleShowPanel: () => {
        set((state) => ({
            showPanel: !state.showPanel,
        }));
    },

    generateResponse: async (prompt: string) => {
        set({
            resultFromAI: '',
            isGeneratingResultFromAI: true,
        });

        console.log(`El usuario ha introducido el texto ${prompt}`);

        try {
            const stream = await generateResponseForAI(prompt);

            console.log('Stream recibido:', stream);

            set({
                resultFromAI: '...',
            });

            let fullResponse = '';

            for await (const chunk of stream) {
                fullResponse += chunk;

                set({
                    resultFromAI: fullResponse,
                });
            }

            if (!fullResponse) {
                set({
                    resultFromAI: 'No se recibió respuesta de la IA.',
                });
            }
        } catch (error) {
            console.error('Error en generateResponse:', error);

            set({
                resultFromAI: 'Error al obtener respuesta de la IA.',
            });
        } finally {
            set({
                isGeneratingResultFromAI: false,
            });
        }
    },
});
