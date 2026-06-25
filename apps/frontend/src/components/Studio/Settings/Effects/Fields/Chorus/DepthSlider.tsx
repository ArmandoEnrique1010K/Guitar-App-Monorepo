import { CHORUS_SCHEMA } from '@/constants/effects/chorus.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue } from '@/utils';

export const DepthSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Profundidad"
            value={effects.chorus.depth}
            onChange={(value) => updateEffect('chorus', { depth: value })}
            unit={CHORUS_SCHEMA.depth.unit}
            min={CHORUS_SCHEMA.depth.min}
            max={CHORUS_SCHEMA.depth.max}
            step={CHORUS_SCHEMA.depth.step}
            formatedValue={formatEffectValue(
                effects.chorus.depth,
                CHORUS_SCHEMA.depth.factor,
                CHORUS_SCHEMA.depth.decimals,
            )}
        />
    );
};
