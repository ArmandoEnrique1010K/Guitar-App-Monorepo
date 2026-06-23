import { VIBRATO_SCHEMA } from '@/constants/vibrato.constants';
import { useEffects } from '@/hooks/useEffects';
import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { formatEffectValue } from '@/utils/formatEffectValue';

export const VibratoDepthSlider = () => {
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
