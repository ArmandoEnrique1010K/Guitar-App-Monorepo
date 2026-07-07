import type { Effects } from '@/types';

// Función para transformar los efectos de sonido
// ENTRA:
// effects: {
//   reverb: { enabled: true, decay: 0.5, mix: 0.3 },
//   delay: { enabled: false, time: 0.2, feedback: 0.4 },
//   chorus: { enabled: true, rate: 3, depth: 0.5 }
// }
// effectsOrder: ['reverb', 'delay', 'chorus']

// SALE:
// [
//   { type: 'reverb', order: 1, enabled: true, params: { decay: 0.5, mix: 0.3 } },
//   { type: 'delay', order: 2, enabled: false, params: { time: 0.2, feedback: 0.4 } },
//   { type: 'chorus', order: 3, enabled: true, params: { rate: 3, depth: 0.5 } }
// ]

export const buildEffectsPayload = (
    effects: Effects,
    effectsOrder: (keyof Effects)[],
) => {
    return effectsOrder.map((type, index) => {
        const { enabled, ...params } = effects[type];

        return {
            type,
            order: index + 1,
            enabled,
            params,
        };
    });
};
