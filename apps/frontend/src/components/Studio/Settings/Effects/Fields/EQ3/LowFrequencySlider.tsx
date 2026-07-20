import { EQ3_SCHEMA } from '@/constants/eq3.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    EQ3_SCHEMA.lowFrequency.factor,
    EQ3_SCHEMA.lowFrequency.decimals,
);

export const LowFrequencySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof EQ3_SCHEMA>('lowFrequency'),
            )}
            title={EQ3_SCHEMA.lowFrequency.label}
            value={effects.eq3.lowFrequency}
            onChange={(value) => updateEffect('eq3', { lowFrequency: value })}
            unit={EQ3_SCHEMA.lowFrequency.unit}
            min={EQ3_SCHEMA.lowFrequency.min}
            max={EQ3_SCHEMA.lowFrequency.max}
            step={EQ3_SCHEMA.lowFrequency.step}
            format={format}
            parse={parse}
            decimals={EQ3_SCHEMA.lowFrequency.decimals}
        />
    );
};
