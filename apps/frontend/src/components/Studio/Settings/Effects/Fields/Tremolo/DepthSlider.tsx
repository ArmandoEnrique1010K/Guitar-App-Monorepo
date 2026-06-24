import { TREMOLO_SCHEMA } from '@/constants/effects/tremolo.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue } from '@/utils';

export const DepthSlider = () => {
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
