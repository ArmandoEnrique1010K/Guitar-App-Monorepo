import { REVERB_SCHEMA } from '@/constants/reverb.constants';
import { useEffects } from '@/hooks/useEffects';
import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { formatEffectValue } from '@/utils/formatEffectValue';

export const ReverbPreDelaySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Retraso"
            value={effects.reverb.preDelay}
            onChange={(value) => updateEffect('reverb', { preDelay: value })}
            unit={REVERB_SCHEMA.preDelay.unit}
            min={REVERB_SCHEMA.preDelay.min}
            max={REVERB_SCHEMA.preDelay.max}
            step={REVERB_SCHEMA.preDelay.step}
            formatedValue={formatEffectValue(
                effects.reverb.preDelay,
                REVERB_SCHEMA.preDelay.factor,
                REVERB_SCHEMA.preDelay.decimals,
            )}
        />
    );
};
