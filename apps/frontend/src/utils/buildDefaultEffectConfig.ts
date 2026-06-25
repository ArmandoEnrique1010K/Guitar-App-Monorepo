import { EFFECT_SCHEMAS } from '@/constants';
import type { Effects } from '@/schemas';

// Construye los valores por defecto de un efecto de sonido
export const buildDefaultEffectConfig = (effectName: keyof Effects) => {
    const schema = EFFECT_SCHEMAS[effectName];

    const config = Object.fromEntries(
        Object.entries(schema).map(([key, value]) => [key, value.defaultValue]),
    );

    return {
        ...config,
        // enabled: false,
    };
};
