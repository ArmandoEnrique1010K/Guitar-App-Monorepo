import { VIBRATO_SCHEMA } from '@/constants/effects/vibrato.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue } from '@/utils';

export const DepthSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Profundidad"
            value={effects.vibrato.depth}
            onChange={(value) => updateEffect('vibrato', { depth: value })}
            unit={VIBRATO_SCHEMA.depth.unit}
            min={VIBRATO_SCHEMA.depth.min}
            max={VIBRATO_SCHEMA.depth.max}
            step={VIBRATO_SCHEMA.depth.step}
            formatedValue={formatEffectValue(
                effects.vibrato.depth,
                VIBRATO_SCHEMA.depth.factor,
                VIBRATO_SCHEMA.depth.decimals,
            )}
        />
    );
};
