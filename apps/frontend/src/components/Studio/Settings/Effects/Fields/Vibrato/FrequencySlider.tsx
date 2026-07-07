import { VIBRATO_SCHEMA } from '@/constants/vibrato.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    VIBRATO_SCHEMA.frequency.factor,
    VIBRATO_SCHEMA.frequency.decimals,
);

export const FrequencySlider = () => {
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
            format={format}
            parse={parse}
            decimals={VIBRATO_SCHEMA.frequency.decimals}
        />
    );
};
