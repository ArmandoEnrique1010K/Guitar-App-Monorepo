import { TREMOLO_SCHEMA } from '@/constants/tremolo.constants';
import { useEffects } from '@/hooks/useEffects';
import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { formatEffectValue } from '@/utils/formatEffectValue';

export const TremoloDepthSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Profundidad"
            value={effects.tremolo.depth}
            onChange={(value) => updateEffect('tremolo', { depth: value })}
            unit={TREMOLO_SCHEMA.depth.unit}
            min={TREMOLO_SCHEMA.depth.min}
            max={TREMOLO_SCHEMA.depth.max}
            step={TREMOLO_SCHEMA.depth.step}
            formatedValue={formatEffectValue(
                effects.tremolo.depth,
                TREMOLO_SCHEMA.depth.factor,
                TREMOLO_SCHEMA.depth.decimals,
            )}
        />
    );
};
