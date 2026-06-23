import { CHORUS_SCHEMA } from '@/constants/chorus.constants';
import { useEffects } from '@/hooks/useEffects';
import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { formatEffectValue } from '@/utils/formatEffectValue';

export const ChorusWetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Límite"
            value={effects.chorus.wet}
            onChange={(value) => updateEffect('chorus', { wet: value })}
            unit={CHORUS_SCHEMA.wet.unit}
            min={CHORUS_SCHEMA.wet.min}
            max={CHORUS_SCHEMA.wet.max}
            step={CHORUS_SCHEMA.wet.step}
            formatedValue={formatEffectValue(
                effects.chorus.wet,
                CHORUS_SCHEMA.wet.factor,
                CHORUS_SCHEMA.wet.decimals,
            )}
        />
    );
};
