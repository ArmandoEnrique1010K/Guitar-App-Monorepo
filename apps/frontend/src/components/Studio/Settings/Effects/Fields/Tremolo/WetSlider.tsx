import { TREMOLO_SCHEMA } from '@/constants/effects/tremolo.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue } from '@/utils';

export const WetSlider = () => {
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
