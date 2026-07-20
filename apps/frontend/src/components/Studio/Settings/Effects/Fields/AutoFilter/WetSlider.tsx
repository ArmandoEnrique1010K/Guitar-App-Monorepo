import { AUTOFILTER_SCHEMA } from '@/constants/autoFilter.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    AUTOFILTER_SCHEMA.wet.factor,
    AUTOFILTER_SCHEMA.wet.decimals,
);

export const WetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof AUTOFILTER_SCHEMA>('wet'),
            )}
            title={AUTOFILTER_SCHEMA.wet.label}
            value={effects.autoFilter.wet}
            onChange={(value) => updateEffect('autoFilter', { wet: value })}
            unit={AUTOFILTER_SCHEMA.wet.unit}
            min={AUTOFILTER_SCHEMA.wet.min}
            max={AUTOFILTER_SCHEMA.wet.max}
            step={AUTOFILTER_SCHEMA.wet.step}
            format={format}
            parse={parse}
            decimals={AUTOFILTER_SCHEMA.wet.decimals}
        />
    );
};
