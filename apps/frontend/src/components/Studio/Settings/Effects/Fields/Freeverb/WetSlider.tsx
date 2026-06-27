import { FREEVERB_SCHEMA } from '@/constants/effects/freeverb.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue } from '@/utils';

export const WetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Límite"
            value={effects.freeverb.wet}
            onChange={(value) => updateEffect('freeverb', { wet: value })}
            unit={FREEVERB_SCHEMA.wet.unit}
            min={FREEVERB_SCHEMA.wet.min}
            max={FREEVERB_SCHEMA.wet.max}
            step={FREEVERB_SCHEMA.wet.step}
            formatedValue={formatEffectValue(
                effects.freeverb.wet,
                FREEVERB_SCHEMA.wet.factor,
                FREEVERB_SCHEMA.wet.decimals,
            )}
        />
    );
};
