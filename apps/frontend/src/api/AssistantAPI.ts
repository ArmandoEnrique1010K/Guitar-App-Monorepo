import { systemPrompt } from '@/data/systemPrompt';
import { startOpenRouter } from '@/lib/ai';
import { streamText } from 'ai';

// TODO: REFACTORIZAR ESTE ARCHIVO
// https://ai-sdk.dev/providers/community-providers/openrouter
// Esta funcion se encarga de generar la respuesta del asistente de IA
export const requestAIResponse = async (prompt: string) => {
    try {
        const response = await streamText({
            // Nombre del modelo LLM que se va a utilizar
            model: startOpenRouter('openai/gpt-oss-20b:free'),

            // El prompt enviado por el usuario
            prompt,

            // Se define el rol del sistema del asistente mediante la ingenieria de prompts
            system: systemPrompt,

            // Si la temperatura es 0, la respuesta sera mas deterministica (menos creativa), si es un valor cercano a 1, sera mas creativa
            temperature: 0.2,
        });

        // Devuelve directamente el textStream para iterarlo después
        return response.textStream;
    } catch (error) {
        console.error('Error al generar respuesta:', error);
        throw error; // Re-lanzamos el error para manejarlo en el componente
    }
};

// Libreria ToneJS: https://tonejs.github.io/docs/15.1.22/index.html,
