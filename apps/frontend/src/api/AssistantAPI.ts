import { startOpenRouter } from '@/config/ai';
import { streamText } from 'ai';

export const generateResponseForAI = async (prompt: string) => {
    try {
        const response = await streamText({
            model: startOpenRouter('meta-llama/llama-3-70b-instruct'), // Nombre de modelo corregido
            prompt,
            system: 'Eres un experto en efectos de sonido en la libreria Tone.JS, puedes mostrar los resultados de los efectos de sonido de la guitarra que se van a configurar en esta aplicación hecha con ToneJS. No puedes mostrar codigo fuente, solo mostrar los resultados de los efectos de sonido, pero si puedes usar nombres de objetos de ToneJS y sus valores que se deben colocar en las propiedades',
            temperature: 0.6,
        });

        // Devuelve directamente el textStream para iterarlo después
        return response.textStream;
    } catch (error) {
        console.error('Error al generar respuesta:', error);
        throw error; // Re-lanzamos el error para manejarlo en el componente
    }
};
