import { CHORUS_SCHEMA } from '@/constants/effects/chorus.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue } from '@/utils';

export const FrequencySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Frecuencia"
            value={effects.chorus.frequency}
            onChange={(value) => updateEffect('chorus', { frequency: value })}
            unit={CHORUS_SCHEMA.frequency.unit}
            min={CHORUS_SCHEMA.frequency.min}
            max={CHORUS_SCHEMA.frequency.max}
            step={CHORUS_SCHEMA.frequency.step}
            formatedValue={formatEffectValue(
                effects.chorus.frequency,
                CHORUS_SCHEMA.frequency.factor,
                CHORUS_SCHEMA.frequency.decimals,
            )}
        />
    );
};
