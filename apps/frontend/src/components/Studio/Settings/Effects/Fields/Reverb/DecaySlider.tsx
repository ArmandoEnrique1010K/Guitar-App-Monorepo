import { REVERB_SCHEMA } from '@/constants/reverb.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

// Solamente se ejecuta la función una sola vez y no en cada render
const { format, parse } = createEffectTransform(
    REVERB_SCHEMA.decay.factor,
    REVERB_SCHEMA.decay.decimals,
);

export const DecaySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Caida"
            value={effects.reverb.decay}
            onChange={(value) => updateEffect('reverb', { decay: value })}
            unit={REVERB_SCHEMA.decay.unit}
            min={REVERB_SCHEMA.decay.min}
            max={REVERB_SCHEMA.decay.max}
            step={REVERB_SCHEMA.decay.step}
            format={format}
            parse={parse}
            decimals={REVERB_SCHEMA.decay.decimals}
        />
    );
};
