import type { ChorusConfig } from '@/types';
import * as Tone from 'tone';

// Cada efecto de Tone.js tiene una API diferente para crearlo, configurarlo
// y liberarlo (dispose).

// Por ello, cada efecto dispone de un handler que encapsula esa lógica y
// expone una interfaz común: create, configure y dispose.

// Se utiliza directamente en el slice de effectSlice
export const chorusHandler = {
    create: () => {
        // Algunos efectos requieren iniciar su procesamiento llamando a start().
        return new Tone.Chorus().start();
    },

    // Aplica la configuración del efecto utilizando los valores definidos
    // en la configuración almacenada en la aplicación.
    configure: (effect: Tone.Chorus, config: ChorusConfig) => {
        effect.frequency.value = config.frequency;
        effect.delayTime = config.delayTime;
        effect.depth = config.depth;
        effect.feedback.value = config.feedback;
        effect.spread = config.spread;
        effect.type = config.type;
        effect.wet.value = config.wet;
    },

    // Libera los recursos utilizados por el efecto.
    dispose: (effect: Tone.Chorus) => {
        effect.dispose();
    },
};
