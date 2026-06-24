import { startOpenRouter } from '@/lib/ai';
import { streamText } from 'ai';

// Esta funcion se encarga de generar la respuesta del asistente de IA
export const requestAIResponse = async (prompt: string) => {
    try {
        const response = await streamText({
            // Nombre del modelo LLM que se va a utilizar
            model: startOpenRouter('openai/gpt-oss-20b:free'),

            // prompt: prompt
            prompt,

            // Se define el rol del sistema del asistente mediante la ingenieria de prompts
            // TODO: UTILIZAR INGENIERIA DE PROMPTS
            system: `Eres un experto en efectos de sonido en la libreria Tone.JS, 
            puedes mostrar los resultados de los efectos de sonido de la guitarra 
            que se van a configurar en esta aplicación hecha con ToneJS. 
            No puedes mostrar codigo fuente, solo mostrar los resultados de los efectos de sonido, 
            pero si puedes usar nombres de objetos de ToneJS y sus valores que se deben colocar en las propiedades`,

            // Si la temperatura es 0, la respuesta sera mas deterministica (menos creativa), si es un valor cercano a 1, sera mas creativa
            temperature: 0.6,
        });

        // Devuelve directamente el textStream para iterarlo después
        return response.textStream;
    } catch (error) {
        console.error('Error al generar respuesta:', error);
        throw error; // Re-lanzamos el error para manejarlo en el componente
    }
};
