import { TREMOLO_SCHEMA } from '@/constants/tremolo.constants';
import { useEffects } from '@/hooks/useEffects';
import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { formatEffectValue } from '@/utils/formatEffectValue';

export const TremoloSpreadSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Angulo"
            value={effects.tremolo.spread}
            onChange={(value) => updateEffect('tremolo', { spread: value })}
            unit={TREMOLO_SCHEMA.spread.unit}
            min={TREMOLO_SCHEMA.spread.min}
            max={TREMOLO_SCHEMA.spread.max}
            step={TREMOLO_SCHEMA.spread.step}
            formatedValue={formatEffectValue(
                effects.tremolo.spread,
                TREMOLO_SCHEMA.spread.factor,
                TREMOLO_SCHEMA.spread.decimals,
            )}
        />
    );
};
