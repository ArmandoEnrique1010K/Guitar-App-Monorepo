import { REVERB_SCHEMA } from '@/constants/effects/reverb.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue } from '@/utils';

export const WetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Límite"
            value={effects.reverb.wet}
            onChange={(value) => updateEffect('reverb', { wet: value })}
            unit={REVERB_SCHEMA.wet.unit}
            min={REVERB_SCHEMA.wet.min}
            max={REVERB_SCHEMA.wet.max}
            step={REVERB_SCHEMA.wet.step}
            formatedValue={formatEffectValue(
                effects.reverb.wet,
                REVERB_SCHEMA.wet.factor,
                REVERB_SCHEMA.wet.decimals,
            )}
        />
    );
};
