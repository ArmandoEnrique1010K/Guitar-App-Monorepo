import { VIBRATO_SCHEMA } from '@/constants/vibrato.constants';
import { useEffects } from '@/hooks/useEffects';
import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { formatEffectValue } from '@/utils/formatEffectValue';

export const VibratoWetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Límite"
            value={effects.vibrato.wet}
            onChange={(value) => updateEffect('vibrato', { wet: value })}
            unit={VIBRATO_SCHEMA.wet.unit}
            min={VIBRATO_SCHEMA.wet.min}
            max={VIBRATO_SCHEMA.wet.max}
            step={VIBRATO_SCHEMA.wet.step}
            formatedValue={formatEffectValue(
                effects.vibrato.wet,
                VIBRATO_SCHEMA.wet.factor,
                VIBRATO_SCHEMA.wet.decimals,
            )}
        />
    );
};
