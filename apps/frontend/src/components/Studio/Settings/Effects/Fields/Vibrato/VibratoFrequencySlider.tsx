import { VIBRATO_SCHEMA } from '@/constants/vibrato.constants';
import { useEffects } from '@/hooks/useEffects';
import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { formatEffectValue } from '@/utils/formatEffectValue';

export const VibratoFrequencySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Frecuencia"
            value={effects.vibrato.frequency}
            onChange={(value) => updateEffect('vibrato', { frequency: value })}
            unit={VIBRATO_SCHEMA.frequency.unit}
            min={VIBRATO_SCHEMA.frequency.min}
            max={VIBRATO_SCHEMA.frequency.max}
            step={VIBRATO_SCHEMA.frequency.step}
            formatedValue={formatEffectValue(
                effects.vibrato.frequency,
                VIBRATO_SCHEMA.frequency.factor,
                VIBRATO_SCHEMA.frequency.decimals,
            )}
        />
    );
};
