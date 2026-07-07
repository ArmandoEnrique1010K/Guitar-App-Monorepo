import { CHORUS_SCHEMA } from '@/constants/chorus.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    CHORUS_SCHEMA.frequency.factor,
    CHORUS_SCHEMA.frequency.decimals,
);

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
            format={format}
            parse={parse}
            decimals={CHORUS_SCHEMA.frequency.decimals}
        />
    );
};
