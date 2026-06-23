import { TREMOLO_SCHEMA } from '@/constants/tremolo.constants';
import { useEffects } from '@/hooks/useEffects';
import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { formatEffectValue } from '@/utils/formatEffectValue';

export const TremoloWetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Límite"
            value={effects.tremolo.wet}
            onChange={(value) => updateEffect('tremolo', { wet: value })}
            unit={TREMOLO_SCHEMA.wet.unit}
            min={TREMOLO_SCHEMA.wet.min}
            max={TREMOLO_SCHEMA.wet.max}
            step={TREMOLO_SCHEMA.wet.step}
            formatedValue={formatEffectValue(
                effects.tremolo.wet,
                TREMOLO_SCHEMA.wet.factor,
                TREMOLO_SCHEMA.wet.decimals,
            )}
        />
    );
};
