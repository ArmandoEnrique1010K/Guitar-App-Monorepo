import { AUTOFILTER_SCHEMA } from '@/constants/autoFilter.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    AUTOFILTER_SCHEMA.octaves.factor,
    AUTOFILTER_SCHEMA.octaves.decimals,
);

export const OctavesSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof AUTOFILTER_SCHEMA>('octaves'),
            )}
            title={AUTOFILTER_SCHEMA.octaves.label}
            value={effects.autoFilter.octaves}
            onChange={(value) => updateEffect('autoFilter', { octaves: value })}
            unit={AUTOFILTER_SCHEMA.octaves.unit}
            min={AUTOFILTER_SCHEMA.octaves.min}
            max={AUTOFILTER_SCHEMA.octaves.max}
            step={AUTOFILTER_SCHEMA.octaves.step}
            format={format}
            parse={parse}
            decimals={AUTOFILTER_SCHEMA.octaves.decimals}
        />
    );
};
