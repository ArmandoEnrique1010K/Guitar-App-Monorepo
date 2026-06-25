import { CHORUS_SCHEMA } from '@/constants/effects/chorus.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue } from '@/utils';

export const SpreadSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Angulo"
            value={effects.chorus.spread}
            onChange={(value) => updateEffect('chorus', { spread: value })}
            unit={CHORUS_SCHEMA.spread.unit}
            min={CHORUS_SCHEMA.spread.min}
            max={CHORUS_SCHEMA.spread.max}
            step={CHORUS_SCHEMA.spread.step}
            formatedValue={formatEffectValue(
                effects.chorus.spread,
                CHORUS_SCHEMA.spread.factor,
                CHORUS_SCHEMA.spread.decimals,
            )}
        />
    );
};
