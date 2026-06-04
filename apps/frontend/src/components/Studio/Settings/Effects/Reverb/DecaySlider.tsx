import { REVERB_SCHEMA } from '@/constants/reverb.constants';
import { useEffects } from '@/hooks/useEffects';
import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { formatEffectValue } from '@/utils/formatEffectValue';

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
            formatedValue={formatEffectValue(
                effects.reverb.decay,
                REVERB_SCHEMA.decay.factor,
                REVERB_SCHEMA.decay.decimals,
            )}
        />
    );
};
