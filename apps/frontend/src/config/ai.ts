import { createOpenRouter } from '@openrouter/ai-sdk-provider';

export const startOpenRouter = createOpenRouter({
    // Requiere el API KEY
    apiKey: import.meta.env.VITE_OPENROUTER_KEY,
});
