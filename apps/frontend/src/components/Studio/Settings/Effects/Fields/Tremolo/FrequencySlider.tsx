import { TREMOLO_SCHEMA } from '@/constants/effects/tremolo.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue } from '@/utils';

export const FrequencySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Frecuencia"
            value={effects.tremolo.frequency}
            onChange={(value) => updateEffect('tremolo', { frequency: value })}
            unit={TREMOLO_SCHEMA.frequency.unit}
            min={TREMOLO_SCHEMA.frequency.min}
            max={TREMOLO_SCHEMA.frequency.max}
            step={TREMOLO_SCHEMA.frequency.step}
            formatedValue={formatEffectValue(
                effects.tremolo.frequency,
                TREMOLO_SCHEMA.frequency.factor,
                TREMOLO_SCHEMA.frequency.decimals,
            )}
        />
    );
};
