import { AUTOFILTER_SCHEMA } from '@/constants/autoFilter.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    AUTOFILTER_SCHEMA.baseFrequency.factor,
    AUTOFILTER_SCHEMA.baseFrequency.decimals,
);

export const BaseFrequencySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Frecuencia base"
            value={effects.autoFilter.baseFrequency}
            onChange={(value) =>
                updateEffect('autoFilter', { baseFrequency: value })
            }
            unit={AUTOFILTER_SCHEMA.baseFrequency.unit}
            min={AUTOFILTER_SCHEMA.baseFrequency.min}
            max={AUTOFILTER_SCHEMA.baseFrequency.max}
            step={AUTOFILTER_SCHEMA.baseFrequency.step}
            format={format}
            parse={parse}
            decimals={AUTOFILTER_SCHEMA.baseFrequency.decimals}
        />
    );
};
