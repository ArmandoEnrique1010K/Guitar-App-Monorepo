import { FREEVERB_SCHEMA } from '@/constants/effects/freeverb.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue } from '@/utils';

export const DampeningSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Amortiguamiento"
            value={effects.freeverb.dampening}
            onChange={(value) => updateEffect('freeverb', { dampening: value })}
            unit={FREEVERB_SCHEMA.dampening.unit}
            min={FREEVERB_SCHEMA.dampening.min}
            max={FREEVERB_SCHEMA.dampening.max}
            step={FREEVERB_SCHEMA.dampening.step}
            formatedValue={formatEffectValue(
                effects.freeverb.dampening,
                FREEVERB_SCHEMA.dampening.factor,
                FREEVERB_SCHEMA.dampening.decimals,
            )}
        />
    );
};
