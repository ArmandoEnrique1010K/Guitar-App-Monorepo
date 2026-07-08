import { createOpenRouter } from '@openrouter/ai-sdk-provider';

// Configuración del proveedor de OpenRouter para el AI SDK.

// Esta instancia se reutiliza para crear modelos de lenguaje
// (LLMs) compatibles con el AI SDK utilizando la API de OpenRouter.
// La clave de acceso se obtiene desde las variables de entorno.
export const startOpenRouter = createOpenRouter({
    apiKey: import.meta.env.VITE_OPENROUTER_KEY,
});
