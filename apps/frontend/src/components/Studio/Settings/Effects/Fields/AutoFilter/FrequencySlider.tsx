import { AUTOFILTER_SCHEMA } from '@/constants/autoFilter.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    AUTOFILTER_SCHEMA.frequency.factor,
    AUTOFILTER_SCHEMA.frequency.decimals,
);

export const FrequencySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Frecuencia"
            value={effects.autoFilter.frequency}
            onChange={(value) =>
                updateEffect('autoFilter', { frequency: value })
            }
            unit={AUTOFILTER_SCHEMA.frequency.unit}
            min={AUTOFILTER_SCHEMA.frequency.min}
            max={AUTOFILTER_SCHEMA.frequency.max}
            step={AUTOFILTER_SCHEMA.frequency.step}
            format={format}
            parse={parse}
            decimals={AUTOFILTER_SCHEMA.frequency.decimals}
        />
    );
};
